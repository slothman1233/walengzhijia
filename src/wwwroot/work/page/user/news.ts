import { kkpager } from '@stl/kkpager'
import { on } from '@stl/tool-ts/src/common/event/on'
import { navigationbar2, usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { delNews, GetNewsByCompanyId } from '../../common/service/news.services'
import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { NewsContentTypeArray, subCodeEnums } from '../../../../enums/enums'
import window from '../../common/win/windows'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { NewsInfoModel } from '../../../../model/news/news'
import { GetNewsPagesByCompanyId, SetNewsTop, DelNewsTop } from '../../common/service/ManageLepackNews'
import { contentType, popupType } from '../../public/script/popup'
declare const tabType: any
declare const pageIndex: number
declare const totalPages: number
declare const $: JQueryStatic


//用户id
let userId = window.getuserid()
let usermain = document.querySelector('#usermain')
//品牌商id
let companyId = JSON.parse(window.getusercookie()).company.companyId;
//已发布
(function () {
    //tab切换
    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
    })
})();
(function () {
    //已发布下的分页
    if (document.getElementById('publish_kkpage')) {
        kkpager({
            pagerid: 'publish_kkpage',
            total: totalPages,
            pno: pageIndex,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async function (i: number) {
                let id = $('#usermain .publish .navigationbar2 .select').data('id')
                console.log(id)
                let d = await getdata(id, i)
                $('#usermain .publish .child_box').html(d.html)
                window.imgload()
            }

        })
    }

    //已发布 下的切换
    navigationbar2('usermain', async (dom: Element) => {

        let id = $(dom).data('id')

        let d = await getdata(id, 1)

        $('#usermain .publish .child_box').html(d.html)
        window.imgload()
        kkpager({
            pagerid: 'publish_kkpage',
            total: d.totalPages,
            pno: 1,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async function (i: number) {
                let d = await getdata(id, i)
                $('#usermain .publish .child_box').html(d.html)
                window.imgload()
            }

        })

    })

})();

//初始化草稿
(async function () {
    let child_box = usermain.querySelector('.drafts .child_box')
    let newsStorage = 'newsStorage'
    let d = JSON.parse(localStorage.getItem(newsStorage)) || {}

    let data = d[userId] || {}

    let keyAry = Object.keys(data)
    let html = ''
    if (keyAry.length <= 0) {
        html = `<div class="empty">
                    <p>没有草稿</p>
                </div>`
        child_box.innerHTML = html
    } else {
        let contentData: any[] = []
        for (let i = 0; i < keyAry.length; i++) {
            let item: NewsInfoModel = data[keyAry[i]]
            contentData.push({
                logo: item.newsIcon || '/assets/images/loading.png',
                label: [NewsContentTypeArray[item.newsContentType]],
                title: item.newsTitle,
                id: keyAry[i]

            })
        }

        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/newslist.njk', name: 'newslist', data: { type: 2, newdata: contentData } })

        if (datas.code === 0) {
            child_box.innerHTML = datas.bodyMessage
            window.imgload()
        }



        on({
            agent: document.getElementById('usermain').querySelector('.drafts'),
            events: 'click',
            ele: '.del',
            fn: function (dom: HTMLElement, e: Event) {
                alert({
                    str: '确定要删除吗？',
                    type: popupType.b,
                    contentType: contentType.warning,
                    successCallback: async function () {
                        let id = dom.getAttribute('data-id')

                        $(dom).parents('.child').remove()
                        delete d[userId][id]
                        localStorage.setItem(newsStorage, JSON.stringify(d))
                        alert('删除成功')
                    }
                })


            }
        })
    }





})()

//获取数据
async function getdata(id: any, pageIndex: number) {
    let cookieuserinfo = JSON.parse(window.getusercookie())
    let html = ``

    let newdata = await GetNewsPagesByCompanyId(
        {
            companyId: cookieuserinfo.company.companyId,
            newsType: id,
            pageIndex
        }
    )
    let newslist: any = []
    if (newdata.code === 0 && newdata.subCode === subCodeEnums.success) {
        newdata.bodyMessage.items.forEach(item => {
            newslist.push({
                logo: item.newsIcon,
                title: item.newsTitle,
                label: [NewsContentTypeArray[item.newsContentType]],
                id: item.newsId,
                author: item.userName,
                createTime: item.newsTime,
                isTop: item.isTop
            })
        })

        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/newslist.njk', name: 'newslist', data: { type: id === 0 ? 1 : 2, newdata: newslist } })

        if (datas.code === 0) {
            html = datas.bodyMessage
        }
    }

    return { html, totalPages: newdata?.bodyMessage?.totalPages || 1 }
}

(function () {
    //点击置顶
    let child_box = document.querySelector('#usermain .publish .child_box')
    on({
        agent: child_box,
        events: 'click',
        ele: '.stick',
        fn: async function (dom: any, ev: any) {
            let id = $(dom).data('id')
            let data = await SetNewsTop({
                newsId: id,
                isTop: true,
                createUser: userId
            })

            if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
                $(dom).parents('.child').find('.c .zd').show()
                $(dom).hide()
                $(dom).siblings('.closestick').show()
                alert('置顶成功')
            } else {
                alert('置顶失败，请重试')
            }



            // if (pageIndex === 1) {
            //     // $($(child_box).find('.child')[0]).find('.stick').show()
            //     // $(child_box).prepend($(dom).parents('.child'))
            //     $(dom).hide()
            //     $(dom).siblings('.closestick').show()
            //     alert('置顶成功')
            // } else {
            //     //$(dom).parents('.child').remove()
            //     $(dom).hide()
            //     $(dom).siblings('.closestick').show()
            //     alert('置顶成功')
            // }



        }
    })

    //取消置顶
    on({
        agent: child_box,
        events: 'click',
        ele: '.closestick',
        fn: async function (dom: any, ev: any) {
            let id = $(dom).data('id')

            let data = await DelNewsTop({
                newsId: id,
                isTop: true,
                createUser: userId
            })

            if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
                $(dom).parents('.child').find('.c .zd').hide()
                $(dom).hide()
                $(dom).siblings('.stick').show()
                alert('取消置顶成功')
            } else {
                alert('取消置顶失败，请重试')
            }


            // if (pageIndex === 1) {
            //     // $($(child_box).find('.child')[0]).find('.stick').show()
            //     // $(child_box).prepend($(dom).parents('.child'))
            //     $(dom).hide()
            //     alert('置顶成功')
            // } else {
            //     $(dom).parents('.child').remove()
            //     alert('置顶成功')
            // }

        }
    })
})()

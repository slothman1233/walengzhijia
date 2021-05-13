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
declare const tabType: any
declare const pageIndex: number
declare const $: JQueryStatic

//用户id
let userId = JSON.parse(getCookie(config.userlogin)).userId
let usermain = document.querySelector('#usermain')
//品牌商id
let companyId = JSON.parse(getCookie(config.userlogin)).company.companyId;
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
            total: 20,
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
                let html = await getdata(id)
                $('#usermain .publish .child_box').html(html)
                window.imgload()
            }

        })
    }

    //已发布 下的切换
    navigationbar2('usermain', async (dom: Element) => {

        let id = $(dom).data('id')

        let html = await getdata(id)

        $('#usermain .publish .child_box').html(html)
        window.imgload()
        kkpager({
            pagerid: 'publish_kkpage',
            total: 20,
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
                let html = await getdata(id)
                $('#usermain .publish .child_box').html(html)
                window.imgload()
            }

        })

    })

})();

//初始化草稿
(async function () {
    let child_box = usermain.querySelector('.drafts .child_box')
    let newsStorage = 'newsStorage'
    let data = JSON.parse(localStorage.getItem(newsStorage)) || {}

    let keyAry = Object.keys(data)
    let html = ''
    if (keyAry.length <= 0) {
        html = `<div class="empty">
                    <p>没有草稿</p>
                </div>`
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

        // logo: item.newsIcon,
        // title: item.newsTitle,
        // label: [NewsContentTypeArray[item.newsContentType]],
        // id: item.newsId,
        // author: item.companyName,
        // createTime: item.newsTime

        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/newslist.njk', name: 'newslist', data: { type: 2, newdata: contentData } })

        if (datas.code === 0) {
            child_box.innerHTML = datas.bodyMessage
        }

    }


})()

//获取数据
async function getdata(id: any) {
    let cookieuserinfo = JSON.parse(window.getusercookie())
    let html = ``

    let newdata = await GetNewsByCompanyId(cookieuserinfo.company.companyId, id, 0)
    let newslist: any = []
    if (newdata.code === 0 && newdata.subCode === subCodeEnums.success) {
        newdata.bodyMessage.forEach(item => {
            newslist.push({
                logo: item.newsIcon,
                title: item.newsTitle,
                label: [NewsContentTypeArray[item.newsContentType]],
                id: item.newsId,
                author: item.companyName,
                createTime: item.newsTime
            })
        })

        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/newslist.njk', name: 'newslist', data: { type: 1, newdata: newslist } })

        if (datas.code === 0) {
            html = datas.bodyMessage
        }
    }


    return html
}

(function () {
    //点击置顶
    let child_box = document.querySelector('#usermain .publish .child_box')
    on({
        agent: child_box,
        events: 'click',
        ele: '.stick',
        fn: function (dom: any, ev: any) {
            let id = $(dom).data('id')
            if (pageIndex === 1) {
                $($(child_box).find('.child')[0]).find('.stick').show()
                $(child_box).prepend($(dom).parents('.child'))
                $(dom).hide()
                alert('置顶成功')
            } else {
                $(dom).parents('.child').remove()
                alert('置顶成功')
            }

        }
    })
})();


//销售信息
(function () {
    let market = document.querySelector('#usermain .publish .child_box')

    //删除
    on({
        agent: market,
        events: 'click',
        ele: '.del',
        fn: async function (dom: any, ev: any) {
            let id = $(dom).data('id')

            let datajson = await delNews({
                newsId: id,
                companyId: companyId,
                productId: 0,
                newsType: [],
                newsTitle: '',
                source: '',
                newsContent: '',
                newsIcon: '',
                createUser: userId
            })

            if (datajson.code === 0 && datajson.subCode === subCodeEnums.success) {
                $(dom).parents('.child').remove()
                alert('删除成功')
            } else {
                alert('删除失败')
            }


        }
    })

    //置顶
    on({
        agent: market,
        events: 'click',
        ele: '.stick',
        fn: function (dom: any, ev: any) {
            let id = $(dom).data('id')
            $($(market).find('.child')[0]).find('.stick').show()
            $(market).prepend($(dom).parents('.child'))
            $(dom).hide()
        }
    })

})()
//----------------------------------------------


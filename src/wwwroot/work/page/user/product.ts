import { kkpager } from '@stl/kkpager'
import { on } from '@stl/tool-ts/src/common/event/on'
import { navigationbar2, usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { GetCompanyProductByTypeId } from '../../common/service/product.services'
import { ResCompanyProductInfoModelPagedModel, ResCompanyProductInfoModelPagedModelReturnModel } from '../../../../model/reputation/resreputation'
import { subCodeEnums } from '../../../../enums/enums'
import { CompanyProductInfoModel } from '../../../../model/company/Company'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { bodyModel } from '../../../../model/resModel'
import window from '../../common/win/windows'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import config from '../../common/config/env'
import { contentType, popupType } from '../../public/script/popup'
import { SetProductTop } from '../../common/service/ManageLepackCompany'
declare const tabType: any
declare let pageIndex: number
declare const totalPages: number
declare const companyId: any
declare const pageSize: any
declare const $: JQueryStatic
let userId = window.getuserid()
let oneWeight = parseInt(document.getElementById('usermain').querySelector('.publish .child_box').querySelectorAll('.child')[0].getAttribute('data-wight')) || 99;


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
                let productTypeId = $('#usermain .publish .navigationbar2 .select').data('id')
                let datajson = await GetCompanyProductByTypeId({
                    companyId,
                    productTypeId,
                    pageIndex: i,
                    pageSize
                })
                let html = await getdata(i === 1 ? 1 : 0, datajson)
                $('#usermain .publish .child_box').html(html)
                window.imgload()
            }

        })
    }

    //已发布 下的切换
    navigationbar2('usermain', async (dom: Element) => {

        let productTypeId = $(dom).data('id')


        let datajson = await GetCompanyProductByTypeId({
            companyId,
            productTypeId,
            pageIndex: 1,
            pageSize
        })



        let html = await getdata(1, datajson)
        $('#usermain .publish .child_box').html(html)

        oneWeight = parseInt(document.getElementById('usermain').querySelector('.publish .child_box').querySelectorAll('.child')[0].getAttribute('data-wight')) || 99
        
        window.imgload()
        kkpager({
            pagerid: 'publish_kkpage',
            total: datajson.bodyMessage.totalPages,
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
                let datajson = await GetCompanyProductByTypeId({
                    companyId,
                    productTypeId,
                    pageIndex: i,
                    pageSize
                })


                let html = await getdata(i === 1 ? 1 : 0, datajson)
                $('#usermain .publish .child_box').html(html)
                window.imgload()
            }

        })

    })

})()

//获取数据
async function getdata(type: number, data: ResCompanyProductInfoModelPagedModelReturnModel) {
    if (data.code === 0 && data.subCode === subCodeEnums.success) {

        let companyObject: any[] = []

        if (data.bodyMessage) {
            data.bodyMessage.items.forEach(item => {
                let label: string[] = []
                Object.keys(item.classify).forEach(function (index) {
                    label.push(item.classify[index])
                })
                companyObject.push({
                    logo: item.productCover,
                    title: item.productName,
                    label,
                    id: item.productId,
                    companyId,
                    createTime: `${item.listingDateYear}-${item.listingDateMonth}`,
                    topWeight: item.topWeight
                })
            })
        }
        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/productlist.njk', name: 'productlist', data: { type, companyObject } })
        if (datas.code === 0) {
            return datas.bodyMessage
        }

        return ''
    } else {
        return ''
    }



}



// /**
//  * 企业产品置顶操作
//  * @param {number} productId 产品id
//  * @param {boolean} isTop 是否置顶
//  * @param {number} topWeight 置顶权重 -对应SortId字段
//  * @param {number} createUser 操作用户
//  */
// export interface CompanyProductInfoTopModel {
//     productId: number
//     isTop: boolean
//     topWeight: number
//     createUser: number
//   }

(function () {
    //点击置顶
    let child_box = document.querySelector('#usermain .publish .child_box')
    on({
        agent: child_box,
        events: 'click',
        ele: '.stick',
        fn: async function (dom: any, ev: any) {
            let id = $(dom).data('id')
            let topWeight = oneWeight + 1
            let data = await SetProductTop({
                productId: id,
                isTop: true,
                createUser: userId,
                topWeight
            })

            let index = 1
            try {
                index = parseInt(document.getElementById('usermain').querySelector('#publish_kkpage').querySelector('.curr').innerHTML)
            } catch (e) { }

            if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
                oneWeight = topWeight
                if (index === 1) {
                    $($(child_box).find('.child')[0]).find('.stick').show()
                    $(child_box).prepend($(dom).parents('.child'))
                    $(dom).hide()
                } else {
                    $(dom).parents('.child').remove()
                }
                $(dom).parents('.child')[0].setAttribute('data-wight', topWeight.toString())
                alert('置顶成功')
            } else {
                alert('置顶失败，请重新置顶')
            }



        }
    })
})();
//----------------------------------------------

//审核中
(function () {

    if (document.getElementById('review_kkpage')) {
        kkpager({
            pagerid: 'review_kkpage',
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
                // let id = $('#usermain .drafts .navigationbar2 .select').data('id')
                // console.log(id)
                // let html = await getdata(id)
                // $('#usermain .drafts .child_box').html(html)
                // window.imgload()
            }

        })
    }
})();

//草稿
(async function () {

    let draftsStorage = 'draftsStorage'
    let d = JSON.parse(localStorage.getItem(draftsStorage)) || {}
    let data = d[userId] || {}
    let keyAry = Object.keys(data)
    let html = ''
    let drafts = document.getElementById('usermain').querySelector('.drafts .child_box')
    if (keyAry.length <= 0) {
        html = `<div class="empty">
                    <p>没有草稿</p>
                </div>`
        drafts.innerHTML = html
        return
    } else {
        let contentData: any[] = []
        for (let i = 0; i < keyAry.length; i++) {
            let item: CompanyProductInfoModel = data[keyAry[i]]
            contentData.push({
                logo: item.productCover || '/assets/images/loading.png',
                title: item.productName,
                id: keyAry[i],
                companyId
            })
        }
        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/productlist.njk', name: 'productlist', data: { type: 3, companyObject: contentData } })

        if (datas.code === 0) {
            html = datas.bodyMessage
            drafts.innerHTML = html
            window.imgload()
        }

    }







    //-------------------------------
    //删除方法
    let del: HTMLElement = document.getElementById('usermain').querySelector('.del')

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
                    localStorage.setItem(draftsStorage, JSON.stringify(d))
                    alert('删除成功')
                }
            })


        }
    })

})()
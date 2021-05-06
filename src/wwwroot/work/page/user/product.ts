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
declare const tabType: any
declare const pageIndex: number
declare const totalPages: number
declare const companyId: any
declare const pageSize: any
declare const $: JQueryStatic

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
                let html = await getdata(id)
                $('#usermain .publish .child_box').html(html)
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



        let html = await getdata(datajson)

        $('#usermain .publish .child_box').html(html)

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



                let html = await getdata(datajson)
                $('#usermain .publish .child_box').html(html)
            }

        })

    })

})()

//获取数据
async function getdata(data: ResCompanyProductInfoModelPagedModelReturnModel) {
    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        let items = data.bodyMessage.items
        let html = ''
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let labelhtml = ''

            Object.keys(item.classify).forEach(function (index) {
                labelhtml += `<span>${item.classify[index]}</span>`
            })

            html += `<div class="child">
            <img src="${item.productCover}"/>
            <div class="c">
              <h3>${item.productName}</h3>
                <p class="clearfix">
                    ${labelhtml}
                </p>
              <p class="createtime">发布时间：${item.listingDateYear}-${item.listingDateMonth}</p>
    
            </div>
            <div class="r">
              <a href="/user/sales/2/11">修改</a>
              <a href="javascript:(0)" data-id="${item.productId}" class="stick" style='display:${i === 0 ? 'none' : 'block'}'>置顶</a>
            </div>
          </div>`
        }
        return html
    } else {
        return ''
    }



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
//----------------------------------------------

//审核中
(function () {
    //已发布下的分页
    if (document.getElementById('drafts_kkpage')) {
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
                let id = $('#usermain .drafts .navigationbar2 .select').data('id')
                console.log(id)
                let html = await getdata(id)
                $('#usermain .drafts .child_box').html(html)
            }

        })
    }
})();

//草稿
(async function () {

    let draftsStorage = 'draftsStorage'
    let data = JSON.parse(localStorage.getItem(draftsStorage)) || {}

    let keyAry = Object.keys(data)
    let html = ''
    if (keyAry.length <= 0) {
        html = `<div class="empty">
                    <p>没有草稿</p>
                </div>`
    } else {
        let contentData: any[] = []
        for (let i = 0; i < keyAry.length; i++) {
            let item: CompanyProductInfoModel = data[keyAry[i]]
            contentData.push({
                logo: item.productCover || '/assets/images/loading.png',
                title: item.productName,
                id: keyAry[i]
            })
        }
        let datas: bodyModel<string> = await getcomponent({ path: 'components/user/productlist.njk', name: 'productlist', data: { type: 3, companyObject: contentData } })

        if (datas.code === 0) {
            html = datas.bodyMessage
        }

    }



    let drafts = document.getElementById('usermain').querySelector('.drafts .child_box')

    drafts.innerHTML = html

    //-------------------------------
    //删除方法
    let del: HTMLElement = document.getElementById('usermain').querySelector('.del')

    on({
        agent: document.getElementById('usermain').querySelector('.drafts'),
        events: 'click',
        ele: '.del',
        fn: function (dom: HTMLElement, e: Event) {

            let id = dom.getAttribute('data-id')

            $(dom).parents('.child').remove()
            delete data[id]
            localStorage.setItem(draftsStorage, JSON.stringify(data))
            alert('删除成功')
        }
    })

})()
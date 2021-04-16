import { kkpager } from '@stl/kkpager'
import { on } from '@stl/tool-ts/src/common/event/on'
import { navigationbar2, usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const tabType: any
declare const pageIndex: number
declare const $: JQueryStatic

//审核中
(function(){
    //已发布下的分页
    if (document.getElementById('questions_kkpage')) {
        kkpager({
            pagerid: 'questions_kkpage',
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
            }

        })
    }

    if (document.getElementById('kb_kkpage')) {
        kkpager({
            pagerid: 'kb_kkpage',
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
            }

        })
    }
})();

(function () {
    //tab切换
    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
    })
})()
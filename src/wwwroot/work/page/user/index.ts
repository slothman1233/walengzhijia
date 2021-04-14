import { kkpager } from '@stl/kkpager'
import { usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic
// eslint-disable-next-line no-undef
declare const document: Document
declare const pageIndex: number
declare const notificationType: any
(function () {
    kkpager({
        pagerid: 'systematic_kkpage',
        total: 20,
        pno: pageIndex,
        mode: 'link',
        isShowFirstPageBtn: false,
        isShowLastPageBtn: false,
        isShowLastPage: false,
        lang: {
            prePageText: '上一页',
            nextPageText: '下一页',
        },
        getLink: (t: any) => {
            return `/user/index/1/${t}`
        }

    })

    kkpager({
        pagerid: 'interaction_kkpage',
        total: 20,
        pno: pageIndex,
        mode: 'link',
        isShowFirstPageBtn: false,
        isShowLastPageBtn: false,
        isShowLastPage: false,
        lang: {
            prePageText: '上一页',
            nextPageText: '下一页',
        },
        getLink: (t: any) => {
            return `/user/index/2/${t}`
        }

    })

})();



(function () {
    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
    })
})()
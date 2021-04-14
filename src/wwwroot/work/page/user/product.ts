import { kkpager } from '@stl/kkpager'
declare const tabType: any
declare const pageIndex: number
(function () {

    if (document.getElementById('publish_kkpage')) {
        kkpager({
            pagerid: 'publish_kkpage',
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
                return `/user/product/1/${tabType}/${t}`
            }

        })
    }

})()
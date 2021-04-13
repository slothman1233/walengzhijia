import { kkpager } from '@stl/kkpager'

// eslint-disable-next-line no-undef
declare const document: Document
declare const pageIndex: number
declare const notificationType: any
(function () {
    kkpager({
        pagerid: 'kkpage',
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
            return `/user/index/${notificationType}/${t}`
        }

    })

})()


//
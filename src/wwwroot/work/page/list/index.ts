import { kkpager } from '@stl/kkpager'
let kkpage = kkpager({
    pagerid: 'kkpage',
    total: 20,
    pno: 7,
    mode: 'click',
    isShowFirstPageBtn: false,
    isShowLastPageBtn: false,
    isShowLastPage: false,
    lang: {
        prePageText: '上一页',
        nextPageText: '下一页',
    }
})
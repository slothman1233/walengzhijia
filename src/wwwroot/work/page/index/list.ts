import { kkpager } from '@stl/kkpager'
import { addClass } from '@stl/tool-ts/src/common/dom/addClass'
import { removeClass } from '@stl/tool-ts/src/common/dom/removeClass'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import { on } from '@stl/tool-ts/src/common/event'
// eslint-disable-next-line no-undef
declare const document: Document
declare const pageIndex: number
declare const productid: any
declare const sortid: any
(function () {
    let kkpage = kkpager({
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
            return `/list/${productid}/${sortid}/${t}`
        }
        // click: (i: number) => {
        //     console.log(i)
        //     document.location.href = `/list/${productid}/${sortid}/${i}`
        //     return false
        // }
    })
})();


//产品分类的效果切换
(function () {
    let category = document.getElementById('category')
    let sCategories: HTMLElement = category.querySelector('.sCategories')
    let bCategories: HTMLElement = category.querySelector('.bCategories')
    let packup: HTMLElement = category.querySelector('.packup')

    packup.onclick = function () {
        if (sCategories.style.display === 'none') {
            sCategories.style.display = 'block'
            packup.innerText = '收起'
        } else {
            sCategories.style.display = 'none'
            packup.innerText = '展开'
        }
    }

    let data = [
        {
            id: 0,
            name: '​瓦楞纸33板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }, {
            id: 1,
            name: '​瓦楞纸板生产整线'
        }
    ]



    on({
        agent: bCategories,
        events: 'click',
        ele: 'span',
        fn: function (dom:any, e:any) {
            let html = ''
            siblings(dom, function (d:any) {
                removeClass(d, 'active')
            })
            addClass(dom, 'active')
            data.forEach((item, index) => {

                let { id, name } = item
                html += '<span class="" id="' + id + '">' + name + '</span>'
            })
            sCategories.innerHTML = html
        }
    })

    on({
        agent: sCategories,
        events: 'click',
        ele: 'span',
        fn: function (dom:any, e:any) {
            siblings(dom, function (d:any) {
                removeClass(d, 'active')
            })
            addClass(dom, 'active')

            let bid = bCategories.querySelector('.active').id
            let sid = dom.id
            document.location.href = `/list/${bid}/${sid}`
        }
    })



})()
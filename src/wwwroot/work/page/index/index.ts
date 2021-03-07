import { imageSlider } from '@stl/image-slider'
import { compatible } from '@stl/tool-ts/src'
import { index } from '@stl/tool-ts/src/common/compatible'
import { addClass, hide, removeClass, show } from '@stl/tool-ts/src/common/dom'
import { on } from '@stl/tool-ts/src/common/event'
// eslint-disable-next-line no-undef
declare const document: Document


(function () {
    let imgSliders = new imageSlider({
        sliderWindowId: 'slider_parents',
        intervals: 3000,
        time: 500,
        hover: false,
        switchType: 'hover',
        sliderDomId: 'slider_doms',
        sliderListName: '.slider_list',
        switch: false
    })
})();

(function () {
    let brand = document.querySelector('.brand')

    let list = brand.querySelector('.list')

    let list_box = brand.querySelector('.list_box')



    //热门品牌
    on({
        agent: list,
        events: 'mouseover',
        ele: 'a',
        fn: function (dom: any, event: any) {
            let ins = index(dom)

            for (let i = 0; i < list.querySelectorAll('a').length; i++) {
                let dom = list.querySelectorAll('a')[i]
                if (i === ins) {
                    addClass(dom.querySelector('span'), 'select')
                    continue
                }
                removeClass(dom.querySelector('span'), 'select')

            }

            hide(list_box.querySelectorAll('.list_item'))

            show(list_box.querySelectorAll('.list_item')[ins])
        }
    })


})()
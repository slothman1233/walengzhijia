import { addClass } from '@stl/tool-ts/src/common/dom/addClass'
import { removeClass } from '@stl/tool-ts/src/common/dom/removeClass'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import { on } from '@stl/tool-ts/src/common/event'
import { isString } from '@stl/tool-ts/src/common/obj/isString'

type navigationbar2cb = (dom: Element) => void

export function navigationbar2(parentId: string, callback: navigationbar2cb) {

    let parentdom = document.getElementById(parentId)

    if (!parentdom) { return }

    let navigationbar2 = parentdom.querySelector('.navigationbar2')

    on({
        agent: navigationbar2,
        events: 'click',
        ele: 'span',
        fn: function (dom: any, e: any) {
            let html = ''
            siblings(dom, function (d: any) {
                removeClass(d, 'select')
            })
            addClass(dom, 'select')
            callback && callback(dom)
        }
    })
}

export function navigationbar(parentId: string | HTMLElement, callback: navigationbar2cb) {


    let parentdom: any = parentId

    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }



    if (!parentdom) { return }

    let navigationbar = parentdom.querySelector('.navigationbar')

    on({
        agent: navigationbar,
        events: 'click',
        ele: 'a',
        fn: function (dom: any, e: any) {
            let html = ''
            siblings(dom, function (d: any) {
                removeClass(d.querySelector('span'), 'select')
            })
            addClass(dom.querySelector('span'), 'select')
            callback && callback(dom)
        }
    })
}

export function usernavigationbar(parentId: string | HTMLElement, callback: navigationbar2cb) {

    let parentdom: any = parentId

    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }

    if (!parentdom) { return }

    let navigationbar = parentdom.querySelector('.usernavigationbar')

    on({
        agent: navigationbar,
        events: 'click',
        ele: 'a',
        fn: function (dom: any, e: any) {
            let html = ''
            siblings(dom, function (d: any) {
                removeClass(d.querySelector('span'), 'select')
            })
            addClass(dom.querySelector('span'), 'select')
            callback && callback(dom)
        }
    })
}
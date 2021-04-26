import { isString } from '@stl/tool-ts/src/common/obj/isString'

type cb = (e: Event, val: number) => void

export function starfn(parentId: string | HTMLElement, callback: cb) {
    let parentdom:any = parentId
    if (isString(parentId)) {parentdom = document.getElementById(<string>parentId)}
 
    let star: HTMLElement = parentdom.querySelector('.star')
    if (!parentdom) { return }

    let selectOption: HTMLElement = parentdom.querySelector('.selectOption h1')

    star.onclick = function (e) {
        let ev: any = e || event
        let val = Math.ceil(ev.offsetX / (<any>this).offsetWidth * 100 / 10) * 10
        star.querySelector('span').style.width = val + '%'
        callback && callback(ev, val / 20)

    }
}
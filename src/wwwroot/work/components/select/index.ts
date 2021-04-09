import { addEvent } from '@stl/tool-ts/src/common/compatible/addEvent'
import { eventsPath } from '@stl/tool-ts/src/common/event/eventsPath'
import { on } from '@stl/tool-ts/src/common/event/on'
import { NodeListToArray } from '@stl/tool-ts/src/common/obj/NodeListToArray'




type navigationbar2cb = (dom: Element, e: Event, option: HTMLElement) => void

export function selectOption1(parentId: string, callback: navigationbar2cb) {
    let parentdom = document.getElementById(parentId)
    let option: HTMLElement = parentdom.querySelector('.option')
    if (!parentdom) { return }

    let selectOption: HTMLElement = parentdom.querySelector('.selectOption h1')



    addEvent(document, 'click', function (e: any) {
       
        let ev = e || event
        let path = eventsPath(ev)
      
        for (let i = 0; i < path.length; i++) {

            if (path[i] === this) { break }
            if (path[i].nodeName === '#document') { break }
            if (path[i] === selectOption) {
                console.log(path[i] === selectOption)
                option.style.display = 'block'
                return
            } else if (path[i] === option && path[i - 1]) {
                let id = e.target.dataset['id']
                selectOption.querySelector('span').innerText = e.target.innerText
                selectOption.dataset['id'] = id
                callback && callback(id, e, option)
                return
            }

        }
        option.style.display = 'none'
    })
}
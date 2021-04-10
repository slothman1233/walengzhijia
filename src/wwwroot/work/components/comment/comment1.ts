import { isString } from '@stl/tool-ts/src/common/obj/isString'
import { insertBefore } from '@stl/tool-ts/src/common/dom/insertBefore'
import { hasClass, addClass, removeClass } from '@stl/tool-ts/src/common/dom'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { on } from '@stl/tool-ts/src/common/event/on'
declare const $: JQueryStatic

type callbacks = (value: string) => void

export function comment1fn(parentId: string | HTMLElement, callback: callbacks) {

    let parentdom: any = parentId

    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }

    let submit: HTMLElement = parentdom.querySelector('.submit')

    if (!parentdom) { return }

    let input = submit.querySelector('input')

    let subtn = submit.querySelector('a')

    let list_box = parentdom.querySelector('.list_box')

    subtn.onclick = async function () {
        if (input.value.length <= 0) {
            alert('回答不能为空！')
            return
        }

        let userid = (<any>this).dataset['id']


        callback && callback(input.value)



        let datas = {
            args: [{
                username: 'fff',
                userid: '123213',
                userhread: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
                createtime: '2021-11-11',
                content: input.value,
                praise: '2000'
            }]
        }

        let data: bodyModel<string> = await getcomponent({ path: 'components/comment/comment1.njk', name: 'commonchild', data: datas })

        if (data.code === 0) {
            $(list_box).prepend(data.bodyMessage)
        }
        input.value = ''
        alert('提交成功！')

    }

    let praise = parentdom.querySelector('.praise')

    on({
        agent: parentdom,
        events: 'click',
        ele: '.praise',
        fn: function (dom: any, ev: any) {
            let val = parseInt(dom.querySelector('span').innerText)
            let i = dom.querySelector('i')
            let rank = 'rank'
            if (hasClass(dom, rank)) {
                i.innerHTML = '&#xE018;'
                removeClass(dom, rank)
                dom.querySelector('span').innerText = Math.max(0, val - 1)
            } else {
                i.innerHTML = '&#xE017;'
                addClass(dom, rank)
                dom.querySelector('span').innerText = val + 1
            }
        }
    })

    //展开收缩 提交回答按钮
    on({
        agent: list_box,
        events: 'click',
        ele: '.reply a',
        fn: function (dom: any, ev: any) {
            let parent = $(dom).parent()
            let sub = parent.siblings('.sub')
            let list_box = sub.parents('.list_box')
            if (sub[0].style.display === 'none') {
                //隐藏所有的提交框
                list_box.find('.sub').hide()
                sub.show()
            } else {
                sub.hide()
            }
        }
    })


    //展开收缩 更多回复
    on({
        agent: list_box,
        events: 'click',
        ele: '.reply span',
        fn: function (dom: any, ev: any) {
            let parent = $(dom).parent()
            let child_box = parent.siblings('.child_box')
            let i = dom.querySelector('i')
            if (child_box[0].style.display === 'none') {
                i.innerHTML = '&#xE013;'
                child_box.show()
            } else {
                i.innerHTML = '&#xE007;'
                child_box.hide()
            }
        }
    })

    //评论按钮
    on({
        agent: list_box,
        events: 'click',
        ele: '.sub a',
        fn: async function (dom: any, ev: any) {
            let btn = $(dom)
            let child_box = btn.parents('.child_box')
            let input = btn.siblings('.input').find('input')
            let sub = btn.parent()
            let value = input.val()

            if (value.length <= 0) {
                alert('回答不能为空！')
                return
            }

            let userid = (<any>dom).dataset['id']

            let parentId = (<any>dom).dataset['parentid'] || 0


            let datas = {
                args: [{
                    parentId: parentId === 0 ? userid : parentId,
                    username: 'fff',
                    userid: '123213',
                    userhread: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
                    createtime: '2021-11-11',
                    content: value,
                    praise: '2000',
                    at: parentId === 0 ? null : {
                        username: 'fff',
                        userid: userid,
                        content: '1.5L和1.3T的哪个更值得买?1.5L和1.3T的哪个更值得买?1.5L和1.3T的哪个更值得买?'
                    }
                }]
            }

            let data: bodyModel<string> = await getcomponent({ path: 'components/comment/comment1.njk', name: 'commonchild', data: datas })

            if (data.code === 0) {
                let reply
                //回复一级评论
                if (parentId === 0) {
                    sub.siblings('.child_box').prepend(data.bodyMessage)
                    reply = sub.siblings('.reply')


                } else {
                    child_box.prepend(data.bodyMessage)
                    reply = child_box.siblings('.reply')
                }
                if (reply.find('span').css('display') === 'none') { reply.find('span').show() }
                let b = reply.find('span b')
                let repliesCount = parseInt(b.text())
                b.text((repliesCount + 1).toString())
                input.val('')
                alert('提交成功！')
                sub.hide()
            }

        }
    })


}
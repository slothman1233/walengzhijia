
/**
 * 重写弹窗
 * @param str 
 */

import { isString } from '../../../../../../common/utils/type_check'

/**
 * 弹窗类型
 * 1 大
 * 2 中
 * 3 小
 */
export enum popupType {
    b = 1,
    c = 2,
    s = 3
}
/**
  * 内容显示类型
  * 1 正确
  * 2 错误
  * 3 警告
  */
export enum contentType {
    success = 1,
    error = 2,
    warning = 3
}

/**
 * 弹窗的模型
 * @param {string} title 标题
 * @param {string} str 内容
 * @param {popupType} type 弹窗类型
 * @param {Function} closeCallback 取消的回调
 * @param {Function} successCallback 确定的回调 或者 自动关闭后的回调
 * @param {number} timeout 多少秒后自动关闭 默认3秒
 */
type bpopupModel = {
    title?: string,
    str?: string,
    contentType?: contentType,
    type?: popupType
    closeCallback?: Function,
    successCallback?: Function
    timeout?: number
}

(function (window) {

    function spopup({
        title, str, contentType, successCallback, timeout
    }: bpopupModel) {

        // let color = getColor(contentType)

        // let t = title || getDefaultTitle(contentType)

        let html = `
        <div class="popup_box" style="
        width: 60%;
        background-color:transparent;
        position:fixed;
        left:50%;
        top:30vh;
        margin: 0 0 0 -30%;
        text-align: center;
        ">   
        <div class="content" style="background-color: rgba(0,0,0,0.8);display: inline-block;padding: .32rem .42rem;border-radius: .13rem;">
             <div style="">
                 <h4 style="
                 color: #FFF;
                 font-size:16px;
                 line-height:1.5;
                 ">${title}</h4>
             </div>
        </div>
        </div>
 `

        let div = document.createElement('div')
        div.innerHTML = html

        document.body.appendChild(div)

        let st = setTimeout(() => {
            successCallback && successCallback()
            div && div.remove()
        }, timeout || 3000)

        setTimeout(() => {
            div.onclick = function () {
                div && div.remove()
                clearTimeout(st)
            }
        }, 200)

    }

    /**
* 弹窗的模型
* @param {string} title 标题
* @param {string} str 内容
* @param {popupType} type 弹窗类型 1 大 2 中 3 小
* @param {contentType} contentType 内容显示类型 1 正确  2 错误 3警告
* @param {Function} closeCallback 取消的回调
* @param {Function} successCallback 确定的回调 或者 自动关闭后的回调
* @param {number} timeout 多少秒后自动关闭 默认3秒
*/
    window.alert = function (object: string | bpopupModel) {

        if (isString(object)) {
            spopup({
                title: <string>object,
                contentType: contentType.success
            })
            return
        }


        // switch ((<bpopupModel>object).type || popupType.s) {
        //     case popupType.b:
        //         bpopup(<bpopupModel>object)
        //         break
        //     case popupType.c:
        //         cpopup(<bpopupModel>object)
        //         break
        //     case popupType.s:
        //         spopup(<bpopupModel>object)
        //         break
        //     default:
        //         spopup(<bpopupModel>object)
        //         break
        // }
    }

})(window)
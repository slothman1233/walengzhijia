
/**
 * 重写弹窗
 * @param str 
 */

import { isString } from '../../../../common/utils/type_check'

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

    function getColor(type: contentType) {
        let color: string
        switch (type) {
            case contentType.success:
                color = '#52C41A'
                break
            case contentType.error:
                color = '#FF4D4F'
                break
            case contentType.warning:
                color = '#FAAD14'
                break
            default:
                color = '#52C41A'
                break
        }
        return color
    }


    function getIcon(type: contentType) {
        let icon: string
        switch (type) {
            case contentType.success:
                icon = '&#xE020;'
                break
            case contentType.error:
                icon = '&#xE039;'
                break
            case contentType.warning:
                icon = '&#xE021;'
                break
            default:
                icon = '&#xE039;'
                break
        }
        return icon
    }

    function getDefaultTitle(type: contentType) {
        let title: string
        switch (type) {
            case contentType.success:
                title = '发送成功！'
                break
            case contentType.error:
                title = '这是一个错误消息！'
                break
            case contentType.warning:
                title = '你确定要删除这个吗?'
                break
            default:
                title = '发送成功！'
                break
        }
        return title
    }


    function bpopup({
        title, str, contentType, closeCallback, successCallback
    }: bpopupModel) {
        let color = getColor(contentType)

        let t = title || getDefaultTitle(contentType)

        let html = `
      <div id="popup_alert" style="position: fixed;left:0; right:0; top:0; bottom:0;z-index: 20000;">
         <div class="popup_box" style="
         width:416px; 
         background-color:#FFF;
         position:absolute;
         left:50%;
         top:200px;
         margin:0 0 0 -208px;
         box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
         box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08); 
         box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
         padding:32px 32px 24px 32px;
         box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
         ">

         <div class="content" style=" overflow: hidden;">
              <i class="iconfont_wlzj" style="
                display:block;
                float:left;
                width:22px;
                height:22px;
                border-radius:50%;
                border: 1px solid ${color};
                color:${color};
                text-align: center;
                line-height: 22px;
                font-size:14px;
              ">${getIcon(contentType)}</i>
              <div style="padding-left:38px;    margin-bottom: 60px;">
                  <h4 style="
                  color:rgba(42, 43, 46, 1);
                  font-size:16px; 
                  line-height:1.5;
                  margin-bottom:8px;
                  font-wight:bold;
                  ">${t}</h4>
                  <p style="
                  color:rgba(90, 92, 95, 1);
                  font-size:14px;
                  line-height:1.5;
                  ">${str}</p>
              </div>
         </div>
         
         <div class="btn" style="position:absolute; right:32px; bottom:24px;">
          <a href="javascript:void(0);" class="cancel" style='
          background: #FFF;
          border-radius: 2px;
          margin-right:8px;
          color:rgba(42, 43, 46, 1);
          font-size:14px;
          line-height:32px;
          padding:0 16px;
          border:1px solid rgba(205, 208, 212, 1);
              display: inline-block; 
           '
           >取消</a>
          <a href="javascript:void(0);" class="submit"  style='
          background: #FFDD88;
          border-radius: 2px;
          color:rgba(42, 43, 46, 1);
          font-size:14px;
          line-height:32px;
          padding:0 16px;
          border:1px solid #FFDD88;
              display: inline-block;
          '
          
          >确定</a>
         </div>
         
         </div>
      </div>
   `

        let div = document.createElement('div')
        div.innerHTML = html

        document.body.appendChild(div);


        (<HTMLElement>div.querySelector('.cancel')).onclick = function () {
            closeCallback && closeCallback()
            div.remove()

        };

        (<HTMLElement>div.querySelector('.submit')).onclick = function () {
            successCallback && successCallback()
            div.remove()
        }

    }

    function cpopup({
        title, str, contentType, successCallback, timeout
    }: bpopupModel) {

        let color = getColor(contentType)

        let t = title || getDefaultTitle(contentType)

        let html = `
      <div id="popup_alert" style="position: fixed;left:0; right:0; top:0; bottom:0;z-index: 20000;">
         <div class="popup_box" style="
         width:416px; 
         background-color:#FFF;
         position:absolute;
         left:50%;
         top:200px;
         margin:0 0 0 -208px;
         box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
         box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08); 
         box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
         padding:32px 32px 24px 32px;
         box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
         ">

         <div class="content" style=" overflow: hidden;">
              <i class="iconfont_wlzj" style="
                display:block;
                float:left;
                width:22px;
                height:22px;
                border-radius:50%;
                border: 1px solid ${color};
                color:${color};
                text-align: center;
                line-height: 22px;
                font-size:12px;
              ">${getIcon(contentType)}</i>
              <div style="padding-left:38px;">
                  <h4 style="
                  color:rgba(42, 43, 46, 1);
                  font-size:16px; 
                  line-height:1.5;
                  margin-bottom:8px;
                  font-wight:bold;
                  ">${t}</h4>
                  <p style="
                  color:rgba(90, 92, 95, 1);
                  font-size:14px;
                  line-height:1.5;
                  ">${str}</p>
              </div>
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

    function spopup({
        title, str, contentType, successCallback, timeout
    }: bpopupModel) {

        let color = getColor(contentType)

        let t = title || getDefaultTitle(contentType)

        let html = `
    <div id="popup_alert" style="position: fixed;left:0; right:0; top:0; bottom:0;z-index: 20000;">
       <div class="popup_box" style="
       width:416px; 
       background-color:#FFF;
       position:absolute;
       left:50%;
       top:200px;
       margin:0 0 0 -208px;
       box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
       box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08); 
       box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
       padding:32px 32px 24px 32px;
       box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
       ">

       <div class="content" style=" overflow: hidden;">
            <i class="iconfont_wlzj" style="
              display:block;
              float:left;
              width:22px;
              height:22px;
              border-radius:50%;
              border: 1px solid ${color};
              color:${color};
              text-align: center;
              line-height: 22px;
              font-size:12px;
            ">${getIcon(contentType)}</i>
            <div style="padding-left:38px;">
                <h4 style="
                color:rgba(42, 43, 46, 1);
                font-size:16px; 
                line-height:1.5;
                margin-bottom:8px;
                font-wight:bold;
                ">${t}</h4>
            </div>
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


        switch ((<bpopupModel>object).type || popupType.s) {
            case popupType.b:
                bpopup(<bpopupModel>object)
                break
            case popupType.c:
                cpopup(<bpopupModel>object)
                break
            case popupType.s:
                spopup(<bpopupModel>object)
                break
            default:
                spopup(<bpopupModel>object)
                break
        }
    }

})(window)
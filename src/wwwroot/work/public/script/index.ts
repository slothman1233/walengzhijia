import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'

import './popup'
import window from '../../common/win/windows'
import { delCookie, setCookie } from '../../common/utils/common'
import './top'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic

//全部图片加载
//img的src不用赋值   只用加个 _src_  属性就OK
window.imgload = function () {
    let imgAry = document.body.querySelectorAll('img[_src_]')
    imgAry.forEach((dom: HTMLImageElement) => {
        let path = dom.getAttribute('_src_')
        if (path && !dom.src) {
            dom.onerror = function (r: any) {
                //   this.style.backgroundImage = 'none'
                this.src = '/assets/images/loading.png'
            }
            dom.removeAttribute('_src_')
            // dom.style.backgroundImage = 'none'
            dom.src = path
        } else if (!path && !dom.src) {
            //  dom.style.backgroundImage = 'none'
            dom.src = '/assets/images/loading.png'
        }
    })
};


(function () {
    window.imgload()


    $('video').bind('contextmenu', function () {
        return false
    })
})()

/**
 * 获取用户cookie
 */
window.getusercookie = function () {
    let cookie = getCookie(config.userlogin)
    if (cookie) {
        let v = JSON.parse(cookie)
        if (v.company) {
            v.company = JSON.parse(decodeURIComponent(localStorage.getItem(config.userlogin)))
        }
        return JSON.stringify(v)
    }
    return getCookie(config.userlogin)
}
/**
 * 写入cookie
 * @param {String} value cookie值
 * @param {String} time  存储时间 收一个字符是代表的时间名词
                        s20是代表20秒
                        h是指小时，如12小时则是：h12
                        d是天数，30天则：d30
 */
window.setusercookie = function (value: string, time: string = 'd999') {
    return setCookie(config.userlogin, value, time)
}

window.removeusercookie = function () {
    return delCookie(config.userlogin)
}



window.getlocalStorageuser = function () {
    return decodeURIComponent(localStorage.getItem(config.userlogin))
}

window.setlocalStorageuser = function (value: string) {
    return localStorage.setItem(config.userlogin, encodeURI(value))
}
window.removelocalStorageuser = function () {
    return localStorage.removeItem(config.userlogin)
}


/**
 * 获取登录用户id
 * @return {number} 0 是没登录
 */
window.getuserid = function () {
    //用户id
    let userId = 0
    //用户id
    let usercookie = window.getusercookie()
    if (usercookie) {
        userId = parseInt(JSON.parse(usercookie).userId)
    }
    return userId
}





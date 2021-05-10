import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import './top'
import './popup'
import window from '../../common/win/windows'

/**
 * 获取用户cookie
 */
window.getusercookie = function () {
    return getCookie(config.userlogin)
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
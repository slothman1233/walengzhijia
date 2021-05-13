import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import './top'
import './popup'
import window from '../../common/win/windows'
import { setCookie } from '../../../../common/utils/util'


/**
 * 获取用户cookie
 */
window.getusercookie = function () {
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
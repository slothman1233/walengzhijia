﻿// import { logintype } from '../../page/login/login'


/**
 * 显示登录界面默认展示的类型
 * phonelogin  手机登录
 * pwdlogin  手机密码登录
 * register  注册
 */
export enum logintype {
    phonelogin = 1,
    pwdlogin = 2,
    register = 3
}

export type loginshowobject = {
    types?: logintype
    isshowclose?: boolean
}

type w = {
    /**
     * 图片加载
     */
    imgload?: () => void
    /**
     * 获取用户cookie
     */
    getusercookie?: () => string,
    /**
     * 写入cookie
     * @param {String} value cookie值
     * @param {String} time  存储时间 收一个字符是代表的时间名词
                            s20是代表20秒
                            h是指小时，如12小时则是：h12
                            d是天数，30天则：d30
    */
    setusercookie?: (value: string, time?: string) => void


    getlocalStorageuser?: () => string,

    setlocalStorageuser?: (value: string) => any,

    removelocalStorageuser?: () => any,

    /**
     * 获取登录用户id
     * @return {number} 0 是没登录
     */
    getuserid?: () => number
    /**
     * 删除用户cookie
     */
    removeusercookie?: () => void
    /**
     * 弹出登录界面
     * @param {logintype} type 显示登录界面默认展示的类型
     */
    loginshow?: (object?: loginshowobject | logintype) => void
    [propName: string]: any;
}

let win: w
declare let global: w
declare let window: w
declare let self: w
if (typeof window !== 'undefined') {
    win = window
} else if (typeof global !== 'undefined') {
    win = global
} else if (typeof self !== 'undefined') {
    win = self
} else {
    win = {}
}

export default win
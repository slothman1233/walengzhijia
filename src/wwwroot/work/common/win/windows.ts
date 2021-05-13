import { logintype } from '../../page/login/login'

type w = {
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
    loginshow?: (type?: logintype) => void
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
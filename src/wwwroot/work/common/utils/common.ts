import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'

export function delCookie(name: string) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = getCookie(name)
    if (cval !== null) {
        document.cookie = name + '=' +  encodeURIComponent(cval) + ';path=/;expires=' + (<any>exp).toGMTString() + ';max-age=0;'
        // document.cookie = "uuid=;path=/;expires=" + new Date(0) + ";max-age=0;"
    }
}


/**
 * 写入cookie
 * @param {String} name  cookie名
 * @param {String} value cookie值
 * @param {String} time  存储时间 收一个字符是代表的时间名词
                        s20是代表20秒
                        h是指小时，如12小时则是：h12
                        d是天数，30天则：d30
 */
export function setCookie(name: string, value: string, time: string, domain?: string) {
    let strsec = getsec(time)
    let exp: any = new Date()
    let domainStr = domain ? ';domain=' + domain : ''
    exp.setTime(exp.getTime() + strsec * 1)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=/' + domainStr
}
function getsec(str: string) {
    let str1: number = parseFloat(str.substring(1, str.length))
    let str2: string = str.substring(0, 1)
    switch (str2) {
        case 's': return str1 * 1000
        case 'm': return str1 * 60 * 1000
        case 'h': return str1 * 60 * 60 * 1000
        default: return str1 * 24 * 60 * 60 * 1000
    }
}
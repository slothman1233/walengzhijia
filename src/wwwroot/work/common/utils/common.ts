import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'

export function delCookie(name: string) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = getCookie(name)
    if (cval !== null) { document.cookie = name + '=' + cval + ';expires=' + (<any>exp).toGMTString() + ';path=/' }
}
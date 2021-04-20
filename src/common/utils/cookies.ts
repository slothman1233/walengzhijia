import { Context } from 'koa'
import { CacheTime } from '../../enums/enums'
/**
 * cookie模型
 * @param {string} path  写cookie所在的路径
 * @param {number} maxAge cookie有效时长
 * @param {Date} expires cookie失效时间
 * @param {boolean} httpOnly 是否只用于http请求中获取
 * @param {boolean} overwrite 是否允许重写
 * @param {boolean} secure 安全 cookie   默认false，设置成true表示只有 https可以访问
 */
export type setCookieModel = {
    domain?: string,
    path?: string,
    maxAge?: number,
    expires?: Date,
    httpOnly?: boolean,
    overwrite?: boolean,
    secure?: boolean
}



/**
 * 写入cookie
 * @param {Content} ctx 
 * @param {string} name 名字
 * @param {string} value 值
 * @param {setCookieModel} option  写入参数
          * @param {string} domain 写cookie所在的域名  默认 localhost
          * @param {string} path  写cookie所在的路径  默认 /
          * @param {number} maxAge cookie有效时长 默认 1000 * 60 * 60 * 24
          * @param {Date} expires cookie失效时间 默认 new Date()
          * @param {boolean} httpOnly 是否只是服务器可访问 cookie, 默认是 true
          * @param {boolean} overwrite 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉
          * @param {boolean} secure 安全 cookie   默认false，设置成true表示只有 https可以访问
 */
export function setCookie(ctx: Context, name: string, value: string, option: setCookieModel) {


    return ctx.cookies.set(name,  encodeURI(value), {
        domain: option.domain || 'localhost', // 写cookie所在的域名
        path: option.path || '/',       // 写cookie所在的路径
        maxAge: option.maxAge || 1000 * 60 * 60 * 24,   // cookie有效时长
        expires: option.expires, // cookie失效时间
        httpOnly: option.httpOnly === undefined ? true : option.httpOnly,  // 是否只用于http请求中获取
        overwrite: option.overwrite === undefined ? true :option.overwrite,
        secure: option.secure  === undefined ? false :option.secure
    })
}

/**
 * 获取cookie
 * @param {string} name 
 */
export function getCookie(ctx: Context, name: string) {
    let buf = ctx.cookies.get(name)
    return decodeURIComponent(buf)
    
}

/**
 * 删除cookie
 * @param {string} name 
 */
export function delCookie(ctx: Context, name: string) {
    return ctx.cookies.set(name, '', {
        maxAge: CacheTime.None
    })
}
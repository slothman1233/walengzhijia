
import { Context } from 'koa'
import conf from '../common/config/env'
import { post, get } from '../common/decorator/httpMethod'
import * as cookie from '../common/utils/cookies'
import { SuccessModel } from '../model/resModel'



export default class login {



  //   ctx.cookies.set(key, value, {
  //     domain: option.domain || 'localhost', // 写cookie所在的域名
  //     path: option.path || '/',       // 写cookie所在的路径
  //     maxAge: option.maxAge || 1000 * 60 * 60 * 24,   // cookie有效时长
  //     expires: option.expires || new Date(), // cookie失效时间
  //     httpOnly: option.httpOnly || true,  // 是否只用于http请求中获取
  //     overwrite: option.overwrite || false,
  //     secure: option.secure || false
  // })
  @post('/login')
    async login(ctx: Context) {
        debugger
        let { name, value } = ctx.request.body
        //let m = cookie.setCookie(ctx, name, value, {})

        //let n = cookie.getCookie(ctx, name)
        cookie.delCookie(ctx, name)

        ctx.body = new SuccessModel({bodyMessage: {value}})
    }
}
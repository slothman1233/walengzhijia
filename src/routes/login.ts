
import { Context } from 'koa'
import conf from '../common/config/env'
import { post, get } from '../common/decorator/httpMethod'
import * as cookie from '../common/utils/cookies'
import { doCrypto } from '../common/utils/cryp'
import { CacheTime, LoginEnums, subCodeEnums } from '../enums/enums'
import { ErrorModel, SuccessModel } from '../model/resModel'
import { LepackUserLoginModel, LepackUserRegisterModel, LepackUserValidateModel } from '../model/user/User'
import LepackUser from '../services/LepackUser.services'

/**
 * 用户cookie名
 */
export const userlogin = 'USERLOGIN'

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
        let { phoneNumber, validateCode, type, pwd }: LepackUserLoginModel = ctx.request.body
        switch (type) {
            case LoginEnums.Phone:
                let loginDataPhone = await LepackUser.PhoneLogin({
                    phoneNumber,
                    validateCode,
                    pwd
                })
                if (loginDataPhone.subCode === subCodeEnums.success) {
                    cookie.setCookie(ctx, userlogin, JSON.stringify(loginDataPhone.bodyMessage), { maxAge: CacheTime.Day1 * 1000, httpOnly: false })
                }
                ctx.body = loginDataPhone
                break
            case LoginEnums.AccountPwd:
                let loginDataPwd = await LepackUser.PhonePasswordLogin({
                    phoneNumber,
                    pwd
                })
                if (loginDataPwd.subCode === subCodeEnums.success) {
                    cookie.setCookie(ctx, userlogin, JSON.stringify(loginDataPhone.bodyMessage), { maxAge: CacheTime.Day1 * 1000, httpOnly: false})
                }
                ctx.body = loginDataPwd
                break
            default:
                ctx.body = new ErrorModel({ bodyMessage: '登录失败，请重新登录' })

        }
    }

  @post('/loginout')
  async loginout(ctx: Context) {
      //debugger
      //let { phonenumber, verification } = ctx.request.body
      //let m = cookie.setCookie(ctx, name, value, {})

      //let n = cookie.getCookie(ctx, name)
      cookie.delCookie(ctx, userlogin)

      ctx.body = new SuccessModel({})
  }


  // {
  //   "userName": "string",
  //   "phoneNumber": "string",
  //   "validateCode": 0,
  //   "userPwd": "string"
  // }
  @post('/register')
  async register(ctx: Context) {
      debugger
      let { phoneNumber, validateCode, userName, userPwd }: LepackUserRegisterModel = ctx.request.body
      let RegisterData = await LepackUser.GetCompanyInfoByUser({
          phoneNumber,
          validateCode,
          userName,
          userPwd
      })

      ctx.body = RegisterData
  }


  //http://114.55.24.27:5000/api/LepackUser/SendCode
  @post('/sendcode')
  async SendCode(ctx: Context) {
      debugger
      let { phoneNumber, validateCode, validateCodeType }: LepackUserValidateModel = ctx.request.body
      let RegisterData = await LepackUser.SendCode({
          phoneNumber,
          validateCodeType
      })

      ctx.body = RegisterData
  }

}


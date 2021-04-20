import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ResCompanyHotModelListReturnModel, ResCompanyInfoModelReturnModel } from '../model/company/resCompany'
import { bodyModel } from '../model/resModel'
import { CompanyProductInfoModel } from '../model/company/Company'
import { LepackUserLoginModel, LepackUserRegisterModel, LepackUserValidateModel } from '../model/user/User'
import { ResUserModel } from '../model/user/resUser'



class LepackUser {
    // 用户注册
    // LepackUserRegisterModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async GetCompanyInfoByUser(params: LepackUserRegisterModel) {
        return await http.post<string>(`${config.apiPath}api/LepackUser/Register`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 手机号码登录
    // LepackUserLoginModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async PhoneLogin(params: LepackUserLoginModel) {
        return await http.post<ResUserModel>(`${config.apiPath}api/LepackUser/PhoneLogin`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 手机号码密码登录
    // LepackUserLoginModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async PhonePasswordLogin(params: LepackUserLoginModel) {
        return await http.post<ResUserModel>(`${config.apiPath}api/LepackUser/PhonePasswordLogin`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    //http://114.55.24.27:5000/api/LepackUser/PhonePasswordLogin

    // 发送验证码
    // LepackUserValidateModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async SendCode(params: LepackUserValidateModel) {
        return await http.post<string>(`${config.apiPath}api/LepackUser/SendCode`, { params, headers: { 'Content-Type': 'application/json' } })
    }


}






let LepackUsers = new LepackUser()

export default LepackUsers
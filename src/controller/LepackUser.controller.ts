

import { CompanyProductInfoModel } from '../model/company/Company'
import { bodyModel } from '../model/resModel'
import { ResUserModel } from '../model/user/resUser'
import { LepackUserLoginModel, LepackUserRegisterModel, LepackUserUpdatePwdModel, LepackUserValidateModel } from '../model/user/User'
import LepackUsers from '../services/LepackUser.services'




/**
 * 用户注册
 * LepackUserRegisterModel
 */
export async function GetCompanyInfoByUser(params: LepackUserRegisterModel): Promise<bodyModel<string>> {
    return await LepackUsers.GetCompanyInfoByUser(params).catch(data => data)
}
/**
 * 手机号码登录
 * LepackUserLoginModel
 */
export async function PhoneLogin(params: LepackUserLoginModel): Promise<bodyModel<ResUserModel>> {
    return await LepackUsers.PhoneLogin(params).catch(data => data)
}
/**
 * 手机号码密码登录
 * LepackUserLoginModel
 */
export async function PhonePasswordLogin(params: LepackUserLoginModel): Promise<bodyModel<ResUserModel>> {
    return await LepackUsers.PhonePasswordLogin(params).catch(data => data)
}
/**
 * 发送验证码
 * LepackUserValidateModel
 */
export async function SendCode(params: LepackUserValidateModel): Promise<bodyModel<boolean>> {
    return await LepackUsers.SendCode(params).catch(data => data)
}
/**
 * 判断验证码是否正确
 * LepackUserValidateModel
 */
export async function ValidateCode(params: LepackUserValidateModel): Promise<bodyModel<boolean>> {
    return await LepackUsers.ValidateCode(params).catch(data => data)
}

/**
 * 通过手机验证码修改用户密码
 * LepackUserUpdatePwdModel
 */
export async function UpdatePasswordByPhone(params: LepackUserUpdatePwdModel): Promise<bodyModel<boolean>> {
    return await LepackUsers.UpdatePasswordByPhone(params).catch(data => data)
}



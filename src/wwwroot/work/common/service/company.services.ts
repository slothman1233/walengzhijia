

import http from './http'

import env from '../config/env'
import { LepackUserLoginModel } from '../../../../model/user/User'
import { CompanyProductInfoModel } from '../../../../model/company/Company'



/**
 * 登录
 * @param {LoginEnums} type 登录类型
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} pwd 密码
 */
export const Login = async (options: CompanyProductInfoModel): Promise<any> => await http.post<any>(`/login`, options)
// return await http.post<bodyModel<string>>(`${config.apiPath}api/Company/AddCompanyProduct`, params, { headers: { 'Content-Type': 'application/json' } })
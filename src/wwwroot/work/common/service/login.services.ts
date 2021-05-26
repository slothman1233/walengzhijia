

import http from './http'

import env from '../config/env'
import { LepackUserLoginModel, LepackUserRegisterModel, LepackUserUpdatePwdModel, LepackUserValidateModel } from '../../../../model/user/User'
import { ResUserModelReturnModel } from '../../../../model/user/resUser'
import { bodyModel } from '../../../../model/resModel'



/**
 * 登录
 * @param {LoginEnums} type 登录类型
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} pwd 密码
 */
export const Login = async (options: LepackUserLoginModel): Promise<ResUserModelReturnModel> => await http.post<any>(`/login`, options)

/**
 * 登录
 * @param {string} userName 用户名
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} pwd 密码
 */
export const Register = async (options: LepackUserRegisterModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/register`, options)


/**
 * 用户发送验证码
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {ValidateCodeDefine} validateCodeType 验证码类型
 */
export const sendCode = async (options: LepackUserValidateModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/sendcode`, options)


/**
 * 判断验证码是否正确
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {ValidateCodeDefine} validateCodeType 验证码类型
 */
export const ValidateCode = async (options: LepackUserValidateModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/ValidateCode`, options)


/**
 * 通过验证码修改手机号
 * @param {string} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} userPwd 用户密码
 */
export const UpdatePasswordByPhone = async (options: LepackUserUpdatePwdModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/UpdatePasswordByPhone`, options)



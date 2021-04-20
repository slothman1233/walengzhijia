

import http from './http'

import env from '../config/env'
import { LepackUserLoginModel, LepackUserRegisterModel, LepackUserValidateModel } from '../../../../model/user/User'



/**
 * 登录
 * @param {LoginEnums} type 登录类型
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} pwd 密码
 */
export const Login = async (options: LepackUserLoginModel): Promise<any> => await http.post<any>(`/login`, options)

/**
 * 登录
 * @param {string} userName 用户名
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} pwd 密码
 */
export const Register = async (options: LepackUserRegisterModel): Promise<any> => await http.post<any>(`/register`, options)


/**
 * 用户发送验证码
 * @param {number} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {ValidateCodeDefine} validateCodeType 验证码类型
 */
export const sendCode = async (options: LepackUserValidateModel): Promise<any> => await http.post<any>(`/sendcode`, options)



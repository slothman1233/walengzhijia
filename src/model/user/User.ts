import { LoginEnums, UserUpdateTypeDefine, ValidateCodeDefine } from '../../enums/enums'


/**
 * 用户模型
 * @param {string} uuid 用户UUID，guid值
 * @param {string} userId 用户id
 * @param {string} name 用户名
 * @param {string} pwd 密码
 * @param {string} userIcon 用户头像
 * @param {number} sex 性别
 * @param {string} industry 所在行业
 * @param {number} areaCode 所在地区对应地区码
 * @param {string} areaCodeValue 地区信息值
 * @param {string} phoneNumber 手机号码
 * @param {number} createUser 创建用户
 */
export interface LepackUserModel {
  uuid: string
  userId?:string
  name: string
  pwd: string
  userIcon: string
  sex?: number
  industry: string
  areaCode?: number
  areaCodeValue: string
  phoneNumber: string
  createUser?: number
}

/**
 * 用户注册
 * @param {string} userName 用户名，检查唯一性
 * @param {string} phoneNumber 手机号码
 * @param {number} validateCode   验证码
 * @param {string} userPwd 用户密码
 */
export interface LepackUserRegisterModel {
  userName: string
  phoneNumber: string
  validateCode: number
  userPwd: string
}


/**
 * 用户登录模型
 * @param {LoginEnums} type 登录类型 1 手机   2 手机密码登录
 * @param {string} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {string} pwd 密码
 */
export interface LepackUserLoginModel {
  type?: LoginEnums,
  phoneNumber?: string
  validateCode?: number
  pwd?: string
}

/**
 * 用户发送验证码模型
 * @param {string} phoneNumber 手机号码
 * @param {number} validateCode 验证码
 * @param {ValidateCodeDefine} validateCodeType 验证码类型
 */
export interface LepackUserValidateModel {
  phoneNumber: string
  validateCode?: number
  validateCodeType?: ValidateCodeDefine
}


/**
 * 用户数据单项修改
 * @param {number} userId 用户ID
 * @param {string} itemValue 单项修改值
 * @param {UserUpdateTypeDefine} itemType 用户修改类型属性字段枚举
 */
export interface LepackUserItemModel {
  userId?: number
  itemValue: string
  itemType: UserUpdateTypeDefine

}
import { sexEnum } from '../../enums/enums'
import { ResCompanyInfoModel } from '../company/resCompany'
import { bodyModel } from '../resModel'




/**
 * 响应用户模型
 * @param {number} userId 用户ID
 * @param {string} uuid 用户UUID，guid值
 * @param {string} name 用户名
 * @param {string} pwd 密码
 * @param {string} userIcon 用户头像
 * @param {number} sex 性别
 * @param {string} industry 所在行业
 * @param {number} areaCode 所在地区对应地区码
 * @param {string} areaCodeValue 地区信息值
 * @param {string} phoneNumber 手机号码
 */
export interface ResUserModel {
  userId: number
  uuid: string
  name: string
  pwd: string
  userIcon: string
  sex: number
  industry: string
  areaCode: number
  areaCodeValue: string
  phoneNumber: string
  company: ResCompanyInfoModel
}

/**
 * 用户模型的bodyModel模型
 */
export interface ResUserModelReturnModel extends bodyModel<ResUserModel> {

}

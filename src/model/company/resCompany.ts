import { bodyModel } from '../resModel'




/**
 * 公司信息
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {string} website 公司网站首页
 * @param {string} addr 公司联系地址
 * @param {string} desc 公司介绍
 * @param {string} license 营业执照图片
 */
export interface ResCompanyInfoModel {
  companyId: number
  fullName: string
  abbrName: string
  logo: string
  website: string
  addr: string
  desc: string
  license: string

}

/**
 * 公司信息返回的bodyModel模型
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {string} website 公司网站首页
 * @param {string} addr 公司联系地址
 * @param {string} desc 公司介绍
 * @param {string} license 营业执照图片
 */
export interface ResCompanyInfoModelReturnModel extends bodyModel<ResCompanyInfoModel> {

}

/**
 * 口碑概要信息
 * @param {number} score 口碑评分
 * @param {number} reputationCount 口碑数量
 */
export interface ResReputationModel {
  score?: number
  reputationCount?: number
}


/**
 * 热门板块-公司信息
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {number} companySort 排序
 * @param {ResReputationModel} reputation 口碑概要信息
 * @param {string[]} companyLabels 公司标签
 */
export interface ResCompanyHotModel {

  companyId?: number
  fullName: string
  abbrName: string
  logo: string
  companySort?: number
  reputation?: ResReputationModel
  companyLabels: string[]
}

/**
 * 热门板块-公司信息返回的bodyModel模型
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {number} companySort 排序
 * @param {ResReputationModel} reputation 口碑概要信息
 * @param {string[]} companyLabels 公司标签
 */
export interface ResCompanyHotModelListReturnModel extends bodyModel<ResCompanyHotModel[]>{

}







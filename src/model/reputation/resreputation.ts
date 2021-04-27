import { bodyModel } from '../resModel'
import { productTypeListModel } from './reputation'

export interface ResReputationModelListReturnModel extends bodyModel<ResReputationModel[]> {

}


/**
 * 口碑返回模型
 * @param {number} createUser 口碑发表人
 * @param {string} userName 发表人名称
 * @param {string} userIcon 发表人头像
 * @param {string} productName 产品名称
 * @param {number} productId 产品ID
 * @param {number} companyId 公司ID
 * @param {string} summary 口碑描述内容
 * @param {string} productCover 产品封面图
 * @param {ResReputationStatisticsModel} statisticsModel 口碑发表人
 */
export interface ResReputationModel {

  createUser: number
  userName: string
  userIcon: string
  productName: string
  productId: number
  companyName: string
  companyId: number
  summary: string
  productCover: string
  statisticsModel: ResReputationStatisticsModel
}


/**
 * 口碑统计信息
 * @param {number} score 口碑评分(总分)
 * @param {number} reputationCount 口碑数量
 * @param {ResReputationScoreStatisticsModel[]} reputationScore 聚合统计
 */
export interface ResReputationStatisticsModel {
  score: number
  reputationCount: number
  reputationScore: ResReputationScoreStatisticsModel[]


}

/**
 * 口碑评分统计信息
 * @param {number} reputationTypeId 口碑评分项
 * @param {string} reputationTypeName： 口碑评分项名称
 * @param {number} reputationScore 口碑评分项聚合统计值
 * 
 */
export interface ResReputationScoreStatisticsModel {
  reputationTypeId: number
  reputationTypeName: string
  reputationScore: number
}

/**
 * 公司产品详细参数描述
 * @param {string} productKey 产品参数指标
 * @param {string} productValue 产品参数指标值
 */
export interface ResCompanyProductInfoDetailModel {
  productKey: string
  productValue: string

}

/**
 * 产品信息
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 * @param {number} listingDateYear 上市年份
 * @param {number} listingDateMonth 上市月份
 * @param {string} productVideo 产品视频介绍地址
 * @param {string} productCover 产品封面图
 * @param {string} summary 产品详细描述信息
 * @param { { [index: string]: any } } classify  允许提交多个三级标签场景
 * @param {ResReputationStatisticsModel} statisticsModel 	口碑统计信息
 * @param {ResCompanyProductInfoDetailModel[]} productArgs 产品参数指标
 */
export interface ResCompanyProductInfoModel {
  productId?: number
  productName: string
  listingDateYear?: number
  listingDateMonth?: number
  productVideo: string
  productCover: string
  summary: string
  classify: { [index: string]: any }
  statisticsModel: ResReputationStatisticsModel
  productArgs: ResCompanyProductInfoDetailModel[]
}






/**
 * 产品信息的bodyModel模型
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 * @param { { [index: string]: any } } classify  允许提交多个三级标签场景
 * @param {ResReputationStatisticsModel} statisticsModel 	口碑统计信息
 * @param {ResCompanyProductInfoDetailModel[]} productArgs 产品参数指标
 */
export interface ResCompanyProductInfoModelListReturnModel extends bodyModel<ResCompanyProductInfoModel[]> {

}

/**
 * 所有产品分类的bodyModel模型
 * @param {number} 分类id
 * @param {string} 分类名称
 */
export interface ResproductTypeListModel extends bodyModel<productTypeListModel[]> {

}
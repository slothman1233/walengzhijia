import { NewsContentTypeEnums, newsTypeEnums, priceShowStatusEnums } from '../../enums/enums'
import { PageModel } from '../pageModel'
import { ResReputationModel, ResReputationStatisticsModel } from '../reputation/resreputation'
import { bodyModel } from '../resModel'


/**
 * 返回新闻模型内容
 * @param {number} newsId 新闻标识ID
 * @param {number} createUser 创建者
 * @param {string} userName 用户名
 * @param {string} userIcon 用户头像
 * @param {number} reputationId 口碑ID
 * @param {number} companyId 公司ID
 * @param {string} companyName 公司名称
 * @param {string} companyIcon 公司的log标识
 * @param {number} productId 对应产品的ID
 * @param {string} productName 产品名称
 * @param {newsTypeEnums[]} newsType 新闻类型
 * @param {string} newsTitle 标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTime 新闻时间
 * @param {number} praiseCount 点赞数
 * @param {NewsContentTypeEnums} newsContentType 文章内容类型
 */
export interface ResNewsModel {
  newsId?: number
  createUser?: number
  userName: string
  userIcon: string
  reputationId?: number
  companyId?: number
  companyName: string
  companyIcon: string
  productId?: number
  productName: string
  newsType: newsTypeEnums[]
  newsTitle: string
  source: string
  newsContent: string
  newsIcon: string
  newsTime: string
  praiseCount: number
  newsContentType: NewsContentTypeEnums
}

/**
 * 返回新闻模型内容返回的bodyModel模型
 * @param {number} newsId 新闻标识ID
 * @param {number} createUser 创建者
 * @param {number} companyId 公司ID
 * @param {string} companyName 公司名称
 * @param {string} companyIcon 公司的log标识
 * @param {number} productId 对应产品的ID
 * @param {string} productName 产品名称
 * @param {number} newsType 新闻类型
 * @param {string} newsTitle 标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTime 新闻时间
 */
export interface ResNewsModelListReturnModel extends bodyModel<ResNewsModel[]> {

}

/**
 * 根据公司ID获得新闻资讯信息 分页模型
 * @param {number} newsId 新闻标识ID
 * @param {number} createUser 创建者
 * @param {number} companyId 公司ID
 * @param {string} companyName 公司名称
 * @param {string} companyIcon 公司的log标识
 * @param {number} productId 对应产品的ID
 * @param {string} productName 产品名称
 * @param {number} newsType 新闻类型
 * @param {string} newsTitle 标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTime 新闻时间
 */
export interface ResNewsModelPagedModelReturnModel extends bodyModel<ResNewsModelPagedModel> {

}
/**
 * 根据公司ID获得新闻资讯信息 分页模型
 * @param {number} newsId 新闻标识ID
 * @param {number} createUser 创建者
 * @param {number} companyId 公司ID
 * @param {string} companyName 公司名称
 * @param {string} companyIcon 公司的log标识
 * @param {number} productId 对应产品的ID
 * @param {string} productName 产品名称
 * @param {number} newsType 新闻类型
 * @param {string} newsTitle 标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTime 新闻时间
 */
export interface ResNewsModelPagedModel extends PageModel<ResNewsModel> {

}

/**
 * 关联产品信息
 * @param {number} companyId 公司ID
 * @param {string} companyName 公司名称
 * @param {string} companyIcon 公司的log标识
 * @param {number} productId 对应产品的ID
 * @param {string} productName 产品名称
 * @param {string} producerCover 产品封面图
 */
export interface ResNewsProductModel {
  companyId: number
  companyName: string
  companyIcon: string
  productId: number
  productName: string
  producerCover: string
}

/**
 * 热门新闻
 * @param {number} newsId 新闻ID
 * @param {string} newsTitle 新闻标题
 * 
 */
export interface ResNewsHotModel {
  newsId: number
  newsTitle: string
}


/**
 * 新闻详情页
 * @param {ResNewsModel} newsDetail 新闻模型
 * @param {ResNewsProductModel} product 关联产品信息
 * @param {ResNewsHotModel[]} hotNews 热门新闻
 * @param {ResReputationModel[]} hotReputations 热门的口碑新闻
 */
export interface ResNewsDetailModel {
  newsDetail: ResNewsModel
  product: ResNewsProductModel
  hotNews: ResNewsHotModel[]
  hotReputations: ResReputationModel[]
}





/**
 * 新闻详情页的bodyModel返回
 * @param {ResNewsModel} newsDetail 新闻模型
 * @param {ResNewsProductModel} product 关联产品信息
 * @param {ResNewsHotModel[]} hotNews 热门新闻
 */
export interface ResNewsDetailModelReturnModel extends bodyModel<ResNewsDetailModel> {

}


/**
 * 口碑新闻类型内容
 * @param {string} buyTime 购买时间
 * @param {string} useTime 使用时间
 * @param {number} PurchasePrice 购买价格
 * @param {priceShowStatusEnums} priceShowStatus 价格显示状态-显示价格，显示数字第一位有小数点，不现实价格
 * @param {ResReputationStatisticsModel} statisticsModel 口碑统计信息
 */
export interface ResNewsReputationModel extends ResNewsModel {
  buyTime: string
  useTime: string
  PurchasePrice: number
  PriceShowStatus: priceShowStatusEnums
  statisticsModel: ResReputationStatisticsModel
}
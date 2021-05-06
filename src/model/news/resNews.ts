import { NewsContentTypeEnums } from '../../enums/enums'
import { bodyModel } from '../resModel'


/**
 * 返回新闻模型内容
 * @param {number} newsId 新闻标识ID
 * @param {number} createUser 创建者
 * @param {string} userIcon 用户头像
 * @param {number} companyId 公司ID
 * @param {string} companyName 公司名称
 * @param {string} companyIcon 公司的log标识
 * @param {number} productId 对应产品的ID
 * @param {string} productName 产品名称
 * @param {string[]} newsType 新闻类型
 * @param {string} newsTitle 标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTime 新闻时间
 * @param {NewsContentTypeEnums} NewsContentType 文章内容类型
 */
export interface ResNewsModel {
  newsId?: number
  createUser?: number
  userIcon:string
  companyId?: number
  companyName: string
  companyIcon: string
  productId?: number
  productName: string
  newsType: string[]
  newsTitle: string
  source: string
  newsContent: string
  newsIcon: string
  newsTime: string
  NewsContentType: NewsContentTypeEnums
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
 */
export interface ResNewsDetailModel {
  newsDetail: ResNewsModel
  product: ResNewsProductModel
  hotNews: ResNewsHotModel[]
}

/**
 * 新闻详情页的bodyModel返回
 * @param {ResNewsModel} newsDetail 新闻模型
 * @param {ResNewsProductModel} product 关联产品信息
 * @param {ResNewsHotModel[]} hotNews 热门新闻
 */
export interface ResNewsDetailModelReturnModel extends bodyModel<ResNewsDetailModel> {

}
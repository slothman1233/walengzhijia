import { bodyModel } from '../resModel'


/**
 * 返回新闻模型内容
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
export interface ResNewsModel {
  newsId?: number
  createUser?: number
  companyId?: number
  companyName: string
  companyIcon: string
  productId?: number
  productName: string
  newsType: number
  newsTitle: string
  source: string
  newsContent: string
  newsIcon: string
  newsTime: string
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
export interface ResNewsModelListReturnModel extends bodyModel<ResNewsModel[]>{
  
}
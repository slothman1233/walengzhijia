import { QueryResultType, searchqueryType } from '../../enums/enums'
import { ResCompanyHotModel } from '../company/resCompany'
import { bodyModel } from '../resModel'

/**
 * 客户端提交查询模型
 * @param {string} searchContent 搜索内容
 * @param {number} companyTimeTicks 下拉查询分页时间戳-公司的时间戳
 * @param {number} newsTimeTicks 下拉查询分页时间戳-新闻内容的时间戳
 * @param {searchqueryType} queryType 查询类型 1=综合 2=品牌商
 */
export type SearchModel = {
  searchContent: string
  companyTimeTicks: number
  newsTimeTicks: number
  queryType: searchqueryType
}


export interface QueryModelListReturnModel extends bodyModel<QueryModel> {

}

/**
 * @param {QueryResultType} queryResultType 查询结果类型：1=品牌商 2=新闻资讯
 */
export interface QueryModel {
  queryResultType: searchqueryType
}

/**
 * 查询公司模型
 * @param {ResCompanyHotModel} company 企业信息
 * @param {string[]} productTypes 公司的产品覆盖的产品二级分类有那些
 * @param {number} totalReputationCount 总口碑数
 * @param {number} favorableRate 好评率
 * @param {number} highReputationCount 优质口碑数
 * @param {number} reputationScore 整体口碑得分
 */
export interface QueryCompanyModel extends QueryModel {
  company: ResCompanyHotModel
  productTypes: string[]
  totalReputationCount: number
  favorableRate: number
  highReputationCount: number
  reputationScore: number
}

/**
 * 查询新闻模型
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTitle 标题
 * @param {string} newsTime 新闻时间
 * @param {number} newsContentType 文章内容属性
 * @param {number} praiseCount 点赞数
 * @param {boolean} isTop 是否置顶
 * @param {number} topWeight 置顶权重
 * @param {string} userName 用户名
 * @param {string} companyIcon 品牌商logo
 * @param {string} companyName 品牌商名字
 * @param {number} newsId 新闻id
 * @param {number} reputationId
 */
export interface QueryNewsModel extends QueryModel {
  source: string
  newsContent: string
  newsIcon: string
  newsTitle: string
  newsTime: string
  newsContentType: number
  praiseCount: number
  isTop: boolean
  topWeight: number
  userName: string
  companyIcon: string
  companyName: string
  newsId: number
  reputationId: number
}

/**
 * 查询公司模型
 * @param {ResCompanyHotModel} company 企业信息
 * @param {string[]} productTypes 公司的产品覆盖的产品二级分类有那些
 * @param {number} totalReputationCount 总口碑数
 * @param {number} favorableRate 好评率
 * @param {number} highReputationCount 优质口碑数
 * @param {number} reputationScore 整体口碑得分
 */
export interface ResQueryCompanyModel extends bodyModel<QueryCompanyModel[]> {

}

/**
 * 查询新闻模型
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {string} newsTime 新闻时间
 * @param {number} newsContentType 文章内容属性
 * @param {number} praiseCount 点赞数
 * @param {boolean} isTop 是否置顶
 * @param {number} topWeight 置顶权重
 */
export interface ResQueryNewsModel extends bodyModel<QueryNewsModel[]> {

}
import { QueryResultType } from '../../enums/enums'
import { ResCompanyHotModel } from '../company/resCompany'
import { bodyModel } from '../resModel'

/**
 * 客户端提交查询模型
 * @param {string} searchContent 搜索内容
 * @param {number} timeTicks 下拉查询分页时间戳
 */
export type SearchModel = {
  searchContent: string
  timeTicks: number
}


export interface QueryModelListReturnModel extends bodyModel<QueryModel> {

}

/**
 * @param {QueryResultType} queryResultType 查询结果类型：1=品牌商 2=新闻资讯
 */
export interface QueryModel {
  queryResultType: QueryResultType
}

/**
 * 查询公司模型
 * @param {ResCompanyHotModel} Company 企业信息
 * @param {string[]} ProductTypes 公司的产品覆盖的产品二级分类有那些
 * @param {number} TotalReputationCount 总口碑数
 * @param {number} FavorableRate 好评率
 * @param {number} HighReputationCount 优质口碑数
 * @param {number} ReputationScore 整体口碑得分
 */
export interface QueryCompanyModel extends QueryModel {
  Company: ResCompanyHotModel
  ProductTypes: string[]
  TotalReputationCount: number
  FavorableRate: number
  HighReputationCount: number
  ReputationScore: number
}

/**
 * 查询新闻模型
 * @param {string} Source 来源
 * @param {string} NewsContent 新闻内容
 * @param {string} NewsIcon 新闻封面图
 * @param {string} NewsTime 新闻时间
 * @param {number} NewsContentType 文章内容属性
 * @param {number} PraiseCount 点赞数
 * @param {boolean} IsTop 是否置顶
 * @param {number} TopWeight 置顶权重
 */
export interface QueryNewsModel extends QueryModel {
  Source: string
  NewsContent: string
  NewsIcon: string
  NewsTime: string
  NewsContentType: number
  PraiseCount: number
  IsTop: boolean
  TopWeight: number
}

/**
 * 查询公司模型
 * @param {ResCompanyHotModel} Company 企业信息
 * @param {string[]} ProductTypes 公司的产品覆盖的产品二级分类有那些
 * @param {number} TotalReputationCount 总口碑数
 * @param {number} FavorableRate 好评率
 * @param {number} HighReputationCount 优质口碑数
 * @param {number} ReputationScore 整体口碑得分
 */
export interface ResQueryCompanyModel extends bodyModel<QueryCompanyModel> {

}

/**
 * 查询新闻模型
 * @param {string} Source 来源
 * @param {string} NewsContent 新闻内容
 * @param {string} NewsIcon 新闻封面图
 * @param {string} NewsTime 新闻时间
 * @param {number} NewsContentType 文章内容属性
 * @param {number} PraiseCount 点赞数
 * @param {boolean} IsTop 是否置顶
 * @param {number} TopWeight 置顶权重
 */
export interface ResQueryNewsModel extends bodyModel<QueryNewsModel>{

}
import { NewsContentTypeEnums } from '../../enums/enums'



/**
 * 新闻模型
 * @param {number} newsId 修改新闻快讯，移除新闻快讯使用
 * @param {number} companyId 公司ID
 * @param {number} productId 对应产品的ID
 * @param {string[]} newsType 新闻类型
 * @param {string} newsTitle 新闻标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {number} createUser 新闻创建者
 * @param {NewsContentTypeEnums} newsContentType 文章内容类型
 */
export interface NewsInfoModel {
  newsId?: number
  companyId?: number
  productId?: number
  newsType?: string[]
  newsTitle: string
  source: string
  newsContent: string
  newsIcon: string
  createUser?: number
  newsContentType?: NewsContentTypeEnums
}


/**
 * 新闻置顶功能
 * @param {number} newsId 新闻ID
 * @param {boolean} isTop 是否置顶
 * @param {number} topWeight 置顶权重
 * @param {number} createUser 操作用户
 */
export interface NewsTopModel {
  newsId: number
  isTop?: boolean
  topWeight?: number
  createUser?: number
}
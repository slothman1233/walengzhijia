


/**
 * 新闻模型
 * @param {number} newsId 修改新闻快讯，移除新闻快讯使用
 * @param {number} companyId 公司ID
 * @param {number} productId 对应产品的ID
 * @param {number} newsType 新闻类型
 * @param {string} newsTitle 新闻标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {number} createUser 新闻创建者
 */
export interface NewsInfoModel {
  newsId?: number
  companyId?: number
  productId?: number
  newsType?: number
  newsTitle: string
  source: string
  newsContent: string
  newsIcon: string
  createUser?: number
}
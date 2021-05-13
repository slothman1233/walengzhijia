import { NewsContentTypeEnums, priceShowStatusEnums } from '../../enums/enums'

/**
 * 口碑模型
 * @param {string} title 标题
 * @param {number} companyId 公司标识ID
 * @param {number} productId 产品标识ID
 * @param {string} buyTime 购买时间
 * @param {string} useTime 使用时间
 * @param {number} purchasePrice 购买价格
 * @param {priceShowStatusEnums} priceShowStatus 价格显示状态 - 显示价格，显示数字第一位有小数点，不现实价格
 * @param {string} summary 口碑描述
 * @param {string} reputationIcon 口碑封面图
 * @param {number} createUser 创建用户
 * @param {ReputationScoreModel[]} reputationScores 口碑评分模型
 * @param {NewsContentTypeEnums} newsContentType 新闻内容类型
 */
export interface ReputationModel {
  title: string
  companyId?: number
  productId?: number
  buyTime?: string
  useTime?: string
  purchasePrice?: number
  priceShowStatus?: priceShowStatusEnums
  summary: string
  reputationIcon: string
  createUser: number
  reputationScores: ReputationScoreModel[]
  newsContentType: NewsContentTypeEnums
}

/**
 * 口碑评分模型
 * @param {number} reputationId 口碑标识ID
 * @param {number} reputationTypeId 口碑评分项标识ID
 * @param {number} score 口碑评分
 */
export interface ReputationScoreModel {
  reputationId?: number
  reputationTypeId?: number
  score?: number
}

/**
 * 所有产品分类
 * @param {number} productTypeId 分类id
 * @param {string} productTypeName 分类名称
 */
export interface productTypeListModel {
  productTypeId: number,
  productTypeName: string
}
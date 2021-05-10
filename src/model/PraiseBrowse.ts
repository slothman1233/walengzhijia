import { PraiseBrowsePraiseTypeEnum } from '../enums/enums'


/**
 * 点赞模型
 * @param {number} targetId 对应点赞目标的标识ID    注意：口碑新闻传口碑id
 * @param {PraiseBrowsePraiseType} praiseType 点赞类型  1 新闻  2口碑包含口碑新闻  3 评论 4评论回复
 * @param {number} praiseUser 点赞用户，为0为匿名
 */
export interface PraiseModel {
  targetId?: number
  praiseType?: PraiseBrowsePraiseTypeEnum
  praiseUser?: number
}


/**
 * 浏览模型
 * @param {number} targetId 对应浏览目标的标识ID
 * @param {number} browseType 浏览类型
 * @param {number} browseUser 浏览用户，为0为匿名
 */
export interface BrowseModel {
  targetId?: number
  browseType?: number
  browseUser?: number
}
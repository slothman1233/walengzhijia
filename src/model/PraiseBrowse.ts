

/**
 * 点赞模型
 * @param {number} praiseId 取消点赞时使用
 * @param {number} targetId 对应点赞目标的标识ID
 * @param {number} praiseType 点赞类型
 * @param {number} praiseUser 点赞用户，为0为匿名
 */
export interface PraiseModel {
  praiseId?: number
  targetId?: number
  praiseType?: number
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
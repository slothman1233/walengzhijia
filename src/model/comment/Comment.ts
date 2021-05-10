
/**
 * 评论模型
 * @param {number} commitId 评论ID
 * @param {number} commentUser 评论用户
 * @param {number} commentTargetId 评论的目标标识ID （新闻，产品，其它）
 * @param {number} commentTargetType 评论目标的标识类型
 * @param {string} commentContent 评论内容
 */
export interface CommentModel {
  commitId?: number
  commentUser?: number
  commentTargetId: number
  commentTargetType?: number
  commentContent: string
}

/**
 * 评论回复模型
 * @param {number} commitId 评论ID
 * @param {number} commentUser 回复评论用户
 * @param {number} commentReplyId 评论回复ID----评论下面回复的回复使用
 * @param {number} commentReplyUser 评论回复的目标用户 @功能
 * @param {string} commentReplyContent 评论回复内容
 */
export interface CommentReplyModel {
  commentId?: number
  commentReplyId?: number
  commentUser?: number
  commentReplyUser?: number
  commentReplyContent: string
}

/**
 * 评论列表查询模型
 * @param {number} targetId 评论对象的唯一标识
 * @param {number} targetType 评论对象分类
 * @param {number} timeTicks 查询值
 */
export interface CommentQueryModel {
  targetId?: number
  targetType?: number
  timeTicks?: number
}
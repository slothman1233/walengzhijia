import { CommentTargetTypeEnum } from '../../enums/enums'

/**
 * 评论模型
 * @param {number} commitId 评论ID
 * @param {number} commentUser 评论用户
 * @param {number} commentTargetId 评论的目标标识ID （新闻，产品，其它）
 * @param {CommentTargetTypeEnum} commentTargetType 评论目标的标识类型
 * @param {string} commentContent 评论内容
 */
export interface CommentModel {
  commitId?: number
  commentUser?: number
  commentTargetId: number
  commentTargetType?: CommentTargetTypeEnum
  commentContent: string
}

/**
 * 评论回复模型
 * @param {number} commentId 评论ID  主评论id
 * @param {number} commentUser 回复评论用户  二级评论的id 
 * @param {number} commentReplyId 评论回复ID----评论下面回复的回复使用  当前发送评论的用户id
 * @param {number} commentReplyUser 评论回复的目标用户 @功能  二级评论的用户id
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
 * @param {CommentTargetTypeEnum} targetType 评论对象分类
 * @param {number} timeTicks 查询值
 */
export interface CommentQueryModel {
  targetId?: number
  targetType?: CommentTargetTypeEnum
  timeTicks?: number
}
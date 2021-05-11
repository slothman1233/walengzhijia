import { bodyModel } from '../resModel'



/**
 * 评论回复的bodyModel模型
 * @param {number} replyId 回复唯一ID
 * @param {number} replyUser 评论回复的回复用户ID
 * @param {string} commentReplyContent 评论内容
 * @param {string} replyTime 回复时间
 * @param {number} replyParentId 回复评论的回复ID
 * @param {number} commentId 评论ID
 * @param {number} commentUser 评论用户ID
 * @param {string} commentUserIcon 评论用户头像
 * @param {string} commentUserName 评论用户昵称
 * @param {number} praiseCount 评论回复点赞数
 */
export interface ResCommentReplyModelListReturnModel extends bodyModel<ResCommentReplyModel[]> {

}

/**
 * 评论回复模型
 * @param {number} replyId 回复唯一ID
 * @param {number} replyUser 评论回复的回复用户ID
 * @param {string} commentReplyContent 评论内容
 * @param {string} replyTime 回复时间
 * @param {number} replyParentId 回复评论的回复ID
 * @param {number} commentId 评论ID
 * @param {number} commentUser 评论用户ID
 * @param {string} commentUserIcon 评论用户头像
 * @param {string} commentUserName 评论用户昵称
 * @param {number} praiseCount 评论回复点赞数
 * @param {ResCommentReplyModel} at at的资料 渲染需要
 * @param {string} commentContent 渲染模板需要
 */
export interface ResCommentReplyModel {
  replyId?: number
  replyUser?: number
  commentReplyContent: string
  replyTime?: string
  replyParentId?: number
  commentId?: number
  commentUser?: number
  commentUserIcon: string
  commentUserName: string
  praiseCount?: number
  at?: ResCommentReplyModel
  commentContent?:string
}

/**
 * 评论的bodyModel模型
 * @param {number} targetId 评论的目标标识ID
 * @param {number} targetType 评论目标的类型（新闻，产品，公司等等）
 * @param {number} commentId 评论唯一ID，点赞的时候需要将该评论ID传给后台用于计数
 * @param {number} commentUser 评论用户
 * @param {string} commentUserIcon 评论用户头像
 * @param {string} commentUserName 评论用户昵称
 * @param {string} commentContent 评论内容
 * @param {string} commentTime 评论时间
 * @param {ResCommentReplyModel[]} replys 评论回复
 * @param {number} praiseCount 评论点赞数
 */
export interface ResCommentModelListReturnModel extends bodyModel<ResCommentModel[]> {

}

/**
 * 评论模型
 * @param {number} targetId 评论的目标标识ID
 * @param {number} targetType 评论目标的类型（新闻，产品，公司等等）
 * @param {number} commentId 评论唯一ID，点赞的时候需要将该评论ID传给后台用于计数
 * @param {number} commentUser 评论用户ID
 * @param {string} commentUserIcon 评论用户头像
 * @param {string} commentUserName 评论用户昵称
 * @param {string} commentContent 评论内容
 * @param {string} commentTime 评论时间
 * @param {ResCommentReplyModel[]} replys 评论回复
 * @param {number} praiseCount 评论点赞数
 */
export interface ResCommentModel {
  targetId?: number
  targetType?: number
  commentId?: number
  commentUser?: number
  commentUserIcon: string
  commentUserName: string
  commentContent: string
  commentTime?: string
  replys: ResCommentReplyModel[]
  praiseCount?: number

}
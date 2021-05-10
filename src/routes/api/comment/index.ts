import { Context } from 'koa'
import { post, get } from '../../../common/decorator/httpMethod'
import { AddComment, AddCommentReply, GetCommentListRm, GetCommentReplyListRm } from '../../../controller/comment.controller'
import { CommentModel, CommentQueryModel, CommentReplyModel } from '../../../model/comment/Comment'
import { GetCommentReplyListModel } from '../../../services/comment.services'
export default class commentapi {
  /**
   * 添加评论
   * CommentModel
   */
  @post('/AddComment')
    async AddComment(ctx: Context) {
        let models = await AddComment((<CommentModel>ctx.request.body))
        ctx.body = models
    }

  /**
* 添加评论回复信息
* CommentReplyModel
*/
  @post('/AddCommentReply')
  async AddCommentReply(ctx: Context) {
      let models = await AddCommentReply((<CommentReplyModel>ctx.request.body))
      ctx.body = models
  }

  /**
  * 获得评论列表（最多10条，同时回复评论信息也做了限制只能10条，超过10条请调用回复评论接口）
  * CommentQueryModel
  */
  @post('/GetCommentList')
  async GetCommentListRm(ctx: Context) {
      let models = await GetCommentListRm((<CommentQueryModel>ctx.request.body))
      ctx.body = models
  }

  /**
  * 获取评论回复信息
  * GetCommentReplyListModel
  */
  @get('/GetCommentReplyList')
  async GetCommentReplyListRm(ctx: Context) {
      let models = await GetCommentReplyListRm((<GetCommentReplyListModel>ctx.query))
      ctx.body = models
  }
}
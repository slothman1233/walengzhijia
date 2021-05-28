
import { JSONParse } from '../common/utils/ModelHelper'
import { CommentModel, CommentQueryModel, CommentReplyModel } from '../model/comment/Comment'
import { ResCommentModel, ResCommentModelListReturnModel, ResCommentReplyModel, ResCommentReplyModelListReturnModel } from '../model/comment/resComment'
import { bodyModel } from '../model/resModel'
import comments, { GetCommentReplyListModel } from '../services/comment.services'



/**
* 添加评论
* CommentModel
*/
export async function AddComment(params: CommentModel): Promise<bodyModel<number>> {
    return await comments.AddComment(params).catch(data => data)
}
/**
* 添加评论回复信息
* CommentReplyModel
*/
export async function AddCommentReply(params: CommentReplyModel): Promise<bodyModel<number>> {
    return await comments.AddCommentReply(params).catch(data => data)
}




/**
 * 获得评论列表（最多10条，同时回复评论信息也做了限制只能10条，超过10条请调用回复评论接口）
 * CommentQueryModel
 */
export async function GetCommentList(params: CommentQueryModel): Promise<ResCommentModel[] | null> {
    let rm = await GetCommentListRm(params)
    let models = JSONParse<ResCommentModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 获得评论列表（最多10条，同时回复评论信息也做了限制只能10条，超过10条请调用回复评论接口）
* CommentQueryModel
*/
export async function GetCommentListRm(params: CommentQueryModel): Promise<ResCommentModelListReturnModel> {
    return await comments.GetCommentList(params).catch(data => data)
}




/**
 * 获取评论回复信息
 * GetCommentReplyListModel
 */
export async function GetCommentReplyList(params: GetCommentReplyListModel): Promise<ResCommentReplyModel[] | null> {
    let rm = await GetCommentReplyListRm(params)
    let models = JSONParse<ResCommentReplyModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 获取评论回复信息
* GetCommentReplyListModel
*/
export async function GetCommentReplyListRm(params: GetCommentReplyListModel): Promise<ResCommentReplyModelListReturnModel> {
    return await comments.GetCommentReplyList(params).catch(data => data)
}
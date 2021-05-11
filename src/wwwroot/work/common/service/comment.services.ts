

import http from './http'

import env from '../config/env'
import { LepackUserLoginModel } from '../../../../model/user/User'
import { bodyModel } from '../../../../model/resModel'
import { BycompanyId } from '../../../../services/Product.services'
import { ResproductTypeListModel } from '../../../../model/reputation/resreputation'
import { CommentModel, CommentQueryModel, CommentReplyModel } from '../../../../model/comment/Comment'
import { GetCommentReplyListModel } from '../../../../services/comment.services'
import { ResCommentModelListReturnModel, ResCommentReplyModelListReturnModel } from '../../../../model/comment/resComment'



/**
 * 添加评论
 * CommentModel
 */
export const AddComment = async (options: CommentModel): Promise<bodyModel<number>> => await http.post<any>(`/api/comment/AddComment`, options)


/**
 * 添加评论回复信息
 * CommentReplyModel
 */
export const AddCommentReply = async (options: CommentReplyModel): Promise<bodyModel<number>> => await http.post<any>(`/api/comment/AddCommentReply`, options)


/**
 * 获得评论列表（最多10条，同时回复评论信息也做了限制只能10条，超过10条请调用回复评论接口）
 * CommentQueryModel
 */
export const GetCommentList = async (options: CommentQueryModel): Promise<ResCommentModelListReturnModel> => await http.post<any>(`/api/comment/GetCommentList`, options)


/**
 * 获取评论回复信息
 * GetCommentReplyListModel
 */
export const GetCommentReplyList = async (params: GetCommentReplyListModel): Promise<ResCommentReplyModelListReturnModel> => await http.get<any>(`/api/comment/GetCommentReplyList`, { params })


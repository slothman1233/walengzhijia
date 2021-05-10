import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ResCompanyHotModelListReturnModel, ResCompanyInfoModelReturnModel } from '../model/company/resCompany'
import { bodyModel } from '../model/resModel'
import { CompanyProductInfoModel } from '../model/company/Company'
import { ResAreaInfoModelListReturnModel, ResAreaInfoStructModel } from '../model/arerinfo/resAreInfo'
import { ResCommentModel, ResCommentReplyModel } from '../model/comment/resComment'
import { CommentModel, CommentQueryModel, CommentReplyModel } from '../model/comment/Comment'



export type GetCommentReplyListModel = {
  commentId: number
  timeticks: number
}

class comment {
    // 添加评论
    // CommentModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async AddComment(params: CommentModel) {
        return await http.post<boolean>(`${config.apiPath}api/Comment/AddComment`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加评论回复信息
    // CommentReplyModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async AddCommentReply(params: CommentReplyModel) {
        return await http.post<boolean>(`${config.apiPath}api/Comment/AddCommentReply`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 获得评论列表（最多10条，同时回复评论信息也做了限制只能10条，超过10条请调用回复评论接口）
    // CommentQueryModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetCommentList(params: CommentQueryModel) {
        return await http.post<ResCommentModel[]>(`${config.apiPath}api/Comment/GetCommentList`, params, { headers: { 'Content-Type': 'application/json' } })
    }


    // 获取评论回复信息
    // GetCommentReplyListModel
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetCommentReplyList(params: GetCommentReplyListModel) {
        return await http.get<ResCommentReplyModel[]>(`${config.apiPath}api/Comment/GetCommentReplyList`, { params, headers: { 'Content-Type': 'application/json' } })
    }
}


let comments = new comment()

export default comments

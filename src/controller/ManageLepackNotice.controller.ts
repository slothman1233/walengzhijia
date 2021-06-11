
import { JSONParse } from '../common/utils/ModelHelper'
import { NewsTopModel } from '../model/news/news'
import { ResNewsModel, ResNewsModelListReturnModel, ResNewsModelPagedModel, ResNewsModelPagedModelReturnModel } from '../model/news/resNews'
import { ResNoticeModelPagedModel, ResNoticeModelPagedModelReturnModel } from '../model/notice/resNotice'
import { bodyModel } from '../model/resModel'
import ManageLepackNotices, { GetNoticeByUidModel } from '../services/ManageLepackNotice.services'

/**
* 根据用户ID查找通知信息结果
* @param {number} userId 用户id
* @param {number} pageIndex 
* @param {number} pageSize 页码
* @param {NotificationTypeDefine} notification 通知类型
*/
export async function GetNoticeByUid(params: GetNoticeByUidModel): Promise<ResNoticeModelPagedModel | null> {
    let rm = await GetNoticeByUidRm(params)
    let models = JSONParse<ResNoticeModelPagedModel | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 根据用户ID查找通知信息结果
* @param {number} userId 用户id
* @param {number} pageIndex 
* @param {number} pageSize 页码
* @param {NotificationTypeDefine} notification 通知类型
*/
export async function GetNoticeByUidRm(params: GetNoticeByUidModel): Promise<ResNoticeModelPagedModelReturnModel> {
    return await ManageLepackNotices.GetNoticeByUid(params).catch(data => data)
}







import { JSONParse, JSONParseBool } from '../common/utils/ModelHelper'
import { NewsTopModel } from '../model/news/news'
import { ResNewsModel, ResNewsModelListReturnModel, ResNewsModelPagedModel, ResNewsModelPagedModelReturnModel } from '../model/news/resNews'
import { NoticeReadModel } from '../model/notice/notice'
import { ResNoticeModelPagedModel, ResNoticeModelPagedModelReturnModel } from '../model/notice/resNotice'
import { bodyModel } from '../model/resModel'
import ManageLepackNotices, { GetNoticeByUidModel, HasNotReadNoticeByPlatModel, HasNotReadNoticeModel } from '../services/ManageLepackNotice.services'

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

/**
* 用户是否存在未读通知
* @param {number} userId 用户id
*/
export async function HasNotReadNotice(params: HasNotReadNoticeModel): Promise<boolean | null> {
    let rm = await HasNotReadNoticeRm(params)
    let models = JSONParseBool<boolean | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 用户是否存在未读通知
* @param {number} userId 用户id
*/
export async function HasNotReadNoticeRm(params: HasNotReadNoticeModel): Promise<bodyModel<boolean>> {
    return await ManageLepackNotices.HasNotReadNotice(params).catch(data => data)
}



/**
 * 通知只读设置处理
 * @param {number} receiverUser 接收用户
 * @param {NoticeReadDetailModel[]} noticeIds 批量设置已读的通知ID
 */
export async function SetNoticeIsRead(params: NoticeReadModel): Promise<boolean | null> {
    let rm = await SetNoticeIsReadRm(params)
    let models = JSONParseBool<boolean | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
 * 通知只读设置处理
 * @param {number} receiverUser 接收用户
 * @param {NoticeReadDetailModel[]} noticeIds 批量设置已读的通知ID
 */
export async function SetNoticeIsReadRm(params: NoticeReadModel): Promise<bodyModel<boolean>> {
    return await ManageLepackNotices.SetNoticeIsRead(params).catch(data => data)
}



/**
 * 根据板块查找用户未读状态信息
 * @param {number} userId 接收用户
 * @param {NotificationQueryTypeDefine} notificationQueryType 查找通知类型
 */
export async function HasNotReadNoticeByPlat(params: HasNotReadNoticeByPlatModel): Promise<boolean | null> {
    let rm = await HasNotReadNoticeByPlatRm(params)
    console.log(rm)
    let models = JSONParseBool<boolean | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
 * 根据板块查找用户未读状态信息
 * @param {number} userId 接收用户
 * @param {NotificationQueryTypeDefine} notificationQueryType 查找通知类型
 */
export async function HasNotReadNoticeByPlatRm(params: HasNotReadNoticeByPlatModel): Promise<bodyModel<boolean>> {
    return await ManageLepackNotices.HasNotReadNoticeByPlat(params).catch(data => data)
}


/**
 * 根据板块设置用户全部已读操作
 * @param {number} userId 接收用户
 * @param {NotificationQueryTypeDefine} notificationQueryType 查找通知类型
 */
export async function SetNoticeIsReadByPlat(params: HasNotReadNoticeByPlatModel): Promise<boolean | null> {
    let rm = await SetNoticeIsReadByPlatRm(params)
    let models = JSONParseBool<boolean | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
 * 根据板块设置用户全部已读操作
 * @param {number} userId 接收用户
 * @param {NotificationQueryTypeDefine} notificationQueryType 查找通知类型
 */
export async function SetNoticeIsReadByPlatRm(params: HasNotReadNoticeByPlatModel): Promise<bodyModel<boolean>> {
    return await ManageLepackNotices.SetNoticeIsReadByPlat(params).catch(data => data)
}



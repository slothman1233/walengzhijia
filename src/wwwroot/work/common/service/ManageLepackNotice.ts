

import http from './http'

import type { GetNoticeByUidModel, HasNotReadNoticeModel } from '../../../../services/ManageLepackNotice.services'
import type { ResNoticeModelPagedModelReturnModel } from '../../../../model/notice/resNotice'
import type { NoticeReadModel } from '../../../../model/notice/notice'
import type { bodyModel } from '../../../../model/resModel'



/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} companyId 公司id
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} pageIndex 页码
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export const GetNoticeByUid = async (params: GetNoticeByUidModel): Promise<ResNoticeModelPagedModelReturnModel> => await http.get<any>(`/api/ManageLepackNotice/GetNoticeByUid`, { params })


/**
 * 用户是否存在未读通知
 * @param {number} companyId 公司id
 */
export const HasNotReadNotice = async (params: HasNotReadNoticeModel): Promise<ResNoticeModelPagedModelReturnModel> => await http.get<any>(`/api/ManageLepackNotice/HasNotReadNotice`, { params })

/**
 * 通知只读设置处理
 * @param {number} receiverUser 接收用户
 * @param {NoticeReadDetailModel[]} noticeIds 批量设置已读的通知ID
 */
export const SetNoticeIsRead = async (options: NoticeReadModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackNotice/SetNoticeIsRead`, options)



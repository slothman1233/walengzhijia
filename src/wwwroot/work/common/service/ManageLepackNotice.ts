

import http from './http'

import { GetNoticeByUidModel } from '../../../../services/ManageLepackNotice.services'
import { ResNoticeModelPagedModel, ResNoticeModelPagedModelReturnModel } from '../../../../model/notice/resNotice'



/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} companyId 公司id
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} pageIndex 页码
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export const GetNoticeByUid = async (params: GetNoticeByUidModel): Promise<ResNoticeModelPagedModelReturnModel> => await http.get<any>(`/api/ManageLepackNotice/GetNoticeByUid`, { params })

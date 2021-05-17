

import http from './http'

import env from '../config/env'
import { bodyModel } from '../../../../model/resModel'
import { NewsInfoModel } from '../../../../model/news/news'
import { ResNewsDetailModelReturnModel, ResNewsModel, ResNewsModelPagedModelReturnModel } from '../../../../model/news/resNews'
import { GetNewsByNewsIdModel } from '../../../../services/ManageLepackNews.services'



/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} companyId 公司id
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} pageIndex 页码
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export const GetNewsPagesByCompanyId = async (params: GetNewsByNewsIdModel): Promise<ResNewsModelPagedModelReturnModel> => await http.get<any>(`/api/ManageLepackNews/GetNewsPagesByCompanyId`, { params })


import http from './http'

import env from '../config/env'
import { bodyModel } from '../../../../model/resModel'
import { NewsInfoModel } from '../../../../model/news/news'
import { ResNewsDetailModelReturnModel, ResNewsModel } from '../../../../model/news/resNews'



/**
 * 添加新闻
 * NewsInfoModel
 */
export const AddNews = async (options: NewsInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/news/AddNews`, options)

/**
 * 修改新闻
 * NewsInfoModel
 */
export const UpdateNews = async (options: NewsInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/news/UpdateNews`, options)



/**
 * 删除新闻
 * NewsInfoModel
 */
export const delNews = async (options: NewsInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/news/DelNews`, options)


/**
 * 获得新闻内容，通过列表集合返回
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export const GetNewsList = async (newsType: number = 0, timetick: number = 0): Promise<bodyModel<ResNewsModel[]>> => await http.get<any>(`/api/news/GetNewsList`, { params: { newsType, timetick } })


/**
 * 通过公司ID获取具体的新闻内容
 * @param {number} companyId 公司id
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export const GetNewsByCompanyId = async (companyId: number = 0, newsType: number = 0, timetick: number = 0, isReputation?: boolean): Promise<bodyModel<ResNewsModel[]>> => await http.get<any>(`/api/news/GetNewsByCompanyId`, { params: { companyId, timetick, newsType, isReputation } })


/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} productId 产品id
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export const GetNewsByProductId = async (productId: number = 0, newsType: number = 0, timetick: number = 0, isReputation?: boolean): Promise<bodyModel<ResNewsModel[]>> => await http.get<any>(`/api/news/GetNewsByProductId`, { params: { productId, timetick, newsType, isReputation } })

/**
 * 通过新闻ID获取具体新闻信息
 * @param {number} newsId 新闻id

 */
export const GetNewsById = async (newsId: number = 0): Promise<ResNewsDetailModelReturnModel> => await http.get<any>(`/api/news/GetNewsById`, { params: { newsId } })



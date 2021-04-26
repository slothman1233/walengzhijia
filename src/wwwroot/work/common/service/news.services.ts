

import http from './http'

import env from '../config/env'
import { bodyModel } from '../../../../model/resModel'
import { NewsInfoModel } from '../../../../model/news/news'



/**
 * 添加新闻
 * NewsInfoModel
 */
export const AddNews = async (options: NewsInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/news/AddNews`, options)


/**
 * 删除新闻
 * NewsInfoModel
 */
export const delNews = async (options: NewsInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/news/DelNews`, options)

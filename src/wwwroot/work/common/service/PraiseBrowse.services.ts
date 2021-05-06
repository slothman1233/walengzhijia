
import http from './http'
import { BrowseModel, PraiseModel } from '../../../../model/PraiseBrowse'
import { bodyModel } from '../../../../model/resModel'

/**
 * 添加点赞
 * @param {PraiseModel} options 点赞模型
 */
export const AddPraise = async (options: PraiseModel): Promise<bodyModel<boolean>> => await http.post<any>(`/api/PraiseBrowse/AddPraise`, options)

/**
 * 删除点赞
 * @param {PraiseModel} options 点赞模型
 */
export const DeletePraise = async (options: PraiseModel): Promise<bodyModel<boolean>> => await http.post<any>(`/api/PraiseBrowse/DeletePraise`, options)


/**
 * 查询点赞
 * @param {PraiseModel} options 点赞模型
 */
export const GetIsPraise = async (options: PraiseModel): Promise<bodyModel<boolean>> => await http.post<any>(`/api/PraiseBrowse/GetIsPraise`, options)


/**
 * 添加浏览量
 * @param {BrowseModel} options 浏览模型
 */
export const AddBrowse = async (options: BrowseModel): Promise<bodyModel<boolean>> => await http.post<any>(`/api/PraiseBrowse/AddBrowse`, options)

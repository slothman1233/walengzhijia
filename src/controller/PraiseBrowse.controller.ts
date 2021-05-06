import { ResNewsModelListReturnModel } from '../model/news/resNews'
import { BrowseModel, PraiseModel } from '../model/PraiseBrowse'
import { bodyModel } from '../model/resModel'
import PraiseBrowses from '../services/common/PraiseBrowse.services'
import { GetNewsListModel } from '../services/News.services'

/**
 * 添加点赞
 * @param {PraiseModel} params 点赞模型
 */
export async function AddPraise(params: PraiseModel): Promise<bodyModel<boolean>> {
    return await PraiseBrowses.AddPraise(params).catch(data => data)
}

/**
 * 删除点赞
 * @param {PraiseModel} params 点赞模型
 */
export async function DeletePraise(params: PraiseModel): Promise<bodyModel<boolean>> {
    return await PraiseBrowses.DeletePraise(params).catch(data => data)
}

/**
 * 查询点赞
 * @param {PraiseModel} params 点赞模型
 */
export async function GetIsPraise(params: PraiseModel): Promise<bodyModel<boolean>> {
    return await PraiseBrowses.GetIsPraise(params).catch(data => data)
}

/**
 * 添加浏览量
 * @param {BrowseModel} params 浏览模型
 */
export async function AddBrowse(params: BrowseModel): Promise<bodyModel<boolean>> {
    return await PraiseBrowses.AddBrowse(params).catch(data => data)
}


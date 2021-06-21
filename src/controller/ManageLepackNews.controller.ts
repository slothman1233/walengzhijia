
import { JSONParse } from '../common/utils/ModelHelper'
import { NewsTopModel } from '../model/news/news'
import { ResNewsModel, ResNewsModelListReturnModel, ResNewsModelPagedModel, ResNewsModelPagedModelReturnModel } from '../model/news/resNews'
import { bodyModel } from '../model/resModel'
import ManageLepackNewss, { GetNewsByNewsIdModel } from '../services/ManageLepackNews.services'

/**
 * 根据公司ID获得新闻资讯信息
 * @param {number} companyId 公司id
 * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} pageIndex 页码
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export async function GetNewsPagesByCompanyId(params: GetNewsByNewsIdModel): Promise<ResNewsModelPagedModel | null> {
    let rm = await GetNewsPagesByCompanyIdRm(params)
    let models = JSONParse<ResNewsModelPagedModel | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据公司ID获得新闻资讯信息
 * @param {number} companyId 公司id
 * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} pageIndex 页码
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export async function GetNewsPagesByCompanyIdRm(params: GetNewsByNewsIdModel): Promise<ResNewsModelPagedModelReturnModel> {
    return await ManageLepackNewss.GetNewsPagesByCompanyId(params).catch(data => data)
}


/**
 * 新闻置顶操作
 * NewsTopModel
 */
export async function SetNewsTop(params: NewsTopModel): Promise<bodyModel<boolean>> {
    return await ManageLepackNewss.SetNewsTop(params).catch(data => data)
}

/**
 * 取消置顶操作
 * NewsTopModel
 */
export async function DelNewsTop(params: NewsTopModel): Promise<bodyModel<boolean>> {
    return await ManageLepackNewss.DelNewsTop(params).catch(data => data)
}





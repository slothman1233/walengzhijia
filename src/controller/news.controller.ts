
import { JSONParse } from '../common/utils/ModelHelper'
import { publishNewsTypeEnums } from '../enums/enums'
import { NewsInfoModel } from '../model/news/news'
import { ResNewsDetailModel, ResNewsDetailModelReturnModel, ResNewsModel, ResNewsModelListReturnModel } from '../model/news/resNews'
import { bodyModel } from '../model/resModel'
import news, { GetNewsByCompanyIdModel, GetNewsByIdModel, GetNewsByProductIdModel, GetNewsListModel } from '../services/News.services'

/**
 * 获得新闻内容，通过列表集合返回
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export async function GetNewsList(newsType: number = 0, timetick: number = 0): Promise<ResNewsModel[] | null> {
    let rm = await GetNewsListRm(newsType, timetick)
    let models = JSONParse<ResNewsModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 获得新闻内容，通过列表集合返回
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export async function GetNewsListRm(newsType: number = 0, timetick: number = 0): Promise<ResNewsModelListReturnModel> {
    let params: GetNewsListModel
    params = {
        newsType, timetick
    }
    return await news.GetNewsList(params).catch(data => data)
}


/**
 * 添加新闻
 * NewsInfoModel
 */
export async function PostAddNews(params: NewsInfoModel): Promise<bodyModel<string>> {
    return await news.AddNews(params).catch(data => data)
}

/**
 * 修改新闻
 * NewsInfoModel
 */
export async function PostUpdateNews(params: NewsInfoModel): Promise<bodyModel<string>> {
    return await news.UpdateNews(params).catch(data => data)
}
/**
 * 删除新闻
 * NewsInfoModel
 */
export async function PostDeleteNews(params: NewsInfoModel): Promise<bodyModel<string>> {
    return await news.DeleteNews(params).catch(data => data)
}

/**
     * 通过公司ID获取具体的新闻内容
     * @param {number} companyId 公司id
     * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
     */
export async function GetNewsByCompanyId(companyId: number = 0, newsType: publishNewsTypeEnums = publishNewsTypeEnums.new, timetick: number = 0, isReputation: boolean = true): Promise<ResNewsModel[] | null> {
    let rm = await GetNewsByCompanyIdRm(companyId, newsType, timetick, isReputation)
    let models = JSONParse<ResNewsModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
     * 通过公司ID获取具体的新闻内容
     * @param {number} companyId 公司id
     * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
     */
export async function GetNewsByCompanyIdRm(companyId: number = 0, newsType: publishNewsTypeEnums = publishNewsTypeEnums.new, timetick: number = 0, isReputation: boolean = true): Promise<ResNewsModelListReturnModel> {
    let params: GetNewsByCompanyIdModel
    params = {
        companyId, timetick, newsType, isReputation
    }
    return await news.GetNewsByCompanyId(params).catch(data => data)
}


/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} productId 产品id
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export async function GetNewsByProductId(productId: number = 0, newsType: publishNewsTypeEnums = publishNewsTypeEnums.new, timetick: number = 0, isReputation: boolean = true): Promise<ResNewsModel[] | null> {
    let rm = await GetNewsByProductIdRm(productId, newsType, timetick, isReputation)
    let models = JSONParse<ResNewsModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} productId 产品id
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export async function GetNewsByProductIdRm(productId: number = 0, newsType: publishNewsTypeEnums = publishNewsTypeEnums.new, timetick: number = 0, isReputation: boolean = true): Promise<ResNewsModelListReturnModel> {
    let params: GetNewsByProductIdModel
    params = {
        productId, timetick, newsType, isReputation
    }
    return await news.GetNewsByProductId(params).catch(data => data)
}


/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} newsId 新闻Id
 */
export async function GetNewsById(newsId: number): Promise<ResNewsDetailModel | null> {
    let rm = await GetNewsByIdRm(newsId)
    let models = JSONParse<ResNewsDetailModel | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} newsId 新闻Id
 */
export async function GetNewsByIdRm(newsId: number): Promise<ResNewsDetailModelReturnModel> {
    let params: GetNewsByIdModel
    params = {
        newsId
    }
    return await news.GetNewsById(params).catch(data => data)
}

/**
 * 获得首页热门新闻
 */
export async function GetHotNews(): Promise<ResNewsModel[] | null> {
    let rm = await GetHotNewsRm()
    let models = JSONParse<ResNewsModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 获得首页热门新闻
 */
export async function GetHotNewsRm(): Promise<ResNewsModelListReturnModel> {

    return await news.GetHotNews().catch(data => data)
}



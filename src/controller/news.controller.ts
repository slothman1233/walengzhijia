
import { JSONParse } from '../common/utils/ModelHelper'
import { NewsInfoModel } from '../model/news/news'
import { ResNewsModel, ResNewsModelListReturnModel } from '../model/news/resNews'
import { bodyModel } from '../model/resModel'
import news, { GetNewsListModel } from '../services/News.services'

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

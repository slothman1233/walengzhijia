
import { JSONParse } from '../common/utils/ModelHelper'
import { ResNewsModel, ResNewsModelListReturnModel } from '../model/news/resNews'
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

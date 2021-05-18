import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime, publishNewsTypeEnums } from '../enums/enums'
import { ComponentModel } from '../model/component'
import { nunRenderMacroString } from '../common/nunjucks'
import { ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductIndexPageModelListReturnModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel } from '../model/resModel'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { NewsInfoModel } from '../model/news/news'
import { ResNewsDetailModel, ResNewsModel, ResNewsModelListReturnModel } from '../model/news/resNews'

/**
 * 获得新闻内容，通过列表集合返回
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 */
export type GetNewsListModel = {
    newsType: number
    timetick: number
}


/**
 * 通过公司ID获取具体的新闻内容
 * @param {number} companyId 公司id
 * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export type GetNewsByCompanyIdModel = {
    companyId: number
    newsType: publishNewsTypeEnums
    timetick: number
    isReputation?: boolean
}

/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} productId 产品id
 * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export type GetNewsByProductIdModel = {
    productId: number
    newsType: publishNewsTypeEnums
    timetick: number
    isReputation?: boolean
}

/**
 * 通过新闻id获取新闻详情
 * @param {number} newsId 新闻id
 */
export type GetNewsByIdModel = {
    newsId: number
}

class News {
    // 获得新闻内容，通过列表集合返回
    // newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
    // timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
    // @CacheInterceptor('News_GetNewsIndustry', CacheTime.Min30)
    async GetNewsList(params: GetNewsListModel) {
        return await http.get<ResNewsModelListReturnModel>(`${config.apiPath}api/News/GetNewsList`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 添加新闻
    // @CacheInterceptor('News_GetNewsIndustry', CacheTime.Min30)
    async AddNews(params: NewsInfoModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/News/AddNews`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 修改新闻快讯内容
    // @CacheInterceptor('News_GetNewsIndustry', CacheTime.Min30)
    async UpdateNews(params: NewsInfoModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/News/UpdateNews`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 删除新闻信息
    // @CacheInterceptor('News_GetNewsIndustry', CacheTime.Min30)
    async DeleteNews(params: NewsInfoModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/News/DeleteNews`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 通过公司ID获取具体的新闻内容
     * @param {number} companyId 公司id
     * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
     * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
     * @param {boolean} isReputation 是否获取口碑新闻
     */
    async GetNewsByCompanyId(params: GetNewsByCompanyIdModel) {
        return await http.get<ResNewsModelListReturnModel>(`${config.apiPath}api/News/GetNewsByCompanyId`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 通过产品ID获取具体的新闻内容
     * @param {number} productId 产品id
     * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
     * @param {number} timetick 默认传0，有值的时候会根据当前时间戳往后自动获取10条新闻记录信息
     * @param {boolean} isReputation 是否获取口碑新闻
     */
    async GetNewsByProductId(params: GetNewsByProductIdModel) {
        return await http.get<ResNewsModelListReturnModel>(`${config.apiPath}api/News/GetNewsByProductId`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 通过产品ID获取具体的新闻内容
     * @param {number} newsId 新闻Id
     */
    async GetNewsById(params: GetNewsByIdModel) {
        return await http.get<ResNewsDetailModel>(`${config.apiPath}api/News/GetNewsById`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 获得首页热门新闻
     */
    async GetHotNews() {
        return await http.get<ResNewsModel[]>(`${config.apiPath}api/News/GetHotNews`, { headers: { 'Content-Type': 'application/json' } })
    }

}

//

let New = new News()

export default New
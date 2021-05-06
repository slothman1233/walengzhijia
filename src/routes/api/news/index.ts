

//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import company from '../../../services/company.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'
import { PostAddCompanyProduct } from '../../../controller/company.controller'
import { CompanyProductInfoModel } from '../../../model/company/Company'
import { GetNewsByCompanyIdRm, GetNewsByProductIdRm, GetNewsList, GetNewsListRm, PostAddNews, PostDeleteNews } from '../../../controller/news.controller'
import { NewsInfoModel } from '../../../model/news/news'
export default class componentapi {
    /**
     * 添加新闻
     * NewsInfoModel
     */
    @post('/AddNews')
    async AddNews(ctx: Context) {

        let models = await PostAddNews((<NewsInfoModel>ctx.request.body))
        ctx.body = models
    }

    /**
     * 删除新闻
     * NewsInfoModel
     */
    @post('/DelNews')
    async DelNews(ctx: Context) {

        let models = await PostDeleteNews((<NewsInfoModel>ctx.request.body))
        ctx.body = models
    }

    /**
     * 获取新闻列表
     * NewsInfoModel
     */
    @get('/GetNewsList')
    async GetNewsList(ctx: Context) {
        debugger
        let { newsType, timetick } = ctx.query
        let models = await GetNewsListRm(newsType, timetick)
        ctx.body = models
    }

    /**
     * 通过公司ID获取具体的新闻内容
     * NewsInfoModel
     */
    @get('/GetNewsByCompanyId')
    async GetNewsByCompanyId(ctx: Context) {
        debugger
        let { companyId, timetick, newsType } = ctx.query
        let models = await GetNewsByCompanyIdRm(companyId, newsType, timetick)
        ctx.body = models
    }

    /**
     * 通过产品ID获取具体的新闻内容
     * NewsInfoModel
     */
    @get('/GetCompanyProductById')
    async GetNewsByProductId(ctx: Context) {
        debugger
        let { productId, timetick, newsType } = ctx.query
        let models = await GetNewsByProductIdRm(productId, newsType, timetick)
        ctx.body = models
    }


}


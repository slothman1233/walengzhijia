

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
import { PostAddNews, PostDeleteNews } from '../../../controller/news.controller'
import { NewsInfoModel } from '../../../model/news/news'
export default class componentapi {
    /**
     * 添加新闻
     * NewsInfoModel
     */
    @post('/AddNews')
    async AddNews(ctx: Context) {
        debugger
        let models = await PostAddNews((<NewsInfoModel>ctx.request.body))
        ctx.body = models
    }

    /**
     * 删除新闻
     * NewsInfoModel
     */
    @post('/DelNews')
    async DelNews(ctx: Context) {
        debugger
        let models = await PostDeleteNews((<NewsInfoModel>ctx.request.body))
        ctx.body = models
    }


}


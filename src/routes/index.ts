
import { Context, Next } from 'koa'
import { test_middleware, test_2 } from '../middleware/test'
import { Controller, get, middlewares } from '../common/decorator/httpMethod'
import http from '../common/utils/net'
import path from 'path'
import fs from 'fs-extra'
import log from '../middleware/log4js/log'

import workers from '../common/utils/work/worker_threads'
import { nunRender, nunRenderMacroString } from '../common/nunjucks'

//workers()

// import * as map from './map'
import { writeFile, EnsureFile, readFile, moveFile, copyFile } from '../common/utils/file'
import Business from './business'
import Products from '../services/Product.services'
import { GetIndexPageProduct, GetProductIndustryByIndustry } from '../controller/product.controller'
import { ResIndustryTypeModel } from '../model/industry/resIndustryType'
import { GetCompanyHot } from '../controller/company.controller'
import { ResCompanyInfoIndexPageModel, ResProductIndexPageModel } from '../model/product/resproductType'
import { ResCompanyHotModel } from '../model/company/resCompany'
import { GetNewsList } from '../controller/news.controller'
import { ResNewsModel } from '../model/news/resNews'
// import Business from './list'


export default class Index {


    // @middlewares([test_middleware, test_2, test_2, test_middleware])
    @get('/index')
    async index(ctx: Context) {
        this.home(ctx)
    }

    @get('/')
    async home(ctx: Context) {
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)

        //首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
        let GetCompanyHotData = await GetCompanyHot()
        let companyHotData: ResProductIndexPageModel = {
            productTypeId: 0,
            sort: 0,
            productTypeName: '热门品牌',
            companyInfo: GetCompanyHotData || []
        }

        //获得首页板块分类公司信息（除热门信息以外的）
        let GetIndexPageProductData = await GetIndexPageProduct()

        //首页分类公司信息 组合
        let brandDataAll: ResProductIndexPageModel[] = []
        brandDataAll.push(companyHotData, ...GetIndexPageProductData)

        let brandData: { title: any[], data: ResCompanyInfoIndexPageModel[][] } = { title: [], data: [] }
        brandDataAll.forEach(item => {
            brandData.title.push({ id: item.productTypeId, sort: item.sort, title: item.productTypeName, nlink: `/list/${item.productTypeId}` })
            brandData.data.push(item.companyInfo)
        })

        //------------------------------------------------------------------------------------------------------------------


        let HotNews: ResNewsModel[] = await GetNewsList()
        let newList: any[] = []

        HotNews.forEach(item => {
            newList.push({ id: item.newsId, title: item.newsTitle })
        })

        await ctx.render('index', {
            productTypeData: productTypeData[0].productType,
            brandData,
            newList
        })
    }


    @get('/list/:productid?/:sortid?/:pageIndex?')
    async lists(ctx: Context, next: Next) {
        let { productid, sortid, pageIndex } = ctx.params
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)

        await ctx.render('list', {
            productid: productid || 1,
            sortid: sortid || 0,
            pageIndex: pageIndex || 1,
            productTypeData: productTypeData[0].productType
        })
    }

    @get('/list')
    async list(ctx: Context, next: Next) {
        await ctx.render('list', {
            productid: 0,
            sortid: 0,
            pageIndex: 1
        })
    }


    @get('/enquiry/:brandid?/:salesid?')
    async enquiry(ctx: Context, next: Next) {
        await ctx.render('enquiry', {})
    }





    /**
     * 获取静态页面的html代码
     * @param ctx 
     */
    @get('/html')
    async html(ctx: Context, next: Next) {
        let ss = nunRender('views/index.njk', Object.assign({}, ctx.state))

        let filepath = path.resolve(__dirname, '..', 'htmldist', 'index.html')
        await EnsureFile(filepath)

        await writeFile(filepath, ss.toString())

        let htmlbuf = await readFile(filepath)

        let getHtml = htmlbuf.toString()

        if (getHtml !== '') {

            ctx.type = `.html`
            ctx.status = 200
            ctx.body = getHtml
        } else {
            await next()
        }


    }


    @get('/aa/:id?')
    async business(ctx: Context, next: Next) {
        let { id } = ctx.params
        debugger
        let data = await Products.AddProductType({
            industryId: 1,
            productType: '123',
            productTypeIcon: '11'
        })
        // let data = await managelepackproduct.AddProductTypeLabel({
        //     'productTypeId': 1,
        //     'productTypeDetail': 'string'
        // })


        ctx.body = data
    }

}


export const ss = function () { return 1 }

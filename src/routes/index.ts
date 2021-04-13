
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
import managelepackproduct from '../services/managelepackproduct.services'
import { GetProductIndustryByIndustry } from '../controller/product.controller'
import { ResIndustryTypeModel } from '../model/industry/resIndustryType'
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
        await ctx.render('index', {
            productTypeData: productTypeData[0].productType
        })
    }


    @get('/list/:productid?/:sortid?/:pageIndex?')
    async lists(ctx: Context, next: Next) {
        let { productid, sortid, pageIndex } = ctx.params
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)
          
        await ctx.render('list', {
            productid: productid || 0,
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
        let data = await managelepackproduct.AddProductType({
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

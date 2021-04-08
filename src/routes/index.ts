
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
// import Business from './list'


export default class Index {


    // @middlewares([test_middleware, test_2, test_2, test_middleware])
    @get('/index')
    async index(ctx: Context) {



        this.home(ctx)
    }

    @get('/')
    async home(ctx: Context) {
        await ctx.render('index', {})
    }


    @get('/list/:productid?/:sortid?/:pageIndex?')
    async lists(ctx: Context, next: Next) {
        console.log(ctx.params)
        let {productid, sortid, pageIndex } = ctx.params
        console.log(productid, sortid)
        await ctx.render('list', {
            productid: productid || 0,
            sortid: sortid || 0,
            pageIndex: pageIndex || 1
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


    @get('/enquiry')
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


    // @get('/business/:id?')
    // async business(ctx: Context, next: Next) {
    //     let bns = new Business()
    //     await bns.index(ctx, next)
    // }

}


export const ss = function () { return 1 }

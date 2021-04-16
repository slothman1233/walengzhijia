
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { isNumber } from '../../common/utils/type_check'



export default class User {

    @get('/index/:notificationType?/:pageIndex?')
    async index(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/index', {
            notificationType: notificationType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @get('/datamanager/:tabType?')
    async datamanager(ctx: Context, next: Next) {
        let { tabType } = ctx.params
        await ctx.render('user/datamanager', {
            tabType: tabType || 1
        })
    }

    @get('/sales/:type?/:userid?')
    async sales(ctx: Context, next: Next) {
        let { type, userid } = ctx.params
        await ctx.render('user/sales', {
            type: type || 1,
            userid: userid || 0
        })
    }




    @get('/product/:tabType?/:pageIndex?')
    async product(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        await ctx.render('user/product', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @get('/news/:tabType?/:pageIndex?')
    async news(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        await ctx.render('user/news', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @get('/content/:tabType?/:pageIndex?')
    async content(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        await ctx.render('user/content', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @get('/information')
    async information(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/information', {

        })
    }

    @get('/changepwd')
    async changepwd(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/changepwd', {

        })
    }

    @get('/publishproduct')
    async publishproduct(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/publishproduct', {

        })
    }

    @get('/publishnews')
    async publishnews(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/publishnews', {

        })
    }



}



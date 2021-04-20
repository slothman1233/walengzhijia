
import { Context, Next } from 'koa'
import { get, middlewares } from '../../common/decorator/httpMethod'
import { user_login_middleware } from '../../middleware/login'



export default class User {
    @middlewares([user_login_middleware])
    @get('/index/:notificationType?/:pageIndex?')
    async index(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/index', {
            notificationType: notificationType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @middlewares([user_login_middleware])
    @get('/datamanager/:tabType?')
    async datamanager(ctx: Context, next: Next) {
        let { tabType } = ctx.params
        await ctx.render('user/datamanager', {
            tabType: tabType || 1
        })
    }

    @middlewares([user_login_middleware])
    @get('/sales/:type?/:userid?')
    async sales(ctx: Context, next: Next) {
        let { type, userid } = ctx.params
        await ctx.render('user/sales', {
            type: type || 1,
            userid: userid || 0
        })
    }



    @middlewares([user_login_middleware])
    @get('/product/:tabType?/:pageIndex?')
    async product(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        await ctx.render('user/product', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @middlewares([user_login_middleware])
    @get('/news/:tabType?/:pageIndex?')
    async news(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        await ctx.render('user/news', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @middlewares([user_login_middleware])
    @get('/content/:tabType?/:pageIndex?')
    async content(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        await ctx.render('user/content', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @middlewares([user_login_middleware])
    @get('/information')
    async information(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/information', {

        })
    }

    @middlewares([user_login_middleware])
    @get('/changepwd')
    async changepwd(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/changepwd', {

        })
    }

    @middlewares([user_login_middleware])
    @get('/publishproduct')
    async publishproduct(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/publishproduct', {

        })
    }

    @middlewares([user_login_middleware])
    @get('/publishnews')
    async publishnews(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/publishnews', {

        })
    }



}



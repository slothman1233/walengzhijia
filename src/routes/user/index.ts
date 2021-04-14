
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




    @get('/product/:tabType?/:publishtabType?/:pageIndex?')
    async product(ctx: Context, next: Next) {
        let { tabType, publishtabType, pageIndex } = ctx.params
        await ctx.render('user/product', {
            tabType: tabType || 1,
            publishtabType: publishtabType || 1,
            pageIndex: pageIndex || 1
        })
    }

    @get('/news')
    async news(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/news', {

        })
    }

    @get('/content')
    async content(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/content', {

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

}




import { Context, Next } from 'koa'
import { get, middlewares } from '../../common/decorator/httpMethod'
import { getCookie } from '../../common/utils/cookies'
import { GetCompanyProductType, GetProductIndustryByIndustry } from '../../controller/product.controller'
import { publishNews, publishNewsTypeEnums } from '../../enums/enums'
import { user_login_middleware } from '../../middleware/login'
import { productTypeListModel } from '../../model/reputation/reputation'
import { userlogin } from '../../routes/login'


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
    @get('/publishproduct/:productId?')
    async publishproduct(ctx: Context, next: Next) {
        let { productId } = ctx.params

        //获取所有的二级分类
        let ProductIndustry = await GetProductIndustryByIndustry(1)
        let industryOption: any[] = []
        //第一个二级分类的所有三级产品
        let productTypeLabels: any[] = []
        ProductIndustry[0].productType.forEach((product, index) => {
            if (index === 0) {
                product.productTypeLabels.forEach((label) => {
                    productTypeLabels.push({
                        id: label.productTypeDetailId,
                        name: label.productTypeDetail
                    })
                })
            }
            industryOption.push({
                id: product.productTypeId,
                value: product.productType
            })
        })
        //--------------------------------------------------------

        await ctx.render('user/publishproduct', {
            industryOption,
            productTypeLabels
        })
    }

    @middlewares([user_login_middleware])
    @get('/publishnews')
    async publishnews(ctx: Context, next: Next) {

        let cookie = getCookie(ctx, userlogin)
        let companyId = 1
        if (cookie !== 'undefined') {
            companyId = JSON.parse(cookie).company.companyId
        }

        let { newsId } = ctx.params
        //细节标签
        let labels = publishNews

        //公司的产品集合
        let productType: productTypeListModel[] = await GetCompanyProductType({ companyId }) || []

        console.log(productType)

        let productSelectOption: any[] = []
        //数据转化
        productType.forEach((item) => {
            productSelectOption.push({
                id: item.productTypeId,
                value: item.productTypeName
            })
        })

        await ctx.render('user/publishnews', {
            labels,
            productSelectOption
        })
    }



}



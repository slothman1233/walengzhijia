
import { Context, Next } from 'koa'
import { get, middlewares } from '../../common/decorator/httpMethod'
import { getCookie } from '../../common/utils/cookies'
import { GetCompanyProduct, GetCompanyProductById, GetCompanyProductByTypeId, GetCompanyProductType, GetProductIndustryByIndustry } from '../../controller/product.controller'
import { productImgTypeEnums, publishNews, publishNewsTypeEnums } from '../../enums/enums'
import { user_login_middleware } from '../../middleware/login'
import { productTypeListModel } from '../../model/reputation/reputation'
import { ResCompanyProductInfoModel } from '../../model/reputation/resreputation'
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
    @get('/product')
    async product(ctx: Context, next: Next) {

        let productTypeId = 0
        let cookie = getCookie(ctx, userlogin)
        let companyId = 1
        if (cookie !== 'undefined') {
            companyId = JSON.parse(cookie).company.companyId
        }


        //根据公司ID获得所有产品分类
        let reputationtype = await GetCompanyProductType({ companyId })

        let reputationtypeinfo: any[] = []
        reputationtype.forEach((item, index) => {
            if (index === 0) {
                productTypeId = item.productTypeId
            }
            reputationtypeinfo.push({
                class: '',
                title: item.productTypeName,
                id: item.productTypeId,
                nlink: 'javascript:(0)'
            })
        })
        //----------------------------------------------
        //根据公司ID和产品id 获取产品列表
        let pageSize = 10
        let GetCompanyProduct = await GetCompanyProductByTypeId({ companyId, productTypeId, pageIndex: 1, pageSize })

        let companyObject: any[] = []

        //ResCompanyProductInfoModel

        GetCompanyProduct.items.forEach(item => {
            let label: string[] = []
            Object.keys(item.classify).forEach(function (index) {
                label.push(item.classify[index])
            })
            companyObject.push({
                logo: item.productCover,
                title: item.productName,
                label,
                id: item.productId,
                companyId,
                createTime: `${item.listingDateYear}-${item.listingDateMonth}`
            })
        })
        //----------------------------------------------


        await ctx.render('user/product', {
            reputationtypeinfo,
            companyId,
            pageSize,
            companyObject,
            totalPages: GetCompanyProduct.totalPages,
            pageIndex: GetCompanyProduct.pageIndex
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
    @get('/publishproduct/:productId?/:drafts?')
    async publishproduct(ctx: Context, next: Next) {
        let { productId, drafts } = ctx.params
        let industryObject: any = {
            selectIndex: 0,
            data: []
        }
        let editorContent = ''
        // 外观图
        let externalImgAry: string[] = []
        //细节图
        let detaileddrawAry: string[] = []
        let productClassifyTypeAry: any[] = []
        let puroductInfo: ResCompanyProductInfoModel
        if (productId && !drafts) {
            //根据产品id获取产品数据
            puroductInfo = await GetCompanyProductById({ productId })

            editorContent = puroductInfo.summary

            puroductInfo.companyProductImages.forEach(item => {
                switch (item.productImgType) {
                    case productImgTypeEnums.external:
                        externalImgAry.push(`"${item.imageUrl}"`)
                        break
                    case productImgTypeEnums.detaileddraw:
                        detaileddrawAry.push(`"${item.imageUrl}"`)
                        break
                    default:
                        break
                }
            })


            productClassifyTypeAry = Object.keys(puroductInfo.classify)

            //--------------------------------------------------------
        }

        //获取所有的二级分类
        let ProductIndustry = await GetProductIndustryByIndustry(1)
        //第一个二级分类的所有三级产品
        let productTypeLabels: any[] = []
        ProductIndustry[0].productType.forEach((product, index) => {
            if (puroductInfo && puroductInfo.productTypeId) {
                if (product.productTypeId === parseInt(puroductInfo.productTypeId)) {
                    industryObject.selectIndex = index
                    product.productTypeLabels.forEach((label) => {
                        productTypeLabels.push({
                            id: label.productTypeDetailId,
                            name: label.productTypeDetail
                        })
                    })
                }
            } else {
                if (index === 0) {
                    product.productTypeLabels.forEach((label) => {
                        productTypeLabels.push({
                            id: label.productTypeDetailId,
                            name: label.productTypeDetail
                        })
                    })
                }
            }

            industryObject.data.push({
                id: product.productTypeId,
                value: product.productType
            })
        })
        //--------------------------------------------------------

        await ctx.render('user/publishproduct', {
            industryObject,
            productTypeLabels,
            puroductInfo,
            productId,
            editorContent,
            externalImgAry,
            detaileddrawAry,
            productClassifyTypeAry,
            drafts: !!drafts
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
        let productType: ResCompanyProductInfoModel[] = await GetCompanyProduct({ companyId }) || []

        console.log(productType)

        let productSelectOption: any[] = []
        //数据转化
        productType.forEach((item) => {
            productSelectOption.push({
                id: item.productId,
                value: item.productName
            })
        })

        await ctx.render('user/publishnews', {
            labels,
            productSelectOption
        })
    }



}



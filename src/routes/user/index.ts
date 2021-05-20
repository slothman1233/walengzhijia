
import { Context, Next } from 'koa'
import { get, middlewares } from '../../common/decorator/httpMethod'
import { getCookie } from '../../common/utils/cookies'
import { GetAreaInfosByCode } from '../../controller/AreaInfo.controller'
import { GetCompanySalerById, GetSalersByCompanyId } from '../../controller/company.controller'
import { GetNewsPagesByCompanyId } from '../../controller/ManageLepackNews.controller'
import { GetReuputationPagedByUser } from '../../controller/ManageLepackReputaion.controller'
import { GetNewsByCompanyId, GetNewsById } from '../../controller/news.controller'
import { GetCompanyProduct, GetCompanyProductById, GetCompanyProductByTypeId, GetCompanyProductType, GetProductIndustryByIndustry } from '../../controller/product.controller'
import { NewsContentTypeArray, productImgTypeEnums, publishNews, publishNewsTypeEnums, publishNewsTypeEnumsAry } from '../../enums/enums'
import { user_login_middleware } from '../../middleware/login'
import { userLoginModel } from '../../model/common'
import { ResNewsDetailModel } from '../../model/news/resNews'
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

        let cookie = await getCookie(ctx, userlogin)
        let companyId = 1
        let cookieJson = JSON.parse(cookie)
        if (cookie !== 'undefined') {
            companyId = cookieJson.company.companyId
        }

        //获取销售信息
        let salersList = await GetSalersByCompanyId({ companyId })
        //--------------------------------------------------------


        await ctx.render('user/datamanager', {
            tabType: tabType || 1,
            salersList,
            company: cookieJson.company
        })
    }

    @middlewares([user_login_middleware])
    @get('/sales/:type?/:salerId?')
    async sales(ctx: Context, next: Next) {
        //type 1 是新增 2 是修改
        let { type, salerId } = ctx.params
        let salerInfo = {}
        if (salerId) {
            salerInfo = await GetCompanySalerById({ salerId }) || {}
        }


        await ctx.render('user/sales', {
            type: type || 1,
            salerId: salerId || 0,
            salerInfo
        })
    }



    @middlewares([user_login_middleware])
    @get('/product')
    async product(ctx: Context, next: Next) {

        let productTypeId = 0
        let cookie = await getCookie(ctx, userlogin)
        let companyId = 1
        if (cookie !== 'undefined') {
            companyId = JSON.parse(cookie).company.companyId
        }


        //根据公司ID获得所有产品分类
        let reputationtype = await GetCompanyProductType({ companyId })

        let reputationtypeinfo: any[] = []
        if (reputationtype) {
            reputationtypeinfo.push({
                class: '',
                title: '全部',
                id: 0,
                link: 'javascript:void(0);'
            })
            reputationtype.forEach((item, index) => {
                // if (index === 0) {
                //     productTypeId = item.productTypeId
                // }
                reputationtypeinfo.push({
                    class: '',
                    title: item.productTypeName,
                    id: item.productTypeId,
                    link: 'javascript:void(0);'
                })
            })
        }

        //----------------------------------------------
        //根据公司ID和产品id 获取产品列表
        let pageSize = 10
        let GetCompanyProduct = await GetCompanyProductByTypeId({ companyId, productTypeId, pageIndex: 1, pageSize })

        let companyObject: any[] = []

        //ResCompanyProductInfoModel
        if (GetCompanyProduct) {
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
                    createTime: `${item.listingDateYear}-${item.listingDateMonth}`,
                    topWeight: item.topWeight
                })
            })
        }

        //----------------------------------------------

        await ctx.render('user/product', {
            reputationtypeinfo,
            companyId,
            pageSize,
            companyObject,
            totalPages: GetCompanyProduct?.totalPages || 1,
            pageIndex: GetCompanyProduct?.pageIndex || 1
        })
    }

    @middlewares([user_login_middleware])
    @get('/news/:tabType?/:pageIndex?')
    async news(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        //获取新闻分类
        let labels = [{
            id: 0,
            value: '全部'
        }]

        labels.push(...publishNews)

        let newlabels: any[] = []
        labels.forEach(item => {
            newlabels.push({
                class: '',
                title: item.value,
                id: item.id,
                nlink: 'javascript:void(0);'
            })
        })

        //--------------------------------
        //获取新闻列表
        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))

        //GetNewsPagesByCompanyId
        let newdata = await GetNewsPagesByCompanyId({
            companyId: cookieuserinfo.company.companyId,
            newsType: publishNewsTypeEnums.new,
            pageIndex: 1
        })
        let firstnewlist: any = []
        if (newdata && newdata.items && newdata.items.length > 0) {
            newdata.items.forEach(item => {
                firstnewlist.push({
                    logo: item.newsIcon,
                    title: item.newsTitle,
                    label: [NewsContentTypeArray[item.newsContentType]],
                    id: item.newsId,
                    author: item.userName,
                    createTime: item.newsTime,
                    isTop: item.isTop
                })
            })
        }

        //--------------------------------

        await ctx.render('user/news', {
            tabType: tabType || 1,
            pageIndex: newdata?.pageIndex || 1,
            totalPages: newdata?.totalPages || 1,
            newlabels,
            firstnewlist
        })
    }

    @middlewares([user_login_middleware])
    @get('/content/:tabType?/:pageIndex?')
    async content(ctx: Context, next: Next) {
        let { tabType, pageIndex } = ctx.params
        //获取用户对应的口碑
        let userinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))
        let pageData = await GetReuputationPagedByUser({
            userId: parseInt(userinfo.userId),
            pageIndex: 1
        })

        //------------------------------------------------------------------------------------------
        await ctx.render('user/content', {
            tabType: tabType || 1,
            pageIndex: pageIndex || 1,
            totalPages: pageData?.totalPages || 1,
            kbData: pageData?.items || []
        })
    }

    @middlewares([user_login_middleware])
    @get('/information')
    async information(ctx: Context, next: Next) {

        // { "userId": 100007,
        //  "uuid": "b201c7eb-2437-4fa5-b2ed-14723020561f", 
        //  "name": "slothman",
        //   "pwd": "*********", 
        //   "userIcon": "https://lepack.oss-cn-hangzhou.aliyuncs.com/2021-05-11/VAHgSRaNgcms.png",
        //   "sex": 0, 
        //   "industry": null,
        //   "areaCode": 0, 
        //   "areaCodeValue": null,
        //   "phoneNumber": "18182117887",
        //   "company": { 
        //       "companyId": 2, 
        //       "fullName": "测试公司信息1", 
        //       "abbrName": "测试公司1", 
        //       "logo": "https://lepack.oss-cn-hangzhou.aliyuncs.com/2021-05-08/mtvjMqlPQtNY.png", "website": "www.baidu.com", 
        //       "addr": "china", 
        //       "desc": "china", 
        //       "license": "/2021-04-27/IAwewNtmIDCE.png", 
        //       "totalReputationCount": 12, 
        //       "favorableRate": 1, 
        //       "highReputationCount": 0, 
        //       "reputationScore": 2.07, 
        //       "stockInfo": "", 
        //       "hotDefine": 1 
        //     } 
        // }

        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))



        //areaCode
        await ctx.render('user/information', {
            cookieuserinfo
        })
    }

    @middlewares([user_login_middleware])
    @get('/changepwd')
    async changepwd(ctx: Context, next: Next) {

        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))


        await ctx.render('user/changepwd', {
            phoneNumber: cookieuserinfo.phoneNumber
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
        let puroductInfo: ResCompanyProductInfoModel = {}
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
                if (index === 1) {
                    puroductInfo.productTypeId = product.productTypeId.toString()
                    product.productTypeLabels.forEach((label) => {
                        productTypeLabels.push({
                            id: label.productTypeDetailId,
                            name: label.productTypeDetail
                        })
                    })
                }
            }

            if (product.productTypeId !== 0) {
                industryObject.data.push({
                    id: product.productTypeId,
                    value: product.productType
                })
            }

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
    @get('/publishnews/:newsId?/:drafts?')
    async publishnews(ctx: Context, next: Next) {
        let { newsId, drafts } = ctx.params
        let cookie = await getCookie(ctx, userlogin)
        let companyId = 1
        if (cookie !== 'undefined') {
            companyId = JSON.parse(cookie).company.companyId
        }

        //修改
        let newsinfo: ResNewsDetailModel
        let newsTypeList: any[] = []
        if (newsId && !drafts) {
            newsinfo = await GetNewsById(newsId)

            newsinfo.newsDetail.newsType.forEach(type => {
                newsTypeList.push({
                    id: type,
                    value: publishNewsTypeEnumsAry[parseInt(type.toString())]
                })
            })
        }
        //细节标签
        let labels = publishNews
        //----------------------------------------------------------------
        //公司的产品集合
        let selectOptionbject: any = { selectIndex: 0, data: [] }
        let productType: ResCompanyProductInfoModel[] = await GetCompanyProduct({ companyId }) || []
        productType.forEach((item, index) => {
            if (newsId && !drafts && newsinfo.product.productId === item.productId) {
                selectOptionbject.selectIndex = index
            }

            selectOptionbject.data.push({
                id: item.productId,
                value: item.productName
            })
        })
        //----------------------------------------------------------------
        await ctx.render('user/publishnews', {
            labels,
            drafts: !!drafts,
            newsId,
            newsinfo,
            newsTypeList,
            selectOptionbject,
            newsType: newsinfo?.newsDetail?.newsType || []
        })
    }



}




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
import { GetCompanyBrand, GetCompanyProduct, GetCompanyProductType, GetHotCompanyIndexPageProduct, GetIndexPageProduct, GetProductIndustryByIndustry } from '../controller/product.controller'
import { ResIndustryTypeModel } from '../model/industry/resIndustryType'
import { GetCompanyHot, GetCompanyInfoById, GetSalersByCompanyId } from '../controller/company.controller'
import { ResCompanyInfoIndexPageModel, ResProductIndexPageModel } from '../model/product/resproductType'
import { ResCompanyHotModel } from '../model/company/resCompany'
import { GetHotNews, GetNewsList } from '../controller/news.controller'
import { ResNewsModel } from '../model/news/resNews'
import { GetHighQualityReputation, GetHotReputation } from '../controller/Reputation.controller'
import ManageLepackReputaions from '../services/ManageLepackReputaion.services'
import { publishNews, adTypeEnums, ProductSortType, HotCompanyDefineItems, NewsContentTypeObject, NewsContentTypeArray, NewsType, ProductSortTypeEnums } from '../enums/enums'
import { GetWebLinks } from '../controller/websitelink.controller'
import { ResWebLinkModel } from '../model/link/weblink'
import { GetAdvertising } from '../controller/Advertising.controller'
import { ResAdvertisingModel } from '../model/Advertising'
import { get_unix_time_stamp, ge_time_format } from '../common/utils/util'
import { getCookie } from '../common/utils/cookies'
import { userlogin } from './login'
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
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1) || []

        //首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
        // let GetCompanyHotData = await GetCompanyHot()
        // let companyHotData: ResProductIndexPageModel = {
        //     productTypeId: 0,
        //     sort: 0,
        //     productTypeName: '热门品牌',
        //     companyInfo: GetCompanyHotData || []
        // }

        //获得首页板块分类公司信息
        let GetIndexPageProductData = await GetIndexPageProduct() || []
        //获得首页板块 热门分类公司信息
        let hotData = await GetHotCompanyIndexPageProduct()

        //首页分类公司信息 组合
        let brandDataAll: ResProductIndexPageModel[] = []
        brandDataAll.push(...GetIndexPageProductData)
        let brandData: { title: any[], data: ResCompanyInfoIndexPageModel[][] } = { title: [], data: [] }
        brandDataAll.forEach((item, index) => {
            if (index === 0) {
                item = hotData[0]
            }
            brandData.title.push({ id: item.productTypeId, sort: item.sort, title: item.productTypeName, link: `/list/${item.productTypeId}` })
            brandData.data.push(item.companyInfo)


        })

        //------------------------------------------------------------------------------------------------------------------
        //新闻分类
        let newTypes: any[] = []
        // 0 最新资讯 1 行业新闻 2 经验分享 3 优惠活动 4 展会相关 5 其他
        NewsType.forEach((item) => {
            newTypes.push({
                id: item.id,
                title: item.value,
                link: 'javascript:void(0);'
            })
        })
        //------------------------------------------------------------------------------------------------------------------
        //新闻第一个分类的列表
        let firstNews: ResNewsModel[] = await GetNewsList(0)
        let firstNewsList: any[] = []

        if (firstNews && firstNews.length > 0) {

            firstNews.forEach((item) => {
                let link = '/news/' + item.newsId
                if (item.reputationId !== 0) {
                    link = '/news/reputation/' + item.newsId
                }
                firstNewsList.push({
                    link,
                    img: item.newsIcon,
                    title: item.newsTitle,
                    content: item.newsContent.replace(/<[^>]*>|/g, ''),
                    author: item.userName,
                    time: ge_time_format(item.newsTime, '2'),
                    businesslogo: item.companyIcon,
                    businessname: item.companyName,
                    timetick: get_unix_time_stamp(item.newsTime, 2),
                    slug: [NewsContentTypeArray[item.newsContentType]],
                    newsSourceType: item.newsContentType

                })
            })
        }
        //------------------------------------------------------------------------------------------------------------------
        //热门新闻
        let HotNews: ResNewsModel[] = await GetHotNews()

        //------------------------------------------------------------------------------------------------------------------

        //优质口碑
        let highKb = await GetHighQualityReputation()
        let reshighKb: any[] = []
        let reshighKbChart: any[] = []
        if (highKb !== null) {
            for (let i = 0; i < 3; i++) {
                let item = highKb[i]
                reshighKb.push({
                    hread: item.userIcon,
                    img: item.productCover,
                    name: item.userName,
                    kbscore: item.statisticsModel.score,
                    link: `/business/product/${item.companyId}/${item.productId}`,
                    title: item.productName,
                    description: item.summary,
                    newsId: item.newsId
                })

                let name: any[] = []
                let value: any[] = []
                item.statisticsModel.reputationScore.forEach((kbitem) => {
                    name.push(kbitem.reputationTypeName)
                    value.push(kbitem.reputationScore)
                })
                reshighKbChart.push({
                    name,
                    value
                })
            }
        }
        //------------------------------------------------------------------------------------------------------------------

        //友情链接
        let getlinks: any[] = [];
        (await GetWebLinks() || []).forEach((item: ResWebLinkModel) => {
            getlinks.push({
                id: item.webLinkId,
                name: item.webName,
                link: item.link
            })
        })
        //------------------------------------------------------------------------------------------------------------------
        //广告
        let adtoponeData: ResAdvertisingModel[] = await GetAdvertising({
            adType: adTypeEnums.topone,
            size: 4
        })

        let adtoptowData: ResAdvertisingModel[] = await GetAdvertising({
            adType: adTypeEnums.toptwo,
            size: 14
        })

        let adslideData: ResAdvertisingModel[] = await GetAdvertising({
            adType: adTypeEnums.slide,
            size: 5
        })
        //------------------------------------------------------------------------------------------------------------------
        //获得热门口碑排行信息

        // let hotReputation = await GetHotReputation()
        let option = {
            productType: 0,
            classifyType: 0,
            pageIndex: 1,
            pageSize: 5,
            queryType: ProductSortTypeEnums.reputation
        }

        let hotReputation = await GetCompanyBrand(option)

        //------------------------------------------------------------------------------------------------------------------
        await ctx.render('index', {
            productTypeData: productTypeData[0].productType,
            brandData,
            HotNews,
            highKb: JSON.stringify(highKb),
            reshighKb,
            reshighKbChart: JSON.stringify(reshighKbChart),
            firstNewsList,
            newTypes,
            getlinks,
            hotReputation: hotReputation.items,
            ad: {
                adtoponeData,
                adtoptowData,
                adslideData
            }
        })
    }

    /**
     * @param {number} productid 二级分类
     * @param {number} sortid 三级分类
     * @param {ProductSortTypeEnums} tabIndex 查询类型：1=综合排序 2=口碑排序 3=热门排序
     * @param {number} pageIndex 当前页码
     */
    @get('/list/:productid?/:sortid?/:tabIndex?/:pageIndex?')
    async lists(ctx: Context, next: Next) {
        let { productid = 0, sortid = 0, tabIndex = 1, pageIndex = 1 } = ctx.params
        let pageSize = 10
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)
        //------------------------------------------------------------------------------------

        //获取热门品牌商
        let GetCompanyHotData = await GetIndexPageProduct()
        //------------------------------------------------------------------------------------
        //品牌商分类
        let productTabList: any[] = []
        ProductSortType.forEach((item, index) => {
            productTabList.push({
                id: item.id,
                title: item.value,
                blank: false,
                link: `/list/${productid}/${sortid}/${index + 1}/1`
            })
        })
        //----------------------------------------------------------------
        //品牌商列表数据
        let GetCompanyJson = await GetCompanyBrand({
            productType: productid,
            classifyType: sortid,
            pageIndex,
            pageSize,
            queryType: tabIndex
        })
        let companylistJson: any[] = []
        if (GetCompanyJson?.items) {
            GetCompanyJson.items.forEach(item => {
                if (item.company) {
                    companylistJson.push({
                        logo: item.company.logo,
                        link: '/business/' + item.company.companyId,
                        name: item.company.abbrName,
                        kbscore: item.reputationScore,
                        classify: item.productTypes,
                        kbcount: item.totalReputationCount,
                        favorablerate: item.favorableRate * 100,
                        kbgood: item.highReputationCount,
                        label: item.company.companyLabels,
                        brandtype: HotCompanyDefineItems[item.company.hotType]
                    })
                }

            })
        }
        //----------------------------------------------------------------
        await ctx.render('list', {
            productid,
            sortid,
            pageIndex,
            tabIndex,
            productTypeData: productTypeData[0].productType,
            GetCompanyHotData: GetCompanyHotData[0].companyInfo,
            productTabList,
            totalPages: GetCompanyJson?.totalPages || 0,
            companylistJson
        })
    }
    /**
    * @param {number} companyId 品牌商ID
    * @param {number} productId 产品ID
    * @param {number} companyId 销售ID
    */
    @get('/enquiry/:companyId?/:productId?/:salesid?')
    async enquiry(ctx: Context, next: Next) {
        let { companyId, salesid, productId } = ctx.params
        //公司信息
        let companydata = await GetCompanyInfoById({ companyId })
        //----------------------------------------------
        //销售信息
        let salers = await GetSalersByCompanyId({ companyId })
        let phoneNumber = ''
        let userinfostr = await getCookie(ctx, userlogin)

        if (userinfostr !== 'undefined') {
            phoneNumber = JSON.parse(userinfostr).phoneNumber
        }
        //----------------------------------------------
        // 获取公司的产品集合

        let ProductType = await GetCompanyProduct({ companyId })
        let productObject:any = {
            selectIndex: 0,
            data: []

        }
        let productTypeAry: any[] = []
        ProductType.forEach((item, index) => {
            if (parseInt(productId) === item.productId) {
                productObject.selectIndex = index
            }
            productObject.data.push({
                id: item.productId,
                value: item.productName

            })
        })


        //----------------------------------------------



        await ctx.render('enquiry', {
            companyId,
            companydata,
            salesid,
            salers,
            productObject,
            phoneNumber
        })
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
        let data = await ManageLepackReputaions.AddProductType({
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

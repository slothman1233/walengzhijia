
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
import { GetCompanyProductType, GetIndexPageProduct, GetProductIndustryByIndustry } from '../controller/product.controller'
import { ResIndustryTypeModel } from '../model/industry/resIndustryType'
import { GetCompanyHot, GetCompanyInfoById, GetSalersByCompanyId } from '../controller/company.controller'
import { ResCompanyInfoIndexPageModel, ResProductIndexPageModel } from '../model/product/resproductType'
import { ResCompanyHotModel } from '../model/company/resCompany'
import { GetNewsList } from '../controller/news.controller'
import { ResNewsModel } from '../model/news/resNews'
import { GetHighQualityReputation } from '../controller/Reputation.controller'
import ManageLepackReputaions from '../services/ManageLepackReputaion.services'
import { publishNews, adTypeEnums } from '../enums/enums'
import { GetWebLinks } from '../controller/websitelink.controller'
import { ResWebLinkModel } from '../model/link/weblink'
import { GetAdvertising } from '../controller/Advertising.controller'
import { ResAdvertisingModel } from '../model/Advertising'
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
        //热门分类
        let newTypes: any[] = []

        publishNews.forEach((item) => {
            newTypes.push({
                id: item.id,
                title: item.value,
                link: 'javascript:(0)'
            })
        })

        //------------------------------------------------------------------------------------------------------------------
        //热门新闻
        let HotNews: ResNewsModel[] = await GetNewsList()
        let newList: any[] = []

        HotNews.forEach(item => {
            newList.push({ id: item.newsId, title: item.newsTitle })
        })
        //------------------------------------------------------------------------------------------------------------------

        //优质口碑
        let highKb = await GetHighQualityReputation()
        let reshighKb: any[] = []
        let reshighKbChart: any[] = []
        if (highKb !== null) {
            highKb.forEach((item) => {
                reshighKb.push({
                    hread: item.userIcon,
                    img: item.productCover,
                    name: item.userName,
                    kbscore: item.statisticsModel.score,
                    link: `/business/product/${item.companyId}/${item.productId}`,
                    title: item.productName,
                    description: item.summary
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
            })
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
        debugger
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


        await ctx.render('index', {
            productTypeData: productTypeData[0].productType,
            brandData,
            newList,
            reshighKb,
            reshighKbChart: JSON.stringify(reshighKbChart),
            newTypes,
            getlinks,
            ad: {
                adtoponeData,
                adtoptowData,
                adslideData
            }
        })
    }
    // hread: "https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0",
    // img: "https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0",
    // name: "李女士",
    // kbscore: "5.00",
    // link: "/business/product/0",
    // title: "阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬",
    // description: "a阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发斯蒂芬阿萨德发斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德"

    @get('/list/:productid?/:sortid?/:pageIndex?')
    async lists(ctx: Context, next: Next) {
        let { productid, sortid, pageIndex } = ctx.params
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)
        //------------------------------------------------------------------------------------

        //获取热门品牌商
        let GetCompanyHotData = await GetCompanyHot()
        //------------------------------------------------------------------------------------
        await ctx.render('list', {
            productid: productid || 1,
            sortid: sortid || 0,
            pageIndex: pageIndex || 1,
            productTypeData: productTypeData[0].productType,
            GetCompanyHotData
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

    /**
    * @param {number} companyId 品牌商ID
    * @param {number} companyId 销售ID
    */
    @get('/enquiry/:companyId?/:salesid?')
    async enquiry(ctx: Context, next: Next) {
        let { companyId, salesid } = ctx.params
        //公司信息
        let companydata = await GetCompanyInfoById({ companyId })
        //----------------------------------------------
        //销售信息
        let salers = await GetSalersByCompanyId({ companyId })
        //----------------------------------------------
        // 获取公司的产品集合

        let ProductType = await GetCompanyProductType({ companyId })
        let productTypeAry: any[] = []
        ProductType.forEach(item => {
            productTypeAry.push({
                id: item.productTypeId,
                value: item.productTypeName
            })
        })


        //----------------------------------------------



        await ctx.render('enquiry', {
            companyId,
            companydata,
            salesid,
            salers,
            productTypeAry
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

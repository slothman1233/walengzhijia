

import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { get_unix_time_stamp, ge_time_format } from '../../common/utils/util'
import { GetAdvertising } from '../../controller/Advertising.controller'
import { GetNewsList } from '../../controller/news.controller'
import { GetCompanyHot, GetCompanyInfoById, GetSalersByCompanyId } from '../../controller/company.controller'
import { GetCompanyBrand, GetCompanyProduct, GetHotCompanyIndexPageProduct, GetProductIndustryByIndustry } from '../../controller/product.controller'
import { adTypeEnums, HotCompanyDefineItems, NewsContentTypeArray, NewsType, ProductSortType, ProductSortTypeEnums } from '../../enums/enums'
import { ResAdvertisingModel } from '../../model/Advertising'
import { ResIndustryTypeModel } from '../../model/industry/resIndustryType'
import { ResNewsModel } from '../../model/news/resNews'
import { getCookie } from '../../common/utils/cookies'
import { userlogin } from '../login'
import Login from './login'
import { userLoginModel } from '../../model/common'

let lg = new Login()
export default class Index {
    @get('/index')
    async index(ctx: Context) {
        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))
        //------------------------------------------------------------------------------------------------------------------
        //广告
        let adtoptowData: ResAdvertisingModel[] = await GetAdvertising({
            adType: adTypeEnums.toptwo,
            size: 10
        })
        let adslideData: ResAdvertisingModel[] = await GetAdvertising({
            adType: adTypeEnums.slide,
            size: 5
        })
        //------------------------------------------------------------------------------------------------------------------

        //获得首页板块 热门分类公司信息
        let hotData = await GetHotCompanyIndexPageProduct()
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
                let link = '/m/news/' + item.newsId
                if (item.reputationId !== 0) {
                    link = '/m/news/reputation/' + item.newsId
                }
                firstNewsList.push({
                    pagetype: 'moblie',
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
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)
        //------------------------------------------------------------------------------------

        //品牌商分类
        let productTabList: any[] = []
        ProductSortType.forEach((item) => {
            productTabList.push({
                id: item.id,
                title: item.value,
                blank: false,
                link: `javascript:void(0);`
            })
        })
        //----------------------------------------------------------------
        let listpageSize = 10
        //品牌商列表数据
        let GetCompanyJson = await GetCompanyBrand({
            productType: 0,
            classifyType: 0,
            pageIndex: 1,
            pageSize: listpageSize,
            queryType: ProductSortTypeEnums.synthesize
        })

        let companylistJson: any[] = []
        if (GetCompanyJson?.items) {
            GetCompanyJson.items.forEach(item => {
                if (item.company) {
                    companylistJson.push({
                        pagetype: 'moblie',
                        logo: item.company.logo,
                        link: '/m/business/' + item.company.companyId,
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
        console.log(cookieuserinfo)
        //----------------------------------------------------------------
        await ctx.render('m/index', {
            cookieuserinfo,
            hotData: hotData[0]?.companyInfo || [],
            newTypes,
            firstNewsList,
            productTabList,
            listpageSize,
            companylistJson,
            productTypeData: productTypeData[0].productType,
            ad: {
                adslideData,
                adtoptowData
            }
        })

    }


    /**
    * @param {number} companyId 品牌商ID
    * @param {number} productId 产品ID
    * @param {number} companyId 销售ID
    */
    @get('/enquiry/:companyId?/:productId?/:salesid?')
    async enquiry(ctx: Context, next: Next) {
        let { companyId, productId, salesid } = ctx.params
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
        let firstproduct = {
            id: -1,
            value: ''
        }

        let CompanyProductInfo = await GetCompanyProduct({ companyId })
        let productInfoObject: any[] = []
        CompanyProductInfo.forEach(item => {
            if (!productInfoObject[item.productTypeId]) { productInfoObject[item.productTypeId] = {} }
            if (!productInfoObject[item.productTypeId]['productName']) { productInfoObject[item.productTypeId]['productName'] = [] }
            if (!productInfoObject[item.productTypeId].product) { productInfoObject[item.productTypeId].product = [] }
            productInfoObject[item.productTypeId].product.push({
                productName: item.productName,
                productid: item.productId,
                score: item.statisticsModel?.score || 0
            })

            if (parseInt(productId) === item.productId) {
                firstproduct.id = item.productId
                firstproduct.value = item.productName
            }

            productInfoObject[item.productTypeId].productTypeName = item.productTypeName
            productInfoObject[item.productTypeId].productTypeId = item.productTypeId
        })
        
        if (firstproduct.id === -1) {
            try {

                firstproduct.id = CompanyProductInfo[0].productId
                firstproduct.value = CompanyProductInfo[0].productName
            } catch (e) { }
        }


        //----------------------------------------------



        await ctx.render('m/enquiry', {
            companyId,
            companydata,
            salesid,
            salers,
            productInfoObject,
            firstproduct,
            phoneNumber
        })
    }

    @get('/login')
    async login(ctx: Context) {
        await lg.index(ctx)

    }

}
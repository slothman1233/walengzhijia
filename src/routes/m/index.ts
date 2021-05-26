

import { Context, Next } from 'koa'
import { Controller, get, middlewares } from '../../common/decorator/httpMethod'
import { get_unix_time_stamp, ge_time_format } from '../../common/utils/util'
import { GetAdvertising } from '../../controller/Advertising.controller'
import { GetNewsList } from '../../controller/news.controller'
import { GetCompanyBrand, GetHotCompanyIndexPageProduct, GetProductIndustryByIndustry } from '../../controller/product.controller'
import { GetHighQualityReputation } from '../../controller/Reputation.controller'
import { adTypeEnums, HotCompanyDefineItems, NewsContentTypeArray, NewsType, ProductSortType, ProductSortTypeEnums, publishNews } from '../../enums/enums'
import { ResAdvertisingModel } from '../../model/Advertising'
import { ResIndustryTypeModel } from '../../model/industry/resIndustryType'
import { ResNewsModel } from '../../model/news/resNews'
import { ResReputationModel } from '../../model/reputation/resreputation'

export default class Index {
    @get('/index')
    async index(ctx: Context) {


        //------------------------------------------------------------------------------------------------------------------
        //广告
        let adtoptowData: ResAdvertisingModel[] = await GetAdvertising({
            adType: adTypeEnums.toptwo,
            size: 9
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
                    slug: [NewsContentTypeArray[item.newsContentType]]
                })
            })
        }
        //------------------------------------------------------------------------------------------------------------------
        //行业信息
        let productTypeData: ResIndustryTypeModel[] = await GetProductIndustryByIndustry(1)
        //------------------------------------------------------------------------------------

        //品牌商分类
        let productTabList: any[] = []
        ProductSortType.forEach((item, index) => {
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
                        logo: item.company.logo,
                        link: '/business/' + item.company.companyId,
                        name: item.company.abbrName,
                        kbscore: item.company.reputation.score,
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
        await ctx.render('m/index', {
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
}
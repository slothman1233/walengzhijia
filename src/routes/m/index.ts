

import { Context, Next } from 'koa'
import { Controller, get, middlewares } from '../../common/decorator/httpMethod'
import { get_unix_time_stamp, ge_time_format } from '../../common/utils/util'
import { GetAdvertising } from '../../controller/Advertising.controller'
import { GetNewsList } from '../../controller/news.controller'
import { GetHotCompanyIndexPageProduct } from '../../controller/product.controller'
import { GetHighQualityReputation } from '../../controller/Reputation.controller'
import { adTypeEnums, NewsContentTypeArray, NewsType, publishNews } from '../../enums/enums'
import { ResAdvertisingModel } from '../../model/Advertising'
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


        await ctx.render('m/index', {
            hotData: hotData[0]?.companyInfo || [],
            newTypes,
            firstNewsList,
            ad: {
                adslideData,
                adtoptowData
            }
        })

    }
}
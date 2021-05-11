
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { get_unix_time_stamp, ge_time_format } from '../../common/utils/util'
import { GetCompanyInfoById, GetSalersByCompanyId } from '../../controller/company.controller'
import { GetNewsByCompanyId, GetNewsByProductId } from '../../controller/news.controller'
import { GetCompanyProduct, GetCompanyProductById, GetCompanyProductByTypeId, GetCompanyProductType } from '../../controller/product.controller'
import { GetReputationByCompany, GetReputationByProductId, GetReputationStatisticsByProduct } from '../../controller/Reputation.controller'
import { NewsContentTypeArray, publishNews } from '../../enums/enums'
import { ResNewsModel } from '../../model/news/resNews'



export default class Business {

    @get('/:companyId?')
    async index(ctx: Context, next: Next) {
        let { companyId } = ctx.params
        let productTypeId = 0

        //公司信息
        let companyinfo = await GetCompanyInfoById({ companyId })

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
        let GetCompanyProduct = await GetCompanyProductByTypeId({ companyId, productTypeId, pageIndex: 1, pageSize: 10 })
        //----------------------------------------------
        ///获得公司口碑集合
        let Reputation = await GetReputationByCompany(companyId)
        console.log(Reputation)

        let reshighKb: any[] = []
        let reshighKbChart: any[] = []
        if (Reputation !== null) {
            Reputation.forEach((item) => {
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
        //----------------------------------------------
        //------------------------------------------------------------------------------------------------------------------
        //新闻分类
        let newTypes: any = {
            isSelect: '1',
            data: []
        }
        // 0 最新资讯 1 行业新闻 2 经验分享 3 优惠活动 4 展会相关 5 其他
        publishNews.forEach((item) => {
            newTypes.data.push({
                id: item.id,
                title: item.value,
                class: ''
            })
        })
        //------------------------------------------------------------------------------------------------------------------
        //新闻第一个分类的列表
        let firstNews: ResNewsModel[] = await GetNewsByCompanyId(companyId, publishNews[0].id)
        let firstNewsList: any[] = []
        if (firstNews) {
            firstNews.forEach((item) => {
                let link = '/news/' + item.newsId
                if(item.reputationId !== 0){
                    link = '/news/reputation/' + item.newsId
                }
                firstNewsList.push({
                    link,
                    img: item.newsIcon,
                    title: item.newsTitle,
                    content: item.newsContent.replace(/<[^>]*>|/g, ''),
                    author: item.createUser,
                    time: ge_time_format(item.newsTime, '2'),
                    businesslogo: item.companyIcon,
                    businessname: item.companyName,
                    timetick: get_unix_time_stamp(item.newsTime, 2),
                    slug: [NewsContentTypeArray[item.NewsContentType]]
                })
            })
        }
        //------------------------------------------------------------------------------------------------------------------

        await ctx.render('business/index', {
            Reputation,
            companyId,
            newTypes,
            firstNewsList,
            companyinfo,
            reputationtypeinfo,
            GetCompanyProduct,
            reshighKb,
            reshighKbChart: JSON.stringify(reshighKbChart)
        })

    }

    /**
    * @param {number} companyId 品牌商ID
    * @param {number} productId 产品ID
    */
    @get('/product/:companyId?/:productId?')
    async product(ctx: Context, next: Next) {

        let { companyId, productId } = ctx.params

        //销售信息
        let salers = await GetSalersByCompanyId({ companyId })
        //----------------------------------------------

        //获取产品信息
        let CompanyProductInfo = await GetCompanyProductById({
            productId
        })
        //----------------------------------------------

        //品牌商资料
        let kbByProduct = await GetReputationStatisticsByProduct(productId)
        let kbscoreData: any[] = []

        if (kbByProduct) {

            kbByProduct.reputationScore.forEach(item => {
                kbscoreData.push({
                    name: item.reputationTypeName,
                    number: item.reputationScore
                })
            })
        }
        //----------------------------------------------
        //获取产品的口碑信息
        let ReputationData = await GetReputationByProductId(productId)
        //----------------------------------------------
        //------------------------------------------------------------------------------------------------------------------
        //新闻分类
        let newTypes: any = {
            isSelect: '1',
            data: []
        }
        // 0 最新资讯 1 行业新闻 2 经验分享 3 优惠活动 4 展会相关 5 其他
        publishNews.forEach((item) => {
            newTypes.data.push({
                id: item.id,
                title: item.value,
                class: ''
            })
        })
        //------------------------------------------------------------------------------------------------------------------
        //新闻第一个分类的列表
        let firstNews: ResNewsModel[] = await GetNewsByProductId(productId, publishNews[0].id)
        let firstNewsList: any[] = []
        if (firstNews) {
            firstNews.forEach((item) => {
                let link = '/news/' + item.newsId
                if(item.reputationId !== 0){
                    link = '/news/reputation/' + item.newsId
                }
                firstNewsList.push({
                    link,
                    img: item.newsIcon,
                    title: item.newsTitle,
                    content: item.newsContent.replace(/<[^>]*>|/g, ''),
                    author: item.createUser,
                    time: ge_time_format(item.newsTime, '2'),
                    businesslogo: item.companyIcon,
                    businessname: item.companyName,
                    timetick: get_unix_time_stamp(item.newsTime, 2),
                    slug: [NewsContentTypeArray[item.NewsContentType]]
                })
            })
        }

        //------------------------------------------------------------------------------------------------------------------

        await ctx.render('business/product', {
            companyId,
            productId,
            kbByProduct,
            kbscoreData,
            salers,
            ReputationData,
            CompanyProductInfo,
            firstNewsList
        })

    }
    @get('/answer/:id?')
    async answer(ctx: Context, next: Next) {

        await ctx.render('business/answer', {})

    }



}
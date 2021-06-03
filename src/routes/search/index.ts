
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { isNumber } from '../../common/utils/type_check'
import { get_unix_time_stamp, ge_time_format } from '../../common/utils/util'
import { Search } from '../../controller/Search.controller'
import { HotCompanyDefineItems, NewsContentTypeArray, QueryResultType, searchqueryType } from '../../enums/enums'
import { QueryCompanyModel, QueryNewsModel } from '../../model/search/search'


export default class Searchs {

    @get('/:type?/:keyword?')
    async index(ctx: Context, next: Next) {
        let { type, keyword } = ctx.params

        //type 的范围只能是1 或者 2
        if ((parseInt(type) !== 1 && parseInt(type) !== 2)) {
            type = 1
        }

        //搜索结果
        let data = await Search({
            searchContent: keyword,
            companyTimeTicks: 0,
            newsTimeTicks: 0,
            queryType: type
        })
        let bsuinessAry: any[] = []
        let newsAry: any[] = []
        // let timetick = data
        if (data) {
            data.forEach((item: QueryCompanyModel | QueryNewsModel, index: number) => {

                switch (item.queryResultType) {
                    case searchqueryType.all:
                        let d = <QueryCompanyModel>item
                        bsuinessAry.push({
                            logo: d.company.logo,
                            link: '/business/' + d.company.companyId,
                            name: d.company.abbrName,
                            kbscore: d.reputationScore,
                            classify: d.productTypes,
                            kbcount: d.totalReputationCount,
                            favorablerate: d.favorableRate * 100,
                            kbgood: d.highReputationCount,
                            label: d.company.companyLabels,
                            brandtype: HotCompanyDefineItems[d.company.hotType],
                            timetick: get_unix_time_stamp(d.company.createTime, 2)
                        })
                        break
                    case searchqueryType.company:
                        let newsd = <QueryNewsModel>item
                        let link = '/news/' + newsd.newsId
                        if (newsd.reputationId !== 0) {
                            link = '/news/reputation/' + newsd.newsId
                        }
                        newsAry.push({
                            link,
                            img: newsd.newsIcon,
                            title: newsd.newsTitle,
                            content: newsd.newsContent.replace(/<[^>]*>|/g, ''),
                            author: newsd.userName,
                            time: ge_time_format(newsd.newsTime, '2'),
                            businesslogo: newsd.companyIcon,
                            businessname: newsd.companyName,
                            timetick: get_unix_time_stamp(newsd.newsTime, 2),
                            slug: [NewsContentTypeArray[newsd.newsContentType]]
                        })
                        break
                    default:
                        break
                }

            })
        }
        //-------------------------------


        await ctx.render('search/index', {
            type: type,
            keyword: keyword || '',
            bsuinessAry,
            newsAry,
            newsTimeTicks: newsAry[newsAry.length - 1]?.timetick || 0,
            companyTimeTicks: bsuinessAry[bsuinessAry.length - 1]?.timetick || 0,
        })
    }
}


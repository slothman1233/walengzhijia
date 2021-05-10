
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetNewsById } from '../../controller/news.controller'


export default class News {



  @get('/reputation/:newsId?')
    async reputation(ctx: Context, next: Next) {
        let { newsId } = ctx.params
        //新闻详情
        let newsDetail = await GetNewsById(newsId)
        // newsDetail.newsDetail 在口碑新闻中是ResNewsReputationModel类型
        //-------------------------------


        await ctx.render('news/reputation', {
            newsId,
            newsDetail
        })

    }


  @get('/:newsId?')
  async index(ctx: Context, next: Next) {

      let { newsId } = ctx.params

      //新闻详情
      let newsDetail = await GetNewsById(newsId)

      //-------------------------------

      await ctx.render('news/index', {
          newsId,
          newsDetail
      })

  }







}


export const ss = function () { return 1 }

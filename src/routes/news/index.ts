
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetNewsById } from '../../controller/news.controller'


export default class News {



  @get('/reputation/:id?')
    async reputation(ctx: Context, next: Next) {




        await ctx.render('news/reputation', {})

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

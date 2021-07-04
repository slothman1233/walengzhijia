
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { getCookie } from '../../common/utils/cookies'
import { GetCommentList } from '../../controller/comment.controller'
import { GetHotNews, GetNewsById } from '../../controller/news.controller'
import { CommentTargetTypeEnum } from '../../enums/enums'
import { ResNewsModel } from '../../model/news/resNews'
import { components_CommentReplyModel } from '../../wwwroot/work/components/comment/commentModel'
import { userlogin } from '../login'

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
            newsDetail,

        })

    }


  @get('/:newsId?')
  async index(ctx: Context, next: Next) {

      let { newsId } = ctx.params

      //新闻详情
      let newsDetail = await GetNewsById(newsId)
      console.log(newsDetail)
      //-------------------------------
      //热门资讯
      let HotNews: ResNewsModel[] = await GetHotNews()
      console.log(HotNews)
      //------------------------------------------------
      await ctx.render('news/index', {
          newsId,
          newsDetail,
          HotNews
      })

  }







}


export const ss = function () { return 1 }

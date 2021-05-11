
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { getCookie } from '../../common/utils/cookies'
import { GetCommentList } from '../../controller/comment.controller'
import { GetNewsById } from '../../controller/news.controller'
import { CommentTargetTypeEnum } from '../../enums/enums'
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

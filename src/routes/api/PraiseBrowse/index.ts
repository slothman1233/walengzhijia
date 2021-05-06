
import { Context } from 'koa'
import { post } from '../../../common/decorator/httpMethod'
import { AddBrowse, AddPraise, DeletePraise, GetIsPraise } from '../../../controller/PraiseBrowse.controller'
import { BrowseModel, PraiseModel } from '../../../model/PraiseBrowse'
export default class PraiseBrowseapi {
  /**
   * 添加点赞
   * @param {PraiseModel} params 点赞模型
   */
  @post('/AddPraise')
    async AddPraise(ctx: Context) {

        let models = await AddPraise((<PraiseModel>ctx.request.body))
        ctx.body = models
    }

  /**
   * 删除点赞
   * @param {PraiseModel} params 点赞模型
   */
  @post('/DeletePraise')
  async DeletePraise(ctx: Context) {

      let models = await DeletePraise((<PraiseModel>ctx.request.body))
      ctx.body = models
  }

  /**
   * 查询点赞
   * @param {PraiseModel} params 点赞模型
   */
  @post('/GetIsPraise')
  async GetIsPraise(ctx: Context) {

      let models = await GetIsPraise((<PraiseModel>ctx.request.body))
      ctx.body = models
  }

  /**
   * 添加浏览量
   * @param {BrowseModel} params 浏览模型
   */
  @post('/AddBrowse')
  async AddBrowse(ctx: Context) {

      let models = await AddBrowse((<BrowseModel>ctx.request.body))
      ctx.body = models
  }
}
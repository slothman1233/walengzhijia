

//managelepackproduct


import { Context } from 'koa'
import { get, post } from '../../../common/decorator/httpMethod'
import { DelNewsTop, GetNewsPagesByCompanyIdRm, SetNewsTop } from '../../../controller/ManageLepackNews.controller'
import { NewsTopModel } from '../../../model/news/news'
import { GetNewsByNewsIdModel } from '../../../services/ManageLepackNews.services'
export default class ManageLepackNewsapi {
  /**
   * 通过产品ID获取具体的新闻内容
   * @param {number} companyId 公司id
   * @param {publishNewsTypeEnums} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
   * @param {number} pageIndex 页码
   * @param {boolean} isReputation 是否获取口碑新闻
   */
  @get('/GetNewsPagesByCompanyId')
    async GetNewsPagesByCompanyId(ctx: Context) {
        let models = await GetNewsPagesByCompanyIdRm((<GetNewsByNewsIdModel>ctx.query))
        ctx.body = models
    }

  /**
* 新闻置顶操作
* NewsTopModel
*/
  @post('/SetNewsTop')
  async SetNewsTop(ctx: Context) {
      let models = await SetNewsTop((<NewsTopModel>ctx.request.body))
      ctx.body = models
  }

  /**
  * 取消置顶操作
 * NewsTopModel
  */
  @post('/DelNewsTop')
  async DelNewsTop(ctx: Context) {
      let models = await DelNewsTop((<NewsTopModel>ctx.request.body))
      ctx.body = models
  }


}


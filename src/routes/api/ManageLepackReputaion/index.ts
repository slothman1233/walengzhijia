import { Context } from 'koa'
import { get, post } from '../../../common/decorator/httpMethod'
import { DeleteReputation, GetReputationTypeByIdRm, GetReuputationPagedByUserRm } from '../../../controller/ManageLepackReputaion.controller'
import { ReputationDelModel } from '../../../model/reputation/reputation'
import { PagedByUserModel, productTypeIdModel } from '../../../services/ManageLepackReputaion.services'
export default class ManageLepackReputaionapi {
  /**
   * 根据产品类型获得口碑评分项内容
   * productTypeIdModel
   */
  @get('/GetReputationTypeById')
    async GetReputationTypeById(ctx: Context) {

        let models = await GetReputationTypeByIdRm((<productTypeIdModel>ctx.query))
        ctx.body = models
    }

  /**
   * 根据用户获取其发表的所有口碑信息（分页）
   * PagedByUserModel
   */
  @get('/GetReuputationPagedByUser')
  async GetReuputationPagedByUser(ctx: Context) {

      let models = await GetReuputationPagedByUserRm((<PagedByUserModel>ctx.query))
      ctx.body = models
  }

  /**
  * 删除口碑
 * ReputationDelModel
  */
  @post('/DeleteReputation')
  async DeleteReputation(ctx: Context) {
      let models = await DeleteReputation((<ReputationDelModel>ctx.request.body))
      ctx.body = models
  }
}


import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'
import { GetReputationTypeByIdRm } from '../../../controller/ManageLepackReputaion.controller'
import { productTypeIdModel } from '../../../services/ManageLepackReputaion.services'
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
}


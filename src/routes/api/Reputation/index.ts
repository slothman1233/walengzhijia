

import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'
import { GetHighQualityReputationRm, GetReputationByCompanyFilterRm, GetReputationByCompanyRm, GetReputationByProductIdRm } from '../../../controller/Reputation.controller'

export default class Index {
  /**
   * 获得优质口碑，随机的bodyModel模型返回
   * @param {string|number} id 行业标识ID
   */
  @get('/GetHighQualityReputation')
    async GetHighQualityReputation(ctx: Context) {
        let { pageIndex = 1 } = ctx.query

        let models = await GetHighQualityReputationRm(pageIndex)
        ctx.body = models

    }
  /**
   * 根据公司获得该公司对应的口碑的bodyModel模型返回
   * @param {number} companyId 品牌商id
   */
  @get('/GetReputationByCompany')
  async GetReputationByCompany(ctx: Context) {
      let { companyId } = ctx.query
      if (!companyId) { throw (`companyId不能为空`) }
      let models = await GetReputationByCompanyRm(companyId)
      ctx.body = models

  }

  /**
   * 根据产品获得该产品下面对应的口碑信息的bodyModel模型返回
   */
  @get('/GetReputationByProductId')
  async GetReputationByProductId(ctx: Context) {
      let { productId, timeTicks, pageSize, reputationType } = ctx.query
      let models = await GetReputationByProductIdRm(productId, timeTicks, pageSize, reputationType)
      ctx.body = models

  }

  /**
   * 根据公司获得该公司对应的口碑的bodyModel模型返回
   */
  @get('/GetReputationByCompanyFilter')
  async GetReputationByCompanyFilter(ctx: Context) {
      let { companyId, pageIndex, pageSize, reputationType } = ctx.query
      let models = await GetReputationByCompanyFilterRm(companyId, pageIndex, pageSize, reputationType)
      ctx.body = models

  }


  


}















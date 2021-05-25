





//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'
import { GetHighQualityReputationRm, GetReputationByCompanyRm, GetReputationByProductIdRm } from '../../../controller/Reputation.controller'

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





}















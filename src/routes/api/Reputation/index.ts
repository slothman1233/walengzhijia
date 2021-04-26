





//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'
import { GetHighQualityReputationRm } from '../../../controller/Reputation.controller'

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


}















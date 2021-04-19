

//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'

export default class Index {
  /**
   * 根据产品行业标识ID获得该行业下面所有的产品分类信息
   * @param {string|number} id 行业标识ID
   */
  @get('/GetProductIndustry')
    async GetProductIndustry(ctx: Context) {
        let { industry } = ctx.query

        if (!industry) {
            ctx.body = new ErrorModel({})

        } else {
            let models = await GetProductIndustryByIndustryRm(industry)
            ctx.body = models
        }

    }

  /**
  * 通过产品分类ID查找该分类下面的标签信息
  * @param {string|number} productType 产品分类ID
  */
  @get('/GetProductType')
  async GetProductType(ctx: Context) {
      let { productType } = ctx.query
      debugger
      console.log(productType)

      if (!productType) { 
          ctx.body = new ErrorModel({})

      } else {
          let models = await GetProductTypeByProductTypeRm(productType)
          ctx.body = models
      }

  }

}


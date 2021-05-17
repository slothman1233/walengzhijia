import { Context } from 'koa'
import { post } from '../../../common/decorator/httpMethod'
import { AddCompanySaler, DeleteCompanySaler, UpdateCompanySaler } from '../../../controller/ManageLepackCompany.controller'
import { CompanyProductSalerModel } from '../../../model/company/resCompany'
export default class ManageLepackCompanyapi {
  /**
   * 添加销售
   * CompanyProductSalerModel
   */
  @post('/AddCompanySaler')
    async AddCompanySaler(ctx: Context) {
        let models = await AddCompanySaler((<CompanyProductSalerModel>ctx.request.body))
        ctx.body = models
    }

  /**
   * 修改销售
   * CompanyProductSalerModel
   */
  @post('/UpdateCompanySaler')
  async UpdateCompanySaler(ctx: Context) {
      let models = await UpdateCompanySaler((<CompanyProductSalerModel>ctx.request.body))
      ctx.body = models
  }

  /**
   * 删除销售
   * CompanyProductSalerModel
   */
  @post('/DeleteCompanySaler')
  async DeleteCompanySaler(ctx: Context) {
      let models = await DeleteCompanySaler((<CompanyProductSalerModel>ctx.request.body))
      ctx.body = models
  }
}

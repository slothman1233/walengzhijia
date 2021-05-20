import { Context } from 'koa'
import { post } from '../../../common/decorator/httpMethod'
import { AddCompanySaler, DeleteCompanySaler, DelProductTop, SetProductTop, UpdateCompanyInfoByItem, UpdateCompanySaler } from '../../../controller/ManageLepackCompany.controller'
import { CompanyProductInfoTopModel, ManageCompanyInfoItemModel } from '../../../model/company/Company'
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

  /**
   * 修改公司信息-单项修改
   * ManageCompanyInfoItemModel
   */
  @post('/UpdateCompanyInfoByItem')
  async UpdateCompanyInfoByItem(ctx: Context) {
      let models = await UpdateCompanyInfoByItem((<ManageCompanyInfoItemModel>ctx.request.body))
      ctx.body = models
  }

  /**
   * 产品置顶操作
   * CompanyProductInfoTopModel
   */
  @post('/SetProductTop')
  async SetProductTop(ctx: Context) {
      let models = await SetProductTop((<CompanyProductInfoTopModel>ctx.request.body))
      ctx.body = models
  }

  /**
   * 取消产品置顶操作
   * CompanyProductInfoTopModel
   */
  @post('/DelProductTop')
  async DelProductTop(ctx: Context) {
      let models = await DelProductTop((<CompanyProductInfoTopModel>ctx.request.body))
      ctx.body = models
  }
}





//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import company from '../../../services/company.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { GetCompanyProductType, GetCompanyProductTypeRm, GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'
import { PostAddCompanyProduct, PostAddCompanyProductAdvisory, UpdateCompanyProduct } from '../../../controller/company.controller'
import { CompanyProductAdvisoryModel, CompanyProductInfoModel } from '../../../model/company/Company'
export default class componentapi {
    /**
     * 添加公司产品
     * CompanyProductInfoModel
     */
    @post('/AddCompanyProduct')
    async GetProductIndustry(ctx: Context) {
        let models = await PostAddCompanyProduct((<CompanyProductInfoModel>ctx.request.body))
        ctx.body = models
    }

    /**
     * 修改公司产品
     * CompanyProductInfoModel
     */
    @post('/UpdateCompanyProduct')
    async UpdateCompanyProduct(ctx: Context) {
        let models = await UpdateCompanyProduct((<CompanyProductInfoModel>ctx.request.body))
        ctx.body = models
    }


    

    /**
    * 添加产品询价信息,调用该接口前先调用SendCode 发送手机号码验证接口 和ValidateCode 验证验证码
    * CompanyProductAdvisoryModel
    */
    @post('/AddCompanyProductAdvisory')
    async AddCompanyProductAdvisory(ctx: Context) {
        let models = await PostAddCompanyProductAdvisory((<CompanyProductAdvisoryModel>ctx.request.body))
        ctx.body = models
    }




}




//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import company from '../../../services/company.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'
import { PostAddCompanyProduct } from '../../../controller/company.controller'
import { CompanyProductInfoModel } from '../../../model/company/Company'
export default class componentapi {
    /**
     * 根据产品行业标识ID获得该行业下面所有的产品分类信息
     * @param {string|number} id 行业标识ID
     */
    @post('/AddCompanyProduct')
    async GetProductIndustry(ctx: Context) {
        console.log(ctx.query)

        let models = await PostAddCompanyProduct((<CompanyProductInfoModel>ctx.query))
        ctx.body = models
    }


}


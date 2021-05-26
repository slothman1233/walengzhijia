

//managelepackproduct


import { Context } from 'koa'
import { test_middleware } from '../../../middleware/test'
import { Controller, get, middlewares, post } from '../../../common/decorator/httpMethod'
import commonService from '../../../services/common/component.services'
import { ComponentModel } from '../../../model/component'
import { ErrorModel, SuccessModel } from '../../../model/resModel'
import { CompanyBrand, GetCompanyBrandRm, GetCompanyProductByTypeIdRm, GetCompanyProductRm, GetCompanyProductTypeRm, GetProductIndustryByIndustryRm, GetProductTypeByProductTypeRm } from '../../../controller/product.controller'
import { ProductByTypeId } from '../../../services/Product.services'

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

        if (!productType) {
            ctx.body = new ErrorModel({})

        } else {
            let models = await GetProductTypeByProductTypeRm(productType)
            ctx.body = models
        }

    }

    /**
       * 根据公司ID获得所有产品信息
       * BycompanyId
       */
    @get('/GetCompanyProduct')
    async GetCompanyProduct(ctx: Context) {
        let { companyId } = ctx.query
        let models = await GetCompanyProductRm({ companyId })

        ctx.body = models
    }


    /**
       * 根据公司ID获得所有产品分类
       * BycompanyId
       */
    @get('/GetCompanyProductType')
    async GetCompanyProductType(ctx: Context) {
        let { companyId } = ctx.query
        let models = await GetCompanyProductTypeRm({ companyId })

        ctx.body = models
    }


    /**
     * 根据公司ID和产品分类获得所有产品信息,需要分页模型接收
     * BycompanyId productTypeId
     */
    @get('/GetCompanyProductByTypeId')
    async GetCompanyProductByTypeId(ctx: Context) {
        let { companyId, productTypeId, pageIndex, pageSize }: ProductByTypeId = ctx.query

        let models = await GetCompanyProductByTypeIdRm({ companyId, productTypeId, pageIndex, pageSize })

        ctx.body = models
    }

    /**
     * 获得企业品牌商模型
     */
    @get('/GetCompanyBrand')
    async GetCompanyBrand(ctx: Context) {
        let models = await GetCompanyBrandRm(<CompanyBrand>ctx.query)
        ctx.body = models
    }




}


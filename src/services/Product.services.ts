import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ComponentModel } from '../model/component'
import { nunRenderMacroString } from '../common/nunjucks'
import { ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductIndexPageModelListReturnModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel } from '../model/resModel'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ResCompanyProductInfoModelListReturnModel, ResproductTypeListModel } from '../model/reputation/resreputation'

export type GetProductIndustryModel = {
    industry: number
}

export type GetProductTypeModel = {
    productType: number
}

export type BycompanyId = {
    companyId: number
}


export type ProductByTypeId = {
    companyId: number
    productTypeId: number
}



class Product {
    // 根据产品行业标识ID获得该行业下面所有的产品分类信息
    //  {industry: id}
    // @CacheInterceptor('Product_GetProductIndustry', CacheTime.Min30)
    async GetProductIndustry(params: GetProductIndustryModel) {
        return await http.get<ResIndustryTypeModelListReturnModel>(`${config.apiPath}api/Product/GetProductIndustry`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 通过产品分类ID查找该分类下面的标签信息等
    // {productType : 1}
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetProductType(params: GetProductTypeModel) {
        return await http.get<ResProductTypeModelListReturnModel>(`${config.apiPath}api/Product/GetProductType`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得首页板块分类公司信息
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetIndexPageProduct() {
        return await http.get<ResProductIndexPageModelListReturnModel>(`${config.apiPath}api/Product/GetIndexPageProduct`, { headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司ID获得所有产品信息
    // BycompanyId
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProduct(params: BycompanyId) {
        return await http.get<ResCompanyProductInfoModelListReturnModel>(`${config.apiPath}api/Product/GetCompanyProduct`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司ID获得所有产品分类
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProductType(params: BycompanyId) {
        return await http.get<ResproductTypeListModel>(`${config.apiPath}api/Product/GetCompanyProductType`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司ID和产品分类获得所有产品信息
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProductByTypeId(params: ProductByTypeId) {
        return await http.get<ResCompanyProductInfoModelListReturnModel>(`${config.apiPath}api/Product/GetCompanyProductByTypeId`, { params, headers: { 'Content-Type': 'application/json' } })
    }




}


let Products = new Product()

export default Products
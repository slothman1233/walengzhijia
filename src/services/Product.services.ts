import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime, ProductSortTypeEnums } from '../enums/enums'
import { ComponentModel } from '../model/component'
import { nunRenderMacroString } from '../common/nunjucks'
import { ResIndustryTypeModel, ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductIndexPageModel, ResProductIndexPageModelListReturnModel, ResProductTypeModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel } from '../model/resModel'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ResCompanyProductInfoModel, ResCompanyProductInfoModelListReturnModel, ResCompanyProductInfoModelPagedModel, ResproductTypeListModel } from '../model/reputation/resreputation'
import { ResCompanyBrandModelPagedModel, ResCompanyProductInfoModelReturnModel, ResCompanySimilarProductModel } from '../model/company/resCompany'
import { productTypeListModel } from '../model/reputation/reputation'

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
    pageIndex: number
    pageSize: number
}
export type CompanyProductByIdModel = {
    productId: number
}

/**
 * 筛选获得品牌商数据接口模型
 * @param {number} productType 二级分类
 * @param {number} classifyType 三级分类
 * @param {number} pageIndex 
 * @param {number} pageSize
 * @param {ProductSortTypeEnums} queryType 排序类型
 */
export type getProductModel = {
    productType: number,
    classifyType: number,
    pageIndex?: number,
    pageSize?: number,
    queryType: ProductSortTypeEnums
}


class Product {
    // 根据产品行业标识ID获得该行业下面所有的产品分类信息
    //  {industry: id}
    // @CacheInterceptor('Product_GetProductIndustry', CacheTime.Min30)
    async GetProductIndustry(params: GetProductIndustryModel) {
        return await http.get<ResIndustryTypeModel[]>(`${config.apiPath}api/Product/GetProductIndustry`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 通过产品分类ID查找该分类下面的标签信息等
    // {productType : 1}
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetProductType(params: GetProductTypeModel) {
        return await http.get<ResProductTypeModel[]>(`${config.apiPath}api/Product/GetProductType`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得首页板块分类公司信息
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetIndexPageProduct() {
        return await http.get<ResProductIndexPageModel[]>(`${config.apiPath}api/Product/GetIndexPageProduct`, { headers: { 'Content-Type': 'application/json' } })
    }

    // 获得首页热门品牌公司信息
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetHotCompanyIndexPageProduct() {
        return await http.get<ResProductIndexPageModel[]>(`${config.apiPath}api/Product/GetHotCompanyIndexPageProduct`, { headers: { 'Content-Type': 'application/json' } })
    }

    

    // 根据公司ID获得所有产品信息
    // BycompanyId
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProduct(params: BycompanyId) {
        return await http.get<ResCompanyProductInfoModel[]>(`${config.apiPath}api/Product/GetCompanyProduct`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司ID获得所有产品分类
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProductType(params: BycompanyId) {
        return await http.get<productTypeListModel[]>(`${config.apiPath}api/Product/GetCompanyProductType`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司ID和产品分类获得所有产品信息,需要分页模型接收
    // ProductByTypeId
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProductByTypeId(params: ProductByTypeId) {
        return await http.get<ResCompanyProductInfoModelPagedModel>(`${config.apiPath}api/Product/GetCompanyProductByTypeId`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据产品ID获得产品信息
    // CompanyProductByIdModel
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyProductById(params: CompanyProductByIdModel) {
        return await http.get<ResCompanyProductInfoModel>(`${config.apiPath}api/Product/GetCompanyProductById`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据产品ID获得该产品在其公司的同一个分类下面的其它产品有哪些
    // CompanyProductByIdModel
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanySimilarProductById(params: CompanyProductByIdModel) {
        return await http.get<ResCompanySimilarProductModel[]>(`${config.apiPath}api/Product/GetCompanySimilarProductById`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 筛选获得品牌商数据接口
    // getProductModel
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async GetCompanyBrand(params: getProductModel) {
        return await http.post<ResCompanyBrandModelPagedModel>(`${config.apiPath}api/Product/GetCompanyBrand`, params, { headers: { 'Content-Type': 'application/json' } })
    }

   
}


let Products = new Product()

export default Products
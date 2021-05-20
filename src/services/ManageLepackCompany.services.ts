import config from '../common/config/env'
import http from '../common/utils/net'
import { CompanyProductInfoTopModel, ManageCompanyInfoItemModel } from '../model/company/Company'
import { CompanyProductSalerModel } from '../model/company/resCompany'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ReputationModel } from '../model/reputation/reputation'
import { ResReputationTypeModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'

export type productTypeIdModel = {
    productTypeId: number
}

class ManageLepackCompany {
    // 添加销售
    // CompanyProductSalerModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async AddCompanySaler(params: CompanyProductSalerModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackCompany/AddCompanySaler`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 修改销售
    // CompanyProductSalerModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async UpdateCompanySaler(params: CompanyProductSalerModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackCompany/UpdateCompanySaler`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 删除销售
    // CompanyProductSalerModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async DeleteCompanySaler(params: CompanyProductSalerModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackCompany/DeleteCompanySaler`, params, { headers: { 'Content-Type': 'application/json' } })
    }


    // 修改公司信息-单项修改
    // ManageCompanyInfoItemModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async UpdateCompanyInfoByItem(params: ManageCompanyInfoItemModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackCompany/UpdateCompanyInfoByItem`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 产品置顶操作
    // CompanyProductInfoTopModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async SetProductTop(params: CompanyProductInfoTopModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackCompany/SetProductTop`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 取消产品置顶操作
    // CompanyProductInfoTopModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async DelProductTop(params: CompanyProductInfoTopModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackCompany/DelProductTop`, params, { headers: { 'Content-Type': 'application/json' } })
    }
}






let ManageLepackCompanys = new ManageLepackCompany()

export default ManageLepackCompanys
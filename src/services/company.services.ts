import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ResCompanyHotModelListReturnModel, ResCompanyInfoModelReturnModel, ResCompanyProductAdvisoryModelListReturnModel, ResCompanyProductAdvisoryModelReturnModel, ResCompanySalerModelListReturnModel, ResCompanyInfoModelListReturnModel, ResCompanyBrandModelPagedModelReturnModel, ResCompanyBrandModelPagedModel, ResCompanyInfoModel, ResCompanyProductAdvisoryModel, ResCompanySalerModel, ResCompanyHotModel } from '../model/company/resCompany'
import { bodyModel } from '../model/resModel'
import { CompanyProductAdvisoryModel, CompanyProductInfoModel } from '../model/company/Company'


export type GetCompanyInfoByUserModel = { userId: number }

export type ByCompanyIdModel = { companyId: number }

export type ByProductId = { productId: number }

export type ByAdvisoryId = { advisoryId: number }

export type SalerById = { salerId: number }


class company {
    // 获得用户绑定的公司信息，如果用户没有绑定公司则无法查找到内容
    // {userId : 100000}
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async GetCompanyInfoByUser(params: GetCompanyInfoByUserModel) {
        return await http.get<ResCompanyInfoModel>(`${config.apiPath}api/Company/GetCompanyInfoByUser`, { params, headers: { 'Content-Type': 'application/json' } })
    }



    // 根据公司ID获得公司信息
    //@CacheInterceptor('company_GetCompanyHot', CacheTime.Min3)
    async GetCompanyInfoById(params: ByCompanyIdModel) {
        return await http.get<ResCompanyInfoModel>(`${config.apiPath}api/Company/GetCompanyInfoById`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
    //@CacheInterceptor('company_GetCompanyHot', CacheTime.Min3)
    async GetCompanyHot() {
        return await http.get<ResCompanyHotModel[]>(`${config.apiPath}api/Company/GetCompanyHot`, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加公司产品
    // CompanyProductInfoModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async AddCompanyProduct(params: CompanyProductInfoModel) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/Company/AddCompanyProduct`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 修改公司产品
    // CompanyProductInfoModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async UpdateCompanyProduct(params: CompanyProductInfoModel) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/Company/UpdateCompanyProduct`, params, { headers: { 'Content-Type': 'application/json' } })
    }


    


    // 通过公司ID获得该公司的销售信息
    // GetSalersByCompanyIdModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetSalersByCompanyId(params: ByCompanyIdModel) {
        return await http.get<ResCompanySalerModel[]>(`${config.apiPath}api/Company/GetSalersByCompanyId`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 添加产品询价信息,调用该接口前先调用SendCode 发送手机号码验证接口 和ValidateCode 验证验证码
    // CompanyProductAdvisoryModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async AddCompanyProductAdvisory(params: CompanyProductAdvisoryModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/Company/AddCompanyProductAdvisory`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 修改产品询价信息
    // CompanyProductAdvisoryModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async UpdateCompanyProductAdvisory(params: CompanyProductAdvisoryModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/Company/UpdateCompanyProductAdvisory`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 删除产品询价信息
    // CompanyProductAdvisoryModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async DeleteCompanyProductAdvisory(params: CompanyProductAdvisoryModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/Company/DeleteCompanyProductAdvisory`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司ID获得询价信息
    // GetSalersByCompanyIdModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetCompanyAdvisoryByCompanyId(params: ByCompanyIdModel) {
        return await http.get<ResCompanyProductAdvisoryModel[]>(`${config.apiPath}api/Company/GetCompanyAdvisoryByCompanyId`, { params, headers: { 'Content-Type': 'application/json' } })
    }


    // 根据产品ID获得询价信息
    // GetSalersByCompanyIdModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetCompanyAdvisoryByProductId(params: ByProductId) {
        return await http.get<ResCompanyProductAdvisoryModel[]>(`${config.apiPath}api/Company/GetCompanyAdvisoryByProductId`, { params, headers: { 'Content-Type': 'application/json' } })
    }


    // 根据询价ID获得具体单挑内容
    // GetSalersByCompanyIdModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetCompanyAdvisoryById(params: ByAdvisoryId) {
        return await http.get<ResCompanyProductAdvisoryModel[]>(`${config.apiPath}api/Company/GetCompanyAdvisoryById`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得所有公司信息
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetCompnays() {
        return await http.get<ResCompanyInfoModel[]>(`${config.apiPath}api/Company/GetCompnays`, { headers: { 'Content-Type': 'application/json' } })
    }


    // 根据销售id获取销售信息
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async GetCompanySalerById(params: SalerById) {
        return await http.get<ResCompanySalerModel>(`${config.apiPath}api/Company/GetCompanySalerById`, { params, headers: { 'Content-Type': 'application/json' } })
    }


}
let companys = new company()

export default companys


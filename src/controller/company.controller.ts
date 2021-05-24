


import { JSONParse } from '../common/utils/ModelHelper'
import { CompanyProductAdvisoryModel, CompanyProductInfoModel } from '../model/company/Company'
import { ResCompanyBrandModelPagedModel, ResCompanyBrandModelPagedModelReturnModel, ResCompanyHotModel, ResCompanyHotModelListReturnModel, ResCompanyInfoModel, ResCompanyInfoModelListReturnModel, ResCompanyInfoModelReturnModel, ResCompanyProductAdvisoryModel, ResCompanyProductAdvisoryModelListReturnModel, ResCompanyProductAdvisoryModelReturnModel, ResCompanySalerModel, ResCompanySalerModelListReturnModel, ResCompanySalerModelReturnModel } from '../model/company/resCompany'
import { ResIndustryTypeModel, ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductTypeModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel, ErrorModel } from '../model/resModel'
import companys, { ByAdvisoryId, ByCompanyIdModel, ByProductId, GetCompanyInfoByUserModel, SalerById } from '../services/company.services'
/**
 * 首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
 */
export async function GetCompanyHot(): Promise<ResCompanyHotModel[] | null> {
    let rm = await GetCompanyHotRm()
    let models = JSONParse<ResCompanyHotModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
 */
export async function GetCompanyHotRm(): Promise<ResCompanyHotModelListReturnModel> {
    return await companys.GetCompanyHot().catch(data => data)
}

/**
 * 获得用户绑定的公司信息，如果用户没有绑定公司则无法查找到内容
 * {userId : 100000}
 */
export async function GetCompanyInfoByUser(params: GetCompanyInfoByUserModel): Promise<ResCompanyInfoModel | null> {
    let rm = await GetCompanyInfoByUserRm(params)
    let models = JSONParse<ResCompanyInfoModel | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 获得用户绑定的公司信息，如果用户没有绑定公司则无法查找到内容
 * {userId : 100000}
 */
export async function GetCompanyInfoByUserRm(params: GetCompanyInfoByUserModel): Promise<ResCompanyInfoModelReturnModel> {
    return await companys.GetCompanyInfoByUser(params).catch(data => data)
}

/**
 * 根据公司ID获得公司信息
 * ByCompanyIdModel
 */
export async function GetCompanyInfoById(params: ByCompanyIdModel): Promise<ResCompanyInfoModel | null> {
    try {
        let rm = await GetCompanyInfoByIdRm(params)
        let models = JSONParse<ResCompanyInfoModel | null>(rm.code, rm.bodyMessage)
        return models
    } catch (e) {
        return null
    }
}

/**
 * 根据公司ID获得公司信息
 * ByCompanyIdModel
 */
export async function GetCompanyInfoByIdRm(params: ByCompanyIdModel): Promise<ResCompanyInfoModelReturnModel> {
    return await companys.GetCompanyInfoById(params).catch(data => data)
}

/**
 * 通过公司ID获得该公司的销售信息
 * ByCompanyIdModel
 */
export async function GetSalersByCompanyId(params: ByCompanyIdModel): Promise<ResCompanySalerModel[] | null> {
    let rm = await GetSalersByCompanyIdRm(params)
    let models = JSONParse<ResCompanySalerModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 通过公司ID获得该公司的销售信息
 * ByCompanyIdModel
 */
export async function GetSalersByCompanyIdRm(params: ByCompanyIdModel): Promise<ResCompanySalerModelListReturnModel> {
    return await companys.GetSalersByCompanyId(params).catch(data => data)
}

/**
 * 根据公司ID获得询价信息
 * ByCompanyIdModel
 */
export async function GetCompanyAdvisoryByCompanyId(params: ByCompanyIdModel): Promise<ResCompanyProductAdvisoryModel[] | null> {
    let rm = await GetCompanyAdvisoryByCompanyIdRm(params)
    let models = JSONParse<ResCompanyProductAdvisoryModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 根据公司ID获得询价信息
 * ByCompanyIdModel
 */
export async function GetCompanyAdvisoryByCompanyIdRm(params: ByCompanyIdModel): Promise<ResCompanyProductAdvisoryModelListReturnModel> {
    return await companys.GetCompanyAdvisoryByCompanyId(params).catch(data => data)
}

/**
 * 根据产品ID获得询价信息
 * ByProductId
 */
export async function GetCompanyAdvisoryByProductId(params: ByProductId): Promise<ResCompanyProductAdvisoryModel[] | null> {
    let rm = await GetCompanyAdvisoryByProductIdRm(params)
    let models = JSONParse<ResCompanyProductAdvisoryModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 根据产品ID获得询价信息
 * ByProductId
 */
export async function GetCompanyAdvisoryByProductIdRm(params: ByProductId): Promise<ResCompanyProductAdvisoryModelListReturnModel> {
    return await companys.GetCompanyAdvisoryByProductId(params).catch(data => data)
}

/**
 * 根据询价ID获得具体单挑内容
 * ByAdvisoryId
 */
export async function GetCompanyAdvisoryById(params: ByAdvisoryId): Promise<ResCompanyProductAdvisoryModel[] | null> {
    let rm = await GetCompanyAdvisoryByIdRm(params)
    let models = JSONParse<ResCompanyProductAdvisoryModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 根据询价ID获得具体单挑内容
 * ByAdvisoryId
 */
export async function GetCompanyAdvisoryByIdRm(params: ByAdvisoryId): Promise<ResCompanyProductAdvisoryModelReturnModel> {
    return await companys.GetCompanyAdvisoryById(params).catch(data => data)
}

/**
 * 获取所有品牌商
 */
export async function GetCompnays(): Promise<ResCompanyInfoModel[] | null> {
    let rm = await GetCompnaysRm()
    let models = JSONParse<ResCompanyInfoModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 获取所有品牌商
 */
export async function GetCompnaysRm(): Promise<ResCompanyInfoModelListReturnModel> {
    return await companys.GetCompnays().catch(data => data)
}




/**
 * 添加公司产品
 * CompanyProductInfoModel
 */
export async function PostAddCompanyProduct(params: CompanyProductInfoModel): Promise<bodyModel<string>> {
    return await companys.AddCompanyProduct(params).catch(data => data)
}

/**
 * 修改公司产品
 * CompanyProductInfoModel
 */
export async function UpdateCompanyProduct(params: CompanyProductInfoModel): Promise<bodyModel<string>> {
    return await companys.UpdateCompanyProduct(params).catch(data => data)
}


/**
 * 添加产品询价信息,调用该接口前先调用SendCode 发送手机号码验证接口 和ValidateCode 验证验证码
 * CompanyProductAdvisoryModel
 */
export async function PostAddCompanyProductAdvisory(params: CompanyProductAdvisoryModel): Promise<bodyModel<string>> {
    return await companys.AddCompanyProductAdvisory(params).catch(data => data)
}

/**
 * 修改产品询价信息
 * CompanyProductAdvisoryModel
 */
export async function PostUpdateCompanyProductAdvisory(params: CompanyProductAdvisoryModel): Promise<bodyModel<string>> {
    return await companys.UpdateCompanyProductAdvisory(params).catch(data => data)
}

/**
 * 删除产品询价信息
 * CompanyProductAdvisoryModel
 */
export async function PostDeleteCompanyProductAdvisory(params: CompanyProductAdvisoryModel): Promise<bodyModel<string>> {
    return await companys.DeleteCompanyProductAdvisory(params).catch(data => data)
}



/**
 * 根据销售id获取销售信息
 * SalerById
 */
export async function GetCompanySalerById(params: SalerById): Promise<ResCompanySalerModel | null> {
    let rm = await GetCompanySalerByIdRm(params)
    let models = JSONParse<ResCompanySalerModel | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 根据销售id获取销售信息
 * SalerById
 */
export async function GetCompanySalerByIdRm(params: SalerById): Promise<ResCompanySalerModelReturnModel> {
    return await companys.GetCompanySalerById(params).catch(data => data)
}



import { JSONParse } from '../common/utils/ModelHelper'
import { ResCompanyHotModel, ResCompanyHotModelListReturnModel } from '../model/company/resCompany'
import { ResIndustryTypeModel, ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductTypeModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel, ErrorModel } from '../model/resModel'
import companys from '../services/company.services'

/**
 * 首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
 */
export async function GetCompanyHot(): Promise<ResCompanyHotModel[] | null> {
    let rm = await GetCompanyHotRm()
    let models = JSONParse<ResCompanyHotModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

//


/**
 * 首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
 */
export async function GetCompanyHotRm(): Promise<ResCompanyHotModelListReturnModel> {
    return await companys.GetCompanyHot().catch(data => data)
}

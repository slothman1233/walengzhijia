import { CompanyProductInfoTopModel, ManageCompanyInfoItemModel } from '../model/company/Company'
import { CompanyProductSalerModel } from '../model/company/resCompany'
import { bodyModel } from '../model/resModel'
import ManageLepackCompanys from '../services/ManageLepackCompany.services'

/**
 * 添加销售
 * CompanyProductSalerModel
 */
export async function AddCompanySaler(params: CompanyProductSalerModel): Promise<bodyModel<boolean>> {
    return await ManageLepackCompanys.AddCompanySaler(params).catch(data => data)
}

/**
 * 修改销售
 * CompanyProductSalerModel
 */
export async function UpdateCompanySaler(params: CompanyProductSalerModel): Promise<bodyModel<boolean>> {
    return await ManageLepackCompanys.UpdateCompanySaler(params).catch(data => data)
}


/**
 * 删除销售
 * CompanyProductSalerModel
 */
export async function DeleteCompanySaler(params: CompanyProductSalerModel): Promise<bodyModel<boolean>> {
    return await ManageLepackCompanys.DeleteCompanySaler(params).catch(data => data)
}

/**
 * 修改公司信息-单项修改
 * ManageCompanyInfoItemModel
 */
export async function UpdateCompanyInfoByItem(params: ManageCompanyInfoItemModel): Promise<bodyModel<boolean>> {
    return await ManageLepackCompanys.UpdateCompanyInfoByItem(params).catch(data => data)
}


/**
 * 产品置顶操作
 * CompanyProductInfoTopModel
 */
export async function SetProductTop(params: CompanyProductInfoTopModel): Promise<bodyModel<boolean>> {
    return await ManageLepackCompanys.SetProductTop(params).catch(data => data)
}


/**
 * 取消产品置顶操作
 * CompanyProductInfoTopModel
 */
export async function DelProductTop(params: CompanyProductInfoTopModel): Promise<bodyModel<boolean>> {
    return await ManageLepackCompanys.DelProductTop(params).catch(data => data)
}


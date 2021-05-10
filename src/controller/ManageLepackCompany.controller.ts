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



import http from './http'

import { bodyModel } from '../../../../model/resModel'
import { CompanyProductSalerModel } from '../../../../model/company/resCompany'
import { ManageCompanyInfoItemModel } from '../../../../model/company/Company'



/**
 * 添加销售
 * CompanyProductSalerModel
 */
export const AddCompanySaler = async (options: CompanyProductSalerModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackCompany/AddCompanySaler`, options)


/**
 * 修改销售
 * CompanyProductSalerModel
 */
export const UpdateCompanySaler = async (options: CompanyProductSalerModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackCompany/UpdateCompanySaler`, options)


/**
 * 删除销售
 * CompanyProductSalerModel
 */
export const DeleteCompanySaler = async (options: CompanyProductSalerModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackCompany/DeleteCompanySaler`, options)


/**
 * 修改公司信息-单项修改
 * ManageCompanyInfoItemModel
 */
export const UpdateCompanyInfoByItem = async (options: ManageCompanyInfoItemModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackCompany/UpdateCompanyInfoByItem`, options)


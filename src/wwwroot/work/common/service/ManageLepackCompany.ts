

import http from './http'

import { bodyModel } from '../../../../model/resModel'
import { CompanyProductSalerModel } from '../../../../model/company/resCompany'
import { CompanyProductInfoTopModel, ManageCompanyInfoItemModel } from '../../../../model/company/Company'



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


/**
 * 产品置顶操作
 * CompanyProductInfoTopModel
 */
export const SetProductTop = async (options: CompanyProductInfoTopModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackCompany/SetProductTop`, options)


/**
 * 取消产品置顶操作
 * CompanyProductInfoTopModel
 */
export const DelProductTop = async (options: CompanyProductInfoTopModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackCompany/DelProductTop`, options)


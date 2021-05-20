

import http from './http'

import env from '../config/env'
import { LepackUserLoginModel } from '../../../../model/user/User'
import { CompanyProductAdvisoryModel, CompanyProductInfoModel } from '../../../../model/company/Company'
import { bodyModel } from '../../../../model/resModel'
import { BycompanyId } from '../../../../services/Product.services'
import { ResproductTypeListModel } from '../../../../model/reputation/resreputation'



/**
 * 添加公司产品
 * CompanyProductInfoModel
 */
export const AddCompanyProduct = async (options: CompanyProductInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/component/AddCompanyProduct`, options)


/**
 * 修改公司产品
 * CompanyProductInfoModel
 */
export const UpdateCompanyProduct = async (options: CompanyProductInfoModel): Promise<bodyModel<string>> => await http.post<any>(`/api/component/UpdateCompanyProduct`, options)


/**
 * 添加产品询价信息,调用该接口前先调用SendCode 发送手机号码验证接口 和ValidateCode 验证验证码
 * CompanyProductInfoModel
 */
export const AddCompanyProductAdvisory = async (options: CompanyProductAdvisoryModel): Promise<bodyModel<string>> => await http.post<any>(`/api/component/AddCompanyProductAdvisory`, options)




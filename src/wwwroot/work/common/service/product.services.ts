import { ResIndustryTypeModel } from '../../../../model/industry/resIndustryType'
import { ResProductTypeModel } from '../../../../model/product/resproductType'
import config from '../config/env'
import http from './http'



/**
 * 根据产品行业标识ID获得该行业下面所有的产品分类信息
 * {industry: id}
 */
export const GetProductIndustry = async (industry: string | number) => await http.get<ResIndustryTypeModel[]>(`/api/product/GetProductIndustry`, { params: { industry } })

/**
 * 通过产品分类ID查找该分类下面的标签信息
 * {productType: id}
 */
export const GetProductType = async (productType: string | number) => await http.get<ResProductTypeModel[]>(`/api/product/GetProductType`, { params: {productType}})


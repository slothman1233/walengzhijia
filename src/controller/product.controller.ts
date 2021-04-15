import { JSONParse } from '../common/utils/ModelHelper'
import { ResIndustryTypeModel, ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductTypeModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel, ErrorModel } from '../model/resModel'

import Products, { GetProductIndustryModel, GetProductTypeModel } from '../services/Product.services'

/**
 * 根据产品行业标识ID获得该行业下面所有的产品分类信息
 * @param {string|number} id 行业标识ID
 */
export async function GetProductIndustryByIndustry(id: number = 1): Promise<ResIndustryTypeModel[] | null> {
    let rm = await GetProductIndustryByIndustryRm(id)
    let models = JSONParse<ResIndustryTypeModel[] | null>(rm.code, rm.bodyMessage)
    return models
}


/**
* 通过产品分类ID查找该分类下面的标签信息
* @param {string|number} productType 产品分类ID
*/
export async function GetProductTypeByProductType(productType: number): Promise<ResProductTypeModel[] | null> {
    let rm = await GetProductTypeByProductTypeRm(productType)
    let models = JSONParse<ResProductTypeModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 根据产品行业标识ID获得该行业下面所有的产品分类信息
 * @param {string|number} id 行业标识ID
 */
export async function GetProductIndustryByIndustryRm(id: number): Promise<ResIndustryTypeModelListReturnModel> {
    let params: GetProductIndustryModel
    params = {
        'industry': id,
    }
    return await Products.GetProductIndustry(params).catch(data => data)
}


/**
* 通过产品分类ID查找该分类下面的标签信息
* @param {string|number} productType 产品分类ID
*/
export async function GetProductTypeByProductTypeRm(productType: number): Promise<ResProductTypeModelListReturnModel> {
    let params: GetProductTypeModel
    params = {
        'productType': productType,
    }
    return await Products.GetProductType(params).catch(data => data)
}
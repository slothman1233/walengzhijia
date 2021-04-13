import { JSONParse } from '../common/utils/ModelHelper'
import { bodyModel, ErrorModel } from '../model/resModel'

import managelepackproduct from '../services/managelepackproduct.services'

/**
 * 根据产品行业标识ID获得该行业下面所有的产品分类信息
 * @param {string|number} id 行业标识ID
 */
export async function GetProductIndustryByIndustry(id: string | number = 1) {
    let rm = await GetProductIndustryByIndustryRm(id)
    let models = JSONParse<bodyModel<any>>(rm.code, rm.bodyMessage)
    return models !== null ? models : new ErrorModel<any>({})
}


/**
* 通过产品分类ID查找该分类下面的标签信息
* @param {string|number} productType 产品分类ID
*/
export async function GetProductTypeByProductType(productType: string | number) {
    let rm = await GetProductTypeByProductTypeRm(productType)
    let models = JSONParse<bodyModel<any>>(rm.code, rm.bodyMessage)
    return models !== null ? models : new ErrorModel<any>({})
}

//ProductTypeModel

/**
 * 根据产品行业标识ID获得该行业下面所有的产品分类信息
 * @param {string|number} id 行业标识ID
 */
export async function GetProductIndustryByIndustryRm(id: string | number) {
    let params: { [index: string]: any }
    params = {
        'industry': id,
    }
    return await managelepackproduct.GetProductIndustry(params).catch(data => data)
}


/**
* 通过产品分类ID查找该分类下面的标签信息
* @param {string|number} productType 产品分类ID
*/
export async function GetProductTypeByProductTypeRm(productType: string | number) {
    let params: { [index: string]: any }
    params = {
        'productType': productType,
    }
    return await managelepackproduct.GetProductType(params).catch(data => data)
}
import { JSONParse } from '../common/utils/ModelHelper'
import { ProductSortTypeEnums } from '../enums/enums'
import { ResCompanyBrandModelPagedModel, ResCompanyBrandModelPagedModelReturnModel, ResCompanyProductInfoModelReturnModel, ResCompanySimilarProductModel, ResCompanySimilarProductModelListReturnModel } from '../model/company/resCompany'
import { ResIndustryTypeModel, ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResCompanyInfoIndexPageModel, ResProductIndexPageModel, ResProductIndexPageModelListReturnModel, ResProductTypeModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { productTypeListModel } from '../model/reputation/reputation'
import { ResCompanyProductInfoModel, ResCompanyProductInfoModelListReturnModel, ResCompanyProductInfoModelPagedModel, ResCompanyProductInfoModelPagedModelReturnModel, ResproductTypeListModel } from '../model/reputation/resreputation'
import { bodyModel, ErrorModel } from '../model/resModel'

export type CompanyBrand = {
    productType: number,
    classifyType: number,
    pageIndex: number,
    pageSize: number,
    queryType: ProductSortTypeEnums
}
import Products, { BycompanyId, CompanyProductByIdModel, GetProductIndustryModel, GetProductTypeModel, ProductByTypeId } from '../services/Product.services'

/**
 * 根据产品行业标识ID获得该行业下面所有的产品分类信息
 * @param {string|number} id 行业标识ID
 */
export async function GetProductIndustryByIndustry(id: number = 1): Promise<ResIndustryTypeModel[] | null> {
    let rm = await GetProductIndustryByIndustryRm(id)
    let models = JSONParse<ResIndustryTypeModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
* 通过产品分类ID查找该分类下面的标签信息
* @param {string|number} productType 产品分类ID
*/
export async function GetProductTypeByProductType(productType: number): Promise<ResProductTypeModel[] | null> {
    let rm = await GetProductTypeByProductTypeRm(productType)
    let models = JSONParse<ResProductTypeModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 获得首页板块分类公司信息
*/
export async function GetIndexPageProduct(): Promise<ResProductIndexPageModel[] | null> {
    let rm = await GetIndexPageProductRm()
    let models = JSONParse<ResProductIndexPageModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
* 获得首页板块分类公司信息
*/
export async function GetIndexPageProductRm(): Promise<ResProductIndexPageModelListReturnModel> {

    return await Products.GetIndexPageProduct().catch(data => data)
}

/**
* 获得首页热门品牌公司信息
*/
export async function GetHotCompanyIndexPageProduct(): Promise<ResProductIndexPageModel[] | null> {
    let rm = await GetHotCompanyIndexPageProductRm()
    let models = JSONParse<ResProductIndexPageModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
* 获得首页热门品牌公司信息
*/
export async function GetHotCompanyIndexPageProductRm(): Promise<ResProductIndexPageModelListReturnModel> {

    return await Products.GetHotCompanyIndexPageProduct().catch(data => data)
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



/**
 * 根据公司ID获得所有产品信息
 * BycompanyId
 */
export async function GetCompanyProduct(params: BycompanyId): Promise<ResCompanyProductInfoModel[] | null> {
    let rm = await GetCompanyProductRm(params)
    let models = JSONParse<ResCompanyProductInfoModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据公司ID获得所有产品信息
 * BycompanyId
 */
export async function GetCompanyProductRm(params: BycompanyId): Promise<ResCompanyProductInfoModelListReturnModel> {
    return await Products.GetCompanyProduct(params).catch(data => data)
}
/**
 * 根据公司ID获得所有产品分类
 * BycompanyId
 */
export async function GetCompanyProductType(params: BycompanyId): Promise<productTypeListModel[] | null> {
    let rm = await GetCompanyProductTypeRm(params)
    let models = JSONParse<productTypeListModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据公司ID获得所有产品分类
 * BycompanyId
 */
export async function GetCompanyProductTypeRm(params: BycompanyId): Promise<ResproductTypeListModel> {
    return await Products.GetCompanyProductType(params).catch(data => data)
}
/**
 * 根据公司ID和产品分类获得所有产品信息
 * ProductByTypeId
 */
export async function GetCompanyProductByTypeId(params: ProductByTypeId): Promise<ResCompanyProductInfoModelPagedModel | null> {
    let rm = await GetCompanyProductByTypeIdRm(params)
    let models = JSONParse<ResCompanyProductInfoModelPagedModel | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据公司ID和产品分类获得所有产品信息
 * ProductByTypeId
 */
export async function GetCompanyProductByTypeIdRm(params: ProductByTypeId): Promise<ResCompanyProductInfoModelPagedModelReturnModel> {
    return await Products.GetCompanyProductByTypeId(params).catch(data => data)
}


/**
 * 根据产品ID获得产品信息
 * CompanyProductByIdModel
 */
export async function GetCompanyProductById(params: CompanyProductByIdModel): Promise<ResCompanyProductInfoModel | null> {
    let rm = await GetCompanyProductByIdRm(params)
    let models: any = null
    if (rm) {
        models = JSONParse<ResCompanyProductInfoModel | null>(rm?.code, rm?.bodyMessage)
    }

    return models
}

/**
 * 根据产品ID获得产品信息
 * CompanyProductByIdModel
 */
export async function GetCompanyProductByIdRm(params: CompanyProductByIdModel): Promise<ResCompanyProductInfoModelReturnModel> {
    return await Products.GetCompanyProductById(params).catch(data => data)
}
/**
 * 根据产品ID获得该产品在其公司的同一个分类下面的其它产品有哪些
 * CompanyProductByIdModel
 */
export async function GetCompanySimilarProductById(params: CompanyProductByIdModel): Promise<ResCompanySimilarProductModel[] | null> {
    let rm = await GetCompanySimilarProductByIdRm(params)
    let models = JSONParse<ResCompanySimilarProductModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据产品ID获得该产品在其公司的同一个分类下面的其它产品有哪些
 * CompanyProductByIdModel
 */
export async function GetCompanySimilarProductByIdRm(params: CompanyProductByIdModel): Promise<ResCompanySimilarProductModelListReturnModel> {
    return await Products.GetCompanySimilarProductById(params).catch(data => data)
}



/**
 * 获得企业品牌商模型
 */
export async function GetCompanyBrand(params: CompanyBrand): Promise<ResCompanyBrandModelPagedModel> {
    let rm = await GetCompanyBrandRm(params)
    let models = JSONParse<ResCompanyBrandModelPagedModel>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 获得企业品牌商模型
 */
export async function GetCompanyBrandRm(params: CompanyBrand): Promise<ResCompanyBrandModelPagedModelReturnModel> {
    return await Products.GetCompanyBrand(params).catch(data => data)
}







import { JSONParse } from '../common/utils/ModelHelper'
import { ResReputationModelListReturnModel, ResReputationModel, ResReputationStatisticsModel, ResHotReputationModel, ResHotReputationModelListReturnModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'
import Reputations, { GetHighQualityReputationModel, GetReputationByCompanyModel, GetReputationByProductIdModel } from '../services/Reputation.services'

/**
 * 根据公司获得该公司对应的口碑
 * @param {number} companyId 公司id
 */
export async function GetReputationByCompany(companyId: number): Promise<ResReputationModel[] | null> {
    let rm = await GetReputationByCompanyRm(companyId)
    let models = JSONParse<ResReputationModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

//


/**
* 根据公司获得该公司对应的口碑的bodyModel模型返回
*/
export async function GetReputationByCompanyRm(companyId: number): Promise<ResReputationModelListReturnModel> {
    let params: GetReputationByCompanyModel
    params = {
        companyId
    }

    return await Reputations.GetReputationByCompany(params).catch(data => data)
}



/**
 * 根据产品获得该产品下面对应的口碑信息
 * @param {number} productId 产品id
 */
export async function GetReputationByProductId(productId: number): Promise<ResReputationModel[] | null> {
    let rm = await GetReputationByProductIdRm(productId)
    let models = JSONParse<ResReputationModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

//


/**
* 根据产品获得该产品下面对应的口碑信息的bodyModel模型返回
* @param {number} productId 产品id
*/
export async function GetReputationByProductIdRm(productId: number): Promise<ResReputationModelListReturnModel> {
    let params: GetReputationByProductIdModel
    params = {
        productId
    }

    return await Reputations.GetReputationByProductId(params).catch(data => data)
}


/**
 * 获得优质口碑，随机
 * @param {number} pageIndex 随机获取的数量页码
 */
export async function GetHighQualityReputation(pageIndex: number = -1): Promise<ResReputationModel[] | null> {
    let rm = await GetHighQualityReputationRm(pageIndex)
    let models = JSONParse<ResReputationModel[] | null>(rm.code, rm.bodyMessage)
    return models
}


/**
* 获得优质口碑，随机的bodyModel模型返回
* @param {number} pageIndex 随机获取的数量页码
*/
export async function GetHighQualityReputationRm(pageIndex: number): Promise<ResReputationModelListReturnModel> {
    let params: GetHighQualityReputationModel
    params = {
        pageIndex
    }

    return await Reputations.GetHighQualityReputation(params).catch(data => data)
}


/**
 * 获得指定产品下面的口碑综合评分
 * @param {number} productId 产品id
 */
export async function GetReputationStatisticsByProduct(productId: number): Promise<ResReputationStatisticsModel | null> {
    let rm = await GetReputationStatisticsByProductRm(productId)
    let models = JSONParse<ResReputationStatisticsModel | null>(rm.code, rm.bodyMessage)
    return models
}


/**
* 获得指定产品下面的口碑综合评分的bodyModel模型返回
* @param {number} productId 产品id
*/
export async function GetReputationStatisticsByProductRm(productId: number): Promise<bodyModel<ResReputationStatisticsModel[]>> {
    let params: GetReputationByProductIdModel
    params = {
        productId
    }

    return await Reputations.GetReputationStatisticsByProduct(params).catch(data => data)
}



/**
 * 获得热门口碑排行信息
 */
export async function GetHotReputation(): Promise<ResHotReputationModel[] | null> {
    let rm = await GetHotReputationRm()
    let models = JSONParse<ResHotReputationModel[] | null>(rm.code, rm.bodyMessage)
    return models
}


/**
* 获得热门口碑排行信息
*/
export async function GetHotReputationRm(): Promise<ResHotReputationModelListReturnModel> {
    return await Reputations.GetHotReputation().catch(data => data)
}





import { JSONParse } from '../common/utils/ModelHelper'
import { ReputationTypeEnum } from '../enums/enums'
import { ResReputationModelListReturnModel, ResReputationModel, ResReputationStatisticsModel, ResHotReputationModel, ResHotReputationModelListReturnModel, ResReputationFilterModel, ResReputationFilterModelReturnModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'
import Reputations, { GetHighQualityReputationModel, GetReputationByCompanyFilterModel, GetReputationByCompanyModel, GetReputationByProductIdModel } from '../services/Reputation.services'

/**
 * @param {number} productId 产品id
 * @param {number} timeTicks 10位时间戳
 * @param {number} pageSize 分页数量
 * @param {ReputationTypeEnum} reputationType 口碑类型
 */
export type ReputationByProductIdModel = {
    productId: number,
    timeTicks: number,
    pageSize: number,
    reputationType: ReputationTypeEnum
}


/**
 * 根据公司获得该公司对应的口碑
 * @param {number} companyId 公司id
 */
export async function GetReputationByCompany(companyId: number): Promise<ResReputationModel[] | null> {
    let rm = await GetReputationByCompanyRm(companyId)
    let models = JSONParse<ResReputationModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

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
 * 根据公司获得该公司对应的口碑
 */
export async function GetReputationByCompanyFilter(companyId: number, timeTicks: number = 0, pageSize: number = 10, reputationType: ReputationTypeEnum = ReputationTypeEnum.All): Promise<ResReputationFilterModel | null> {
    let rm = await GetReputationByCompanyFilterRm(companyId, timeTicks, pageSize, reputationType)
    let models = JSONParse<ResReputationFilterModel | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
* 根据公司获得该公司对应的口碑的bodyModel模型返回
*/
export async function GetReputationByCompanyFilterRm(companyId: number, timeTicks: number = 0, pageSize: number = 10, reputationType: ReputationTypeEnum = ReputationTypeEnum.All): Promise<ResReputationFilterModelReturnModel> {
    let params: GetReputationByCompanyFilterModel
    params = {
        companyId,
        timeTicks,
        pageSize,
        reputationType
    }

    return await Reputations.GetReputationByCompanyFilter(params).catch(data => data)
}


/**
 * 根据产品获得该产品下面对应的口碑信息
 */
export async function GetReputationByProductId(productId: number, timeTicks: number = 0, pageSize: number = 10, reputationType: ReputationTypeEnum = ReputationTypeEnum.All): Promise<ResReputationFilterModel | null> {
    let rm = await GetReputationByProductIdRm(productId, timeTicks, pageSize, reputationType)
    let models = JSONParse<ResReputationFilterModel | null>(rm?.code, rm?.bodyMessage)
    return models
}

//


/**
* 根据产品获得该产品下面对应的口碑信息的bodyModel模型返回

*/
export async function GetReputationByProductIdRm(productId: number, timeTicks: number = 0, pageSize: number = 10, reputationType: ReputationTypeEnum = ReputationTypeEnum.All): Promise<ResReputationFilterModelReturnModel> {
    let params: ReputationByProductIdModel
    params = {
        productId,
        timeTicks,
        pageSize,
        reputationType
    }

    return await Reputations.GetReputationByProductId(params).catch(data => data)
}


/**
 * 获得优质口碑，随机
 * @param {number} pageIndex 随机获取的数量页码
 */
export async function GetHighQualityReputation(pageIndex: number = -1): Promise<ResReputationModel[] | null> {
    let rm = await GetHighQualityReputationRm(pageIndex)
    let models = JSONParse<ResReputationModel[] | null>(rm?.code, rm?.bodyMessage)
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
    let models = null
    if (rm) {
        models = JSONParse<ResReputationStatisticsModel | null>(rm?.code, rm?.bodyMessage)
    }

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
    let models = JSONParse<ResHotReputationModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
* 获得热门口碑排行信息
*/
export async function GetHotReputationRm(): Promise<ResHotReputationModelListReturnModel> {
    return await Reputations.GetHotReputation().catch(data => data)
}


import config from '../common/config/env'
import http from '../common/utils/net'
import { ReputationTypeEnum } from '../enums/enums'

import { ResReputationModelListReturnModel, ResReputationModel, ResReputationStatisticsModel, ResHotReputationModel, ResHotReputationModelListReturnModel, ResReputationFilterModelReturnModel, ResReputationFilterModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'


export type GetReputationByCompanyModel = {
  companyId: number
}

/**
 * @param {number} companyId 产品id
 * @param {number} timeTicks 10位时间戳
 * @param {number} pageSize 分页数量
 * @param {ReputationTypeEnum} reputationType 口碑类型
 */
export type GetReputationByCompanyFilterModel = {
  companyId: number
  timeTicks: number,
  pageSize: number,
  reputationType: ReputationTypeEnum
}


export type GetReputationByProductIdModel = {
  productId: number
}

export type GetHighQualityReputationModel = {
  pageSize: number
}

class Reputation {
    // 根据公司获得该公司对应的口碑
    // {companyId=1}
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetReputationByCompany(params: GetReputationByCompanyModel): Promise<ResReputationModelListReturnModel> {
        return await http.get<ResReputationModel[]>(`${config.apiPath}api/Reputation/GetReputationByCompany`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据公司获得该公司对应的口碑
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetReputationByCompanyFilter(params: GetReputationByCompanyFilterModel): Promise<ResReputationFilterModelReturnModel> {
        return await http.get<ResReputationFilterModel>(`${config.apiPath}api/Reputation/GetReputationByCompanyFilter`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 根据产品获得该产品下面对应的口碑信息
    // {productId:0} 
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetReputationByProductId(params: GetReputationByProductIdModel): Promise<ResReputationFilterModelReturnModel> {
        return await http.get<ResReputationFilterModel>(`${config.apiPath}api/Reputation/GetReputationByProductId`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得优质口碑，随机
    // {pageSize:0}  随机获取的数量页码
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetHighQualityReputation(params: GetHighQualityReputationModel): Promise<ResReputationModelListReturnModel> {
        return await http.get<ResReputationModel[]>(`${config.apiPath}api/Reputation/GetHighQualityReputation`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得指定产品下面的口碑综合评分
    // {pageIndex:0}  随机获取的数量页码
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetReputationStatisticsByProduct(params: GetReputationByProductIdModel): Promise<bodyModel<ResReputationStatisticsModel[]>> {
        return await http.get<ResReputationStatisticsModel[]>(`${config.apiPath}api/Reputation/GetReputationStatisticsByProduct`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得热门口碑排行信息
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetHotReputation(): Promise<ResHotReputationModelListReturnModel> {
        return await http.get<ResHotReputationModel[]>(`${config.apiPath}api/Reputation/GetHotReputation`, { headers: { 'Content-Type': 'application/json' } })
    }

}


let Reputations = new Reputation()

export default Reputations

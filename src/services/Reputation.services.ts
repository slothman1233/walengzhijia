import config from '../common/config/env'
import http from '../common/utils/net'

import { ResReputationModelListReturnModel, ResReputationModel, ResReputationStatisticsModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'


export type GetReputationByCompanyModel = {
  companyId: number
}

export type GetReputationByProductIdModel = {
  productId: number
}

export type GetHighQualityReputationModel = {
  pageIndex: number
}

class Reputation {
    // 根据公司获得该公司对应的口碑
    // {companyId=1}
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetReputationByCompany(params: GetReputationByCompanyModel): Promise<ResReputationModelListReturnModel> {
        return await http.get<ResReputationModel[]>(`${config.apiPath}api/Reputation/GetReputationByCompany`, { params, headers: { 'Content-Type': 'application/json' } })
    }



    // 根据产品获得该产品下面对应的口碑信息
    // {productId:0} 
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetReputationByProductId(params: GetReputationByProductIdModel): Promise<ResReputationModelListReturnModel> {
        return await http.get<ResReputationModel[]>(`${config.apiPath}api/Reputation/GetReputationByProductId`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得优质口碑，随机
    // {pageIndex:0}  随机获取的数量页码
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
}


let Reputations = new Reputation()

export default Reputations

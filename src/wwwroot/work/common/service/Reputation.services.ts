

import http from './http'
import { ResReputationModel, ResReputationModelListReturnModel } from '../../../../model/reputation/resreputation'

/**
 * 获得优质口碑，随机
 * {pageIndex:0}  随机获取的数量页码
 */
export const GetHighQualityReputationRm = async (pageIndex: number = -1): Promise<ResReputationModelListReturnModel> => await http.get<ResReputationModel[]>(`/api/Reputation/GetHighQualityReputation`, { params: { pageIndex } })

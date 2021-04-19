

import { ResReputationModelListReturnModel, ResReputationModel } from '../../../../model/reputation/reputation'
import http from './http'

import env from '../config/env'

/**
 * 获得优质口碑，随机
 * {pageIndex:0}  随机获取的数量页码
 */
export const GetHighQualityReputationRm = async (pageIndex: number = -1): Promise<ResReputationModelListReturnModel> => await http.get<ResReputationModel[]>(`${env.lepackapi}api/Reputation/GetHighQualityReputation`, { params: { pageIndex } })

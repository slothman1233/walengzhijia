

import http from './http'
import { ResReputationModel, ResReputationModelListReturnModel } from '../../../../model/reputation/resreputation'

/**
 * 获得优质口碑，随机
 * {pageIndex:0}  随机获取的数量页码
 */
export const GetHighQualityReputationRm = async (pageIndex: number = -1): Promise<ResReputationModelListReturnModel> => await http.get<ResReputationModel[]>(`/api/Reputation/GetHighQualityReputation`, { params: { pageIndex } })

/**
 * 根据公司获得该公司对应的口碑的bodyModel模型返回
 * @param {number} companyId 品牌商id
 */
export const GetReputationByCompany = async (companyId: number): Promise<ResReputationModelListReturnModel> => await http.get<ResReputationModel[]>(`/api/Reputation/GetReputationByCompany`, { params: { companyId } })




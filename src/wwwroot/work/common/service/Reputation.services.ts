

import http from './http'
import { ResReputationFilterModel, ResReputationFilterModelReturnModel, ResReputationModel, ResReputationModelListReturnModel } from '../../../../model/reputation/resreputation'
import { ReputationTypeEnum } from '../../../../enums/enums'

/**
 * 获得优质口碑，随机
 * {pageIndex:0}  随机获取的数量
 */
export const GetHighQualityReputationRm = async (pageSize: number = 9): Promise<ResReputationModelListReturnModel> => await http.get<ResReputationModel[]>(`/api/Reputation/GetHighQualityReputation`, { params: { pageSize } })

/**
 * 根据公司获得该公司对应的口碑的bodyModel模型返回
 * @param {number} companyId 品牌商id
 */
export const GetReputationByCompany = async (companyId: number): Promise<ResReputationModelListReturnModel> => await http.get<ResReputationModel[]>(`/api/Reputation/GetReputationByCompany`, { params: { companyId } })


/**
 * 根据产品获得该产品下面对应的口碑信息的bodyModel模型返回
 * @param {number} productId 产品id
 * @param {number} timeTicks 10位时间戳
 * @param {number} pageSize 分页数量
 * @param {ReputationTypeEnum} reputationType 口碑类型
 */
export const GetReputationByProductId = async (productId: number, timeTicks: number, pageSize: number, reputationType: ReputationTypeEnum): Promise<ResReputationFilterModelReturnModel> => await http.get<ResReputationFilterModel>(`/api/Reputation/GetReputationByProductId`, { params: { productId, timeTicks, pageSize, reputationType } })


/**
 * 根据产品获得该产品下面对应的口碑信息的bodyModel模型返回
 * @param {number} companyId 品牌商id
 * @param {number} timeTicks 10位时间戳
 * @param {number} pageSize 分页数量
 * @param {ReputationTypeEnum} reputationType 口碑类型
 */
export const GetReputationByCompanyFilter = async (companyId: number, timeTicks: number, pageSize: number, reputationType: ReputationTypeEnum): Promise<ResReputationFilterModelReturnModel> => await http.get<ResReputationFilterModel>(`/api/Reputation/GetReputationByCompanyFilter`, { params: { companyId, timeTicks, pageSize, reputationType } })




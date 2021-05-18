import { ReputationDelModel } from '../../../../model/reputation/reputation'
//

import { ResReputationModelPagedModel, ResReputationTypeModel } from '../../../../model/reputation/resreputation'
import { bodyModel } from '../../../../model/resModel'
import { PagedByUserModel, productTypeIdModel } from '../../../../services/ManageLepackReputaion.services'
import http from './http'



/**
 * 根据产品类型获得口碑评分项内容
 * productTypeIdModel
 */
export const GetReputationTypeById = async (params: productTypeIdModel) => await http.get<ResReputationTypeModel[]>(`/api/ManageLepackReputaion/GetReputationTypeById`, { params })


/**
 * 根据用户获取其发表的所有口碑信息（分页）
 * PagedByUserModel
 */
export const GetReuputationPagedByUser = async (params: PagedByUserModel) => await http.get<ResReputationModelPagedModel>(`/api/ManageLepackReputaion/GetReuputationPagedByUser`, { params })



/**
 * 删除口碑
 * ReputationDelModel
 */
export const DeleteReputation = async (options: ReputationDelModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackReputaion/DeleteReputation`, options)

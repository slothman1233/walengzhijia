//

import { ResReputationTypeModel } from '../../../../model/reputation/resreputation'
import { productTypeIdModel } from '../../../../services/ManageLepackReputaion.services'
import http from './http'



/**
 * 根据产品类型获得口碑评分项内容
 * productTypeIdModel
 */
export const GetReputationTypeById = async (params: productTypeIdModel) => await http.get<ResReputationTypeModel[]>(`/api/ManageLepackReputaion/GetReputationTypeById`, { params })

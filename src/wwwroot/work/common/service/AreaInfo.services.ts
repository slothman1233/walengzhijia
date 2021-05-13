
import http from './http'

import { GetAreaInfosByCodeModel } from '../../../../services/AreaInfo.services'
import { ResAreaInfoModelListReturnModel } from '../../../../model/arerinfo/resAreInfo'






/**
 * 获得地区信息
 * GetAreaInfosByCodeModel
 */
export const GetAreaInfosByCode = async (params: GetAreaInfosByCodeModel): Promise<ResAreaInfoModelListReturnModel> => await http.get<any>(`/api/AreaInfo/GetAreaInfosByCode`, { params })

/**
 * 通过地区代码获得上一层的模型对象
 * GetAreaInfosByCodeModel
 */
export const GetParentInfoByCode = async (params: GetAreaInfosByCodeModel): Promise<ResAreaInfoModelListReturnModel> => await http.get<any>(`/api/AreaInfo/GetParentInfoByCode`, { params })


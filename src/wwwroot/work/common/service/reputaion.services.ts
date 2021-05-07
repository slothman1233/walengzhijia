import { ReputationModel } from '../../../../model/reputation/reputation'
import { bodyModel } from '../../../../model/resModel'
import http from './http'



/**
 * 发表口碑
 * ReputationModel
 */
export const AddReputaion = async (options: ReputationModel) => await http.post<boolean>(`/api/reputaion/AddReputaion`, options)

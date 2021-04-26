


import { ResCompanyHotModel } from '../model/company/resCompany'
import { ReputationModel } from '../model/reputation/reputation'
import { bodyModel } from '../model/resModel'
import ManageLepackReputaions from '../services/ManageLepackReputaion.services'
/**
 *  发表口碑
 *  ReputationModel
 */
export async function PostAddReputaion(params: ReputationModel): Promise<bodyModel<string>> {
    return await ManageLepackReputaions.AddReputaion(params).catch(data => data)
}

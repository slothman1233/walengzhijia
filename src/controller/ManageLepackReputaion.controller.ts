


import { JSONParse } from '../common/utils/ModelHelper'
import { ResCompanyHotModel } from '../model/company/resCompany'
import { ReputationModel } from '../model/reputation/reputation'
import { ResReputationTypeModel, ResReputationTypeModelListReturnModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'
import ManageLepackReputaions, { productTypeIdModel } from '../services/ManageLepackReputaion.services'
/**
 *  发表口碑
 *  ReputationModel
 */
export async function PostAddReputaion(params: ReputationModel): Promise<bodyModel<string>> {
    return await ManageLepackReputaions.AddReputaion(params).catch(data => data)
}


/**
 * 根据产品类型获得口碑评分项内容
 * productTypeIdModel
 */
export async function GetReputationTypeById(params: productTypeIdModel): Promise<ResReputationTypeModel[] | null> {
    let rm = await GetReputationTypeByIdRm(params)
    console.log(rm)
    let models = JSONParse<ResReputationTypeModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
 * 根据产品类型获得口碑评分项内容
 * productTypeIdModel
 */
export async function GetReputationTypeByIdRm(params: productTypeIdModel): Promise<ResReputationTypeModelListReturnModel> {

    return await ManageLepackReputaions.GetReputationTypeById(params).catch(data => data)
}




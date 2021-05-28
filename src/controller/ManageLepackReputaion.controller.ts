


import { JSONParse } from '../common/utils/ModelHelper'
import { ResCompanyHotModel } from '../model/company/resCompany'
import { ReputationDelModel, ReputationModel } from '../model/reputation/reputation'
import { ResReputationModelPagedModel, ResReputationModelPagedModelReturnModel, ResReputationTypeModel, ResReputationTypeModelListReturnModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'
import ManageLepackReputaions, { PagedByUserModel, productTypeIdModel } from '../services/ManageLepackReputaion.services'
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
    let models = JSONParse<ResReputationTypeModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据产品类型获得口碑评分项内容
 * productTypeIdModel
 */
export async function GetReputationTypeByIdRm(params: productTypeIdModel): Promise<ResReputationTypeModelListReturnModel> {
    return await ManageLepackReputaions.GetReputationTypeById(params).catch(data => data)
}

/**
 * 根据用户获取其发表的所有口碑信息（分页）
 * PagedByUserModel
 */
export async function GetReuputationPagedByUser(params: PagedByUserModel): Promise<ResReputationModelPagedModel | null> {
    let rm = await GetReuputationPagedByUserRm(params)
    let models = JSONParse<ResReputationModelPagedModel | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
 * 根据用户获取其发表的所有口碑信息（分页）
 * PagedByUserModel
 */
export async function GetReuputationPagedByUserRm(params: PagedByUserModel): Promise<ResReputationModelPagedModelReturnModel> {
    return await ManageLepackReputaions.GetReuputationPagedByUser(params).catch(data => data)
}

/**
 * 删除口碑
 * ReputationDelModel
 */
export async function DeleteReputation(params: ReputationDelModel): Promise<bodyModel<boolean>> {
    return await ManageLepackReputaions.DeleteReputation(params).catch(data => data)
}


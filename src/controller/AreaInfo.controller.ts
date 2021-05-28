import { JSONParse } from '../common/utils/ModelHelper'
import { ResAdvertisingModel, ResAdvertisingModelListReturnModel } from '../model/Advertising'
import { ResAreaInfoModel, ResAreaInfoModelListReturnModel } from '../model/arerinfo/resAreInfo'
import { LepackUserModel } from '../model/user/User'
import AreaInfos, { GetAreaInfosByCodeModel } from '../services/AreaInfo.services'
import Advertisings, { GetAdvertisingModel } from '../services/common/Advertising.services'

/**
 * 获得地区信息
 */
export async function GetAreaInfosByCode(params: GetAreaInfosByCodeModel = { areaCode: 6541 }): Promise<ResAreaInfoModel[] | null> {
    let rm = await GetAreaInfosByCodeRm(params)
    let models = JSONParse<ResAreaInfoModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 获得地区信息
*/
export async function GetAreaInfosByCodeRm(params: GetAreaInfosByCodeModel = { areaCode: 6541 }): Promise<ResAreaInfoModelListReturnModel> {
    return await AreaInfos.GetAreaInfosByCode(params).catch(data => data)
}


/**
 * 通过地区代码获得上一层的模型对象
 */
export async function GetParentInfoByCode(params: GetAreaInfosByCodeModel = { areaCode: 6541 }): Promise<ResAreaInfoModel[] | null> {
    let rm = await GetParentInfoByCodeRm(params)
    let models = JSONParse<ResAreaInfoModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 通过地区代码获得上一层的模型对象
*/
export async function GetParentInfoByCodeRm(params: GetAreaInfosByCodeModel = { areaCode: 6541 }): Promise<ResAreaInfoModelListReturnModel> {
    return await AreaInfos.GetParentInfoByCode(params).catch(data => data)
}



import { JSONParse } from '../common/utils/ModelHelper'
import { ResAdvertisingModel, ResAdvertisingModelListReturnModel } from '../model/Advertising'
import Advertisings, { GetAdvertisingModel } from '../services/common/Advertising.services'

/**
 * 获取广告
 */
export async function GetAdvertising(params: GetAdvertisingModel): Promise<ResAdvertisingModel[] | null> {
    let rm = await GetAdvertisingRm(params)
    let models = JSONParse<ResAdvertisingModel[] | null>(rm.code, rm.bodyMessage)
    return models
}

/**
* 获取广告
*/
export async function GetAdvertisingRm(params: GetAdvertisingModel): Promise<ResAdvertisingModelListReturnModel> {
    return await Advertisings.GetAdvertising(params).catch(data => data)
}



import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ResCompanyHotModelListReturnModel, ResCompanyInfoModelReturnModel } from '../model/company/resCompany'
import { bodyModel } from '../model/resModel'
import { CompanyProductInfoModel } from '../model/company/Company'
import { ResAreaInfoModelListReturnModel, ResAreaInfoStructModel } from '../model/arerinfo/resAreInfo'


export type GetAreaInfosByCodeModel = {
  areaCode: number
}

class AreaInfo {
    // 获得地区信息
    // {areaCode:0} 获取国家 areaCode=0
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetAreaInfosByCode(params: GetAreaInfosByCodeModel) {
        return await http.get<ResAreaInfoModelListReturnModel>(`${config.apiPath}api/AreaInfo/GetAreaInfosByCode`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 获得地区信息
    // {areaCode:0} 获取国家 areaCode=0
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetAreaInfos() {
        return await http.get<ResAreaInfoStructModel>(`${config.apiPath}api/AreaInfo/GetAreaInfos`, { headers: { 'Content-Type': 'application/json' } })
    }
}


let AreaInfos = new AreaInfo()

export default AreaInfos

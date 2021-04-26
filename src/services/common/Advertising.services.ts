import config from '../../common/config/env'
import http from '../../common/utils/net'
import { adTypeEnums } from '../../enums/enums'
import { ResAdvertisingModel } from '../../model/Advertising'

import { ResAreaInfoModelListReturnModel } from '../../model/arerinfo/resAreInfo'

/**
 * 广告类型
 * @param {adTypeEnums} adType 广告类型
 * @param {number} size 广告数量
 */
export type GetAdvertisingModel = {
  adType: adTypeEnums
  size: number
}

class Advertising {
    // 获得广告信息
    // GetAdvertisingModel
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetAdvertising(params: GetAdvertisingModel) {
        return await http.get<ResAdvertisingModel[]>(`${config.apiPath}api/Advertising/GetAdvertising`, { params, headers: { 'Content-Type': 'application/json' } })
    }
}


let Advertisings = new Advertising()

export default Advertisings

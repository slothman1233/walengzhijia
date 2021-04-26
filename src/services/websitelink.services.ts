import config from '../common/config/env'
import http from '../common/utils/net'

import { ResWebLinkModel, ResWebLinkModelListReturnModel } from '../model/link/weblink'




class WebsiteLink {
    // 获得友情链接
    //@CacheInterceptor('AreaInfo_GetAreaInfoInfoByUser', CacheTime.Min3)
    async GetWebLinks() {
        return await http.get<ResWebLinkModel[]>(`${config.apiPath}api/WebsiteLink/GetWebLinks`, { headers: { 'Content-Type': 'application/json' } })
    }
}
                   

let WebsiteLinks = new WebsiteLink()

export default WebsiteLinks
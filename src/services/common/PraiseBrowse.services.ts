import config from '../../common/config/env'
import http from '../../common/utils/net'

const apiFMCompany = 'FMCompanyApi'

import CacheInterceptor from '../../common/decorator/CacheInterceptor'
import { CacheTime } from '../../enums/enums'
import { ComponentModel } from '../../model/component'
import { nunRenderMacroString } from '../../common/nunjucks'
import { BrowseModel, PraiseModel } from '../../model/PraiseBrowse'
import { bodyModel } from '../../model/resModel'



class PraiseBrowse {
    // 添加点赞
    // PraiseModel
    async AddPraise(params: PraiseModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/PraiseBrowse/AddPraise`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 删除点赞
    // PraiseModel
    async DeletePraise(params: PraiseModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/PraiseBrowse/DeletePraise`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 查询点赞
    // PraiseModel
    async GetIsPraise(params: PraiseModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/PraiseBrowse/GetIsPraise`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加浏览量
    // PraiseModel
    async AddBrowse(params: BrowseModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/PraiseBrowse/AddBrowse`, params, { headers: { 'Content-Type': 'application/json' } })
    }



}

let PraiseBrowses = new PraiseBrowse()

export default PraiseBrowses
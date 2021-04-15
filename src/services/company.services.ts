import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ResCompanyHotModelListReturnModel, ResCompanyInfoModelReturnModel } from '../model/company/resCompany'
import { bodyModel } from '../model/resModel'
import { CompanyProductInfoModel } from '../model/company/Company'


export type GetCompanyInfoByUserModel = { userId: number }

class company {
    // 获得用户绑定的公司信息，如果用户没有绑定公司则无法查找到内容
    // {userId : 100000}
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async GetCompanyInfoByUser(params: GetCompanyInfoByUserModel) {
        return await http.get<ResCompanyInfoModelReturnModel>(`${config.apiPath}api/Company/GetCompanyInfoByUser`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 首页中显示热门公司品牌，根据产品ID类型来获得公司产品信息
    //@CacheInterceptor('company_GetCompanyHot', CacheTime.Min3)
    async GetCompanyHot() {
        return await http.get<ResCompanyHotModelListReturnModel>(`${config.apiPath}api/Company/GetCompanyHot`, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加公司产品
    // CompanyProductInfoModel
    //@CacheInterceptor('company_AddCompanyProduct', CacheTime.Min3)
    async AddCompanyProduct(params: CompanyProductInfoModel) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/Company/AddCompanyProduct`, { params, headers: { 'Content-Type': 'application/json' } })
    }

}

let companys = new company()

export default companys


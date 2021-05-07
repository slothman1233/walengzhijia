import config from '../common/config/env'
import http from '../common/utils/net'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ReputationModel } from '../model/reputation/reputation'
import { ResReputationTypeModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'

export type productTypeIdModel = {
    productTypeId: number
}

class ManageLepackReputaion {
    // 发表口碑
    // ReputationModel
    //@CacheInterceptor('company_GetCompanyInfoByUser', CacheTime.Min3)
    async AddReputaion(params: ReputationModel) {
        return await http.post<string>(`${config.apiPath}api/ManageLepackReputaion/AddReputaion`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加产品分类
    // {
    //   'industryId': 1,
    //   'productType': '1',
    //   'productTypeIcon': '11'
    // }
    async AddProductType(params: ProductTypeModel) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/ManageLepackProduct/AddProductType`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加产品分类
    // {
    //   "productTypeId": 1,
    //   "productTypeDetail": "string"
    // }
    async AddProductTypeLabel(params: ProductTypeDetailModel) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/ManageLepackProduct/AddProductTypeLabel`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 根据产品类型获得口碑评分项内容
     * productTypeIdModel
     */
    async GetReputationTypeById(params: productTypeIdModel) {
        return await http.get<ResReputationTypeModel[]>(`${config.apiPath}api/ManageLepackReputaion/GetReputationTypeById`, { params, headers: { 'Content-Type': 'application/json' } })
    }


}


let ManageLepackReputaions = new ManageLepackReputaion()

export default ManageLepackReputaions
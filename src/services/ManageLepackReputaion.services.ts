import config from '../common/config/env'
import http from '../common/utils/net'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ReputationDelModel, ReputationModel } from '../model/reputation/reputation'
import { ResReputationModelPagedModel, ResReputationTypeModel } from '../model/reputation/resreputation'

export type productTypeIdModel = {
    productTypeId: number
}

export type PagedByUserModel = {
    userId: number,
    pageSize?: number,
    pageIndex: number
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
        return await http.post<string>(`${config.apiPath}api/ManageLepackProduct/AddProductType`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 添加产品分类
    // {
    //   "productTypeId": 1,
    //   "productTypeDetail": "string"
    // }
    async AddProductTypeLabel(params: ProductTypeDetailModel) {
        return await http.post<string>(`${config.apiPath}api/ManageLepackProduct/AddProductTypeLabel`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 根据产品类型获得口碑评分项内容
     * productTypeIdModel
     */
    async GetReputationTypeById(params: productTypeIdModel) {
        return await http.get<ResReputationTypeModel[]>(`${config.apiPath}api/ManageLepackReputaion/GetReputationTypeById`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 根据用户获取其发表的所有口碑信息（分页）
     * PagedByUserModel
     */
    async GetReuputationPagedByUser(params: PagedByUserModel) {
        params.pageSize = params.pageSize || 10
        return await http.get<ResReputationModelPagedModel>(`${config.apiPath}api/ManageLepackReputaion/GetReuputationPagedByUser`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 删除口碑
    // ReputationDelModel
    async DeleteReputation(params: ReputationDelModel) {
        return await http.post<boolean>(`${config.apiPath}api/ManageLepackReputaion/DeleteReputation`, params, { headers: { 'Content-Type': 'application/json' } })
    }


}


let ManageLepackReputaions = new ManageLepackReputaion()

export default ManageLepackReputaions
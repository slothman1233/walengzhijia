import config from '../common/config/env'
import http from '../common/utils/net'
import { publishNewsTypeEnums } from '../enums/enums'
import { CompanyProductSalerModel } from '../model/company/resCompany'
import { NewsTopModel } from '../model/news/news'
import { ResNewsModelPagedModelReturnModel } from '../model/news/resNews'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ReputationModel } from '../model/reputation/reputation'
import { ResReputationTypeModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'

/**
 * 通过产品ID获取具体的新闻内容
 * @param {number} companyId 公司id
 * @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
 * @param {number} pageIndex 页码
 * @param {boolean} isReputation 是否获取口碑新闻
 */
export type GetNewsByNewsIdModel = {
  companyId: number
  newsType: publishNewsTypeEnums
  pageIndex: number
  isReputation?: boolean
}

class ManageLepackNews {
    /**
* 根据公司ID获得新闻资讯信息
* @param {number} companyId 公司id
* @param {number} newsType 新闻类型，0是热门 当为0的时候默认按照时间排序返回最新的10条新闻记录
* @param {publishNewsTypeEnums} pageIndex 页码
* @param {boolean} isReputation 是否获取口碑新闻
*/
    async GetNewsPagesByCompanyId(params: GetNewsByNewsIdModel) {
        return await http.get<ResNewsModelPagedModelReturnModel>(`${config.apiPath}api/ManageLepackNews/GetNewsPagesByCompanyId`, { params, headers: { 'Content-Type': 'application/json' } })
    }



    // 新闻置顶操作
    // NewsTopModel
    async SetNewsTop(params: NewsTopModel) {
        return await http.post<boolean>(`${config.apiPath}api/ManageLepackNews/SetNewsTop`, params, { headers: { 'Content-Type': 'application/json' } })
    }


    // 取消置顶操作
    // NewsTopModel
    async DelNewsTop(params: NewsTopModel) {
        return await http.post<boolean>(`${config.apiPath}api/ManageLepackNews/DelNewsTop`, params, { headers: { 'Content-Type': 'application/json' } })
    }

}


let ManageLepackNewss = new ManageLepackNews()

export default ManageLepackNewss
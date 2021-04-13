import config from '../common/config/env'
import http from '../common/utils/net'

const apiFMCompany = 'FMCompanyApi'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime } from '../enums/enums'
import { ComponentModel } from '../model/component'
import { nunRenderMacroString } from '../common/nunjucks'
import { ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel } from '../model/resModel'



class Managelepackproduct {
    // 根据产品行业标识ID获得该行业下面所有的产品分类信息
    //  {industry: id}
    // @CacheInterceptor('Managelepackproduct_GetProductIndustry', CacheTime.Min30)
    async GetProductIndustry(params: any) {
        return await http.get<ResIndustryTypeModelListReturnModel>(`${config.apiPath}api/ManageLepackProduct/GetProductIndustry`, { params, queryType: 'json' })
    }

    // 通过产品分类ID查找该分类下面的标签信息等
    // {productType : 1}
    // @CacheInterceptor('Managelepackproduct_GetProductType', CacheTime.Min30)
    async GetProductType(params: any) {
        return await http.get<ResProductTypeModelListReturnModel>(`${config.apiPath}api/ManageLepackProduct/GetProductType`, { params, queryType: 'json' })
    }

    // 添加产品大分类
    // {"industryTypeName": "123123"}
    async AddProductIndustry(params: any) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/ManageLepackProduct/AddProductIndustry`, params, { queryType: 'json' })
    }


    // 添加产品分类
    // {
    //   'industryId': 1,
    //   'productType': '1',
    //   'productTypeIcon': '11'
    // }
    async AddProductType(params: any) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/ManageLepackProduct/AddProductType`, params, { queryType: 'json' })
    }

    // 添加产品分类
    // {
    //   "productTypeId": 1,
    //   "productTypeDetail": "string"
    // }
    async AddProductTypeLabel(params: any) {
        return await http.post<bodyModel<string>>(`${config.apiPath}api/ManageLepackProduct/AddProductTypeLabel`, params, { queryType: 'json' })
    }




}


let managelepackproduct = new Managelepackproduct()

export default managelepackproduct
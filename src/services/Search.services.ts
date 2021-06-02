import config from '../common/config/env'
import http from '../common/utils/net'

import CacheInterceptor from '../common/decorator/CacheInterceptor'
import { CacheTime, ProductSortTypeEnums } from '../enums/enums'
import { ComponentModel } from '../model/component'
import { nunRenderMacroString } from '../common/nunjucks'
import { ResIndustryTypeModel, ResIndustryTypeModelListReturnModel } from '../model/industry/resIndustryType'
import { ResProductIndexPageModel, ResProductIndexPageModelListReturnModel, ResProductTypeModel, ResProductTypeModelListReturnModel } from '../model/product/resproductType'
import { bodyModel } from '../model/resModel'
import { ProductTypeDetailModel, ProductTypeModel } from '../model/product/ProductType'
import { ResCompanyProductInfoModel, ResCompanyProductInfoModelListReturnModel, ResCompanyProductInfoModelPagedModel, ResproductTypeListModel } from '../model/reputation/resreputation'
import { ResCompanyBrandModelPagedModel, ResCompanyProductInfoModelReturnModel, ResCompanySimilarProductModel } from '../model/company/resCompany'
import { productTypeListModel } from '../model/reputation/reputation'
import { QueryCompanyModel, QueryNewsModel, SearchModel } from '../model/search/search'

class Search {
    // 搜索功能
    // getProductModel
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async Search(params: SearchModel) {
        return await http.post<QueryCompanyModel | QueryNewsModel>(`${config.apiPath}/api/Search/Search`, params, { headers: { 'Content-Type': 'application/json' } })
    }
}


let Searchs = new Search()

export default Searchs
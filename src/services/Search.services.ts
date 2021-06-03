import config from '../common/config/env'
import http from '../common/utils/net'

import { ResQueryCompanyModel, ResQueryNewsModel, SearchModel } from '../model/search/search'

class Search {
    // 搜索功能
    // SearchModel
    // @CacheInterceptor('Product_GetProductType', CacheTime.Min30)
    async Search(params: SearchModel) {
        return await http.post<ResQueryCompanyModel | ResQueryNewsModel>(`${config.apiPath}api/Search/Search`, params, { headers: { 'Content-Type': 'application/json' } })
    }
}


let Searchs = new Search()

export default Searchs
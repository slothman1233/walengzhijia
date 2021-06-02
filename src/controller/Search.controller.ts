

import { JSONParse } from '../common/utils/ModelHelper'
import { ReputationTypeEnum } from '../enums/enums'
import { ResReputationModelListReturnModel, ResReputationModel, ResReputationStatisticsModel, ResHotReputationModel, ResHotReputationModelListReturnModel, ResReputationFilterModel, ResReputationFilterModelReturnModel } from '../model/reputation/resreputation'
import { bodyModel } from '../model/resModel'
import { QueryCompanyModel, QueryNewsModel, ResQueryCompanyModel, ResQueryNewsModel, SearchModel } from '../model/search/search'
import Reputations, { GetHighQualityReputationModel, GetReputationByCompanyFilterModel, GetReputationByCompanyModel, GetReputationByProductIdModel } from '../services/Reputation.services'
import Searchs from '../services/Search.services'


/**
 * 获得热门口碑排行信息
 */
export async function Search(params: SearchModel): Promise<QueryCompanyModel | QueryNewsModel | null> {
    let rm = await SearchRm(params)
    let models = JSONParse<QueryCompanyModel | QueryNewsModel | null>(rm?.code, rm?.bodyMessage)
    return models
}


/**
* 获得热门口碑排行信息
*/
export async function SearchRm(params: SearchModel): Promise<ResQueryCompanyModel | ResQueryNewsModel> {
    return await Searchs.Search(params).catch(data => data)
}


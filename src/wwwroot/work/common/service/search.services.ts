import { ReputationModel } from '../../../../model/reputation/reputation'
import { bodyModel } from '../../../../model/resModel'
import { QueryCompanyModel, QueryNewsModel, ResQueryCompanyModel, ResQueryNewsModel, SearchModel } from '../../../../model/search/search'
import http from './http'



/**
 * 搜索
 * SearchModel
 */
export const search = async (options: SearchModel) => await http.post<QueryCompanyModel[] | QueryNewsModel[]>(`/api/search/search`, options)

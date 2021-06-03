import { Context } from 'koa'
import { post } from '../../../common/decorator/httpMethod'
import { SearchModel } from '../../../model/search/search'
import { SearchRm } from '../../../controller/Search.controller'

export default class Index {
  /**
 * 搜索
 * ReputationModel
 */
  @post('/search')
    async index(ctx: Context) {
        let models = await SearchRm((<SearchModel>ctx.request.body))
        ctx.body = models
    }
}


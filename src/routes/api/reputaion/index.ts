

//managelepackproduct


import { Context } from 'koa'
import { post, get } from '../../../common/decorator/httpMethod'
import { ReputationModel } from '../../../model/reputation/reputation'
import { PostAddReputaion } from '../../../controller/ManageLepackReputaion.controller'
import { GetReputationByCompanyRm } from '../../../controller/Reputation.controller'

export default class Index {
    /**
     * 发表口碑
     * ReputationModel
     */
    @post('/AddReputaion')
    async GetProductIndustry(ctx: Context) {
        let models = await PostAddReputaion((<ReputationModel>ctx.request.body))
        ctx.body = models
    }


    /**
         * 根据公司获得该公司对应的口碑
         * @param {string|number} id 行业标识ID
         */
    @get('/GetReputationByCompany')
    async GetReputationByCompany(ctx: Context) {
        let { companyId } = ctx.query

        let models = await GetReputationByCompanyRm(companyId)
        ctx.body = models
    }




}


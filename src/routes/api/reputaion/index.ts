

//managelepackproduct


import { Context } from 'koa'
import { post } from '../../../common/decorator/httpMethod'
import { ReputationModel } from '../../../model/reputation/reputation'
import { PostAddReputaion } from '../../../controller/ManageLepackReputaion.controller'

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


}


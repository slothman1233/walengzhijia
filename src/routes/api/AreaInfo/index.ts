

//managelepackproduct


import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'
import { GetAreaInfosByCodeRm, GetParentInfoByCodeRm } from '../../../controller/AreaInfo.controller'
import { GetAreaInfosByCodeModel } from '../../../services/AreaInfo.services'
export default class AreaInfoapi {
    /**
    * 获得地区信息
    * GetAreaInfosByCodeModel
    */
    @get('/GetAreaInfosByCode')
    async GetAreaInfosByCodeRm(ctx: Context) {
        let models = await GetAreaInfosByCodeRm((<GetAreaInfosByCodeModel>ctx.query))
        ctx.body = models
    }

    /**
     * 通过地区代码获得上一层的模型对象
     * GetAreaInfosByCodeModel
     */
    @get('/GetParentInfoByCode')
    async GetParentInfoByCodeRm(ctx: Context) {
        let models = await GetParentInfoByCodeRm((<GetAreaInfosByCodeModel>ctx.query))
        ctx.body = models
    }

}


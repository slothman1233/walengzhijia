

import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'




export default class Business {

  @get('/advcooperation')
    async advcooperation(ctx: Context) {
        await ctx.render('m/home/advcooperation', {})
    }
}
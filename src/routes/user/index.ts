
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { isNumber } from '../../common/utils/type_check'



export default class Search {

  @get('/index')
    async index(ctx: Context, next: Next) {


        await ctx.render('user/index', {
         
        })
    }
}




import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'



export default class Search {

  @get('/:keyword?')
    async index(ctx: Context, next: Next) {
        await ctx.render('search/index', {})
    }
}


export const ss = function () { return 1 }


import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'



export default class News {

  @get('/:id?')
    async index(ctx: Context, next: Next) {

        await ctx.render('news/index', {})

    }






}


export const ss = function () { return 1 }

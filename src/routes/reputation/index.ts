
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'



export default class Reputation {
  @get('/publish')
    async publish(ctx: Context, next: Next) {

        await ctx.render('reputation/publish', {})

    }

  @get('/:id?')
  async index(ctx: Context, next: Next) {

      await ctx.render('reputation/index', {})

  }






}


export const ss = function () { return 1 }

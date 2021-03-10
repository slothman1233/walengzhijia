
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'



export default class Business {

  @get('/:id?')
    async index(ctx: Context, next: Next) {

        await ctx.render('business/index', {})

    }

  @get('/product/:id?')
  async product(ctx: Context, next: Next) {

      await ctx.render('business/product', {})

  }
  @get('/answer/:id?')
  async answer(ctx: Context, next: Next) {

      await ctx.render('business/answer', {})

  }



}


export const ss = function () { return 1 }

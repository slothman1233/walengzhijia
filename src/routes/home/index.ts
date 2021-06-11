



import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'



export default class home {

  @get('/agreement')
    async index(ctx: Context, next: Next) {

        await ctx.render('home/agreement', {})

    }
  @get('/privacy')
  async privacy(ctx: Context, next: Next) {

      await ctx.render('home/privacy', {})

  }

  @get('/advcooperation')
  async advcooperation(ctx: Context, next: Next) {

      await ctx.render('home/advcooperation', {})

  }

}





import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'


/**
* @param {number} productId 产品ID
* @param {number} companyId 公司ID
 */
export default class Reputation {
  @get('/publish/:companyId?/:productId?')
    async publish(ctx: Context, next: Next) {

        await ctx.render('reputation/publish', {})

    }

  @get('/:id?')
  async index(ctx: Context, next: Next) {

      await ctx.render('reputation/index', {})

  }






}


export const ss = function () { return 1 }

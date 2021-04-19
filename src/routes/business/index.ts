
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetReputationStatisticsByProduct } from '../../controller/Reputation.controller'



export default class Business {

  @get('/:id?')
    async index(ctx: Context, next: Next) {

        await ctx.render('business/index', {})

    }

  @get('/product/:companyId/:productId?')
  async product(ctx: Context, next: Next) {

      let kbByProduct = await GetReputationStatisticsByProduct(1)
      let kbscoreData: any[] = []

      if (kbByProduct) {

          kbByProduct.reputationScore.forEach(item => {
              kbscoreData.push({
                  name: item.reputationTypeName,
                  number: item.reputationScore
              })
          })
      }


      await ctx.render('business/product', {
          kbByProduct,
          kbscoreData
      })

  }
  @get('/answer/:id?')
  async answer(ctx: Context, next: Next) {

      await ctx.render('business/answer', {})

  }



}


export const ss = function () { return 1 }

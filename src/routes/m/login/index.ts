
import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'

export default class Login {

  @get('/')
    async index(ctx: Context) {

        await ctx.render('m/login/index', {
        })

    }

}


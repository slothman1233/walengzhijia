

import { Context, Next } from 'koa'
import { Controller, get, middlewares } from '../../common/decorator/httpMethod'

export default class Index {
  @get('/index')
    async index(ctx: Context) {

        await ctx.render('m/index', {
        })

    }
}
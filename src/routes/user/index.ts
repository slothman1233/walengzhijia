
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { isNumber } from '../../common/utils/type_check'



export default class Search {

  @get('/index/:notificationType?/:pageIndex?')
    async index(ctx: Context, next: Next) {
    // var notificationType = {{notificationType}} || 1
    // var pageIndex = {{pageIndex}} || 1
        let { notificationType, pageIndex } = ctx.params
        await ctx.render('user/index', {
            notificationType: notificationType || 1,
            pageIndex: pageIndex || 1
        })
    }
}



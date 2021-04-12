
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { isNumber } from '../../common/utils/type_check'



export default class Search {

  @get('/:type?/:keyword?')
    async index(ctx: Context, next: Next) {
        let { type, keyword } = ctx.params

        //type 的范围只能是1 或者 2
        if ((parseInt(type) !== 1 && parseInt(type) !== 2)) {
            type = 1
        }


        await ctx.render('search/index', {
            type: type,
            keyword: keyword || ''
        })
    }
}



import { Context, Next } from 'koa'
import { isString } from '../common/utils/type_check'
import { getCookie } from '../common/utils/cookies'
import { userlogin } from '../routes/login'

/**
 * 判断是否登录 如果没有登录则跳转到首页
 * @param {Context} ctx 
 * @param {Next} next 
 */
export async function user_login_middleware(ctx: Context, next: Next) {
    let userinfo = getCookie(ctx, userlogin)
    if (!userinfo || userinfo === 'undefined') {
        ctx.redirect('/')
    } else {
        await next()
    }

}
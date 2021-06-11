import { Context, Next } from 'koa'
import { get, middlewares } from '../../../common/decorator/httpMethod'
import { userLoginModel } from '../../../model/common'
import { userlogin } from '../../../routes/login'
import { getCookie } from '../../../common/utils/cookies'
import { m_user_login_middleware } from '../../../middleware/login'
import { GetNoticeByUid } from '../../../controller/ManageLepackNotice.controller'
import { NotificationTypeDefine } from '../../../enums/enums'
import { GetReuputationPagedByUser } from '../../../controller/ManageLepackReputaion.controller'
export default class Index {
    @middlewares([m_user_login_middleware])
    @get('/information')
    async information(ctx: Context, next: Next) {
        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))

        await ctx.render('m/user/information', {
            cookieuserinfo
        })
    }

    @middlewares([m_user_login_middleware])
    @get('/content')
    async content(ctx: Context, next: Next) {

        //获取用户对应的口碑
        let userinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))
        let pageData = await GetReuputationPagedByUser({
            userId: parseInt(userinfo.userId),
            pageIndex: 1
        })
        await ctx.render('m/user/content', {
            totalPages: pageData?.totalPages || 1,
            kbData: pageData?.items || []
        })
    }

    @middlewares([m_user_login_middleware])
    @get('/interactionnotification')
    async interactionnotification(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        let pageSize = 10
        let cookie = await getCookie(ctx, userlogin)
        let userId = 0
        let cookieJson = JSON.parse(cookie)
        if (cookie !== 'undefined') {
            userId = cookieJson.userId
        }

        //获取不动通知
        let interactiveData = await GetNoticeByUid({
            userId,
            pageIndex: 1,
            pageSize,
            notification: NotificationTypeDefine.Interactive
        })

        interactiveData.items.forEach(item => {
            let json: any = {}
            try {
                json = JSON.parse(item.extensionJson)
            } catch (e) { }
            item.extensionJson = json
        })
        //----------------------------------------------
        await ctx.render('m/user/interactionnotification', {
            pageSize,
            interactiveData: interactiveData?.items || [],
            interactiveotalPages: interactiveData?.totalPages || 0,
        })
    }

    @middlewares([m_user_login_middleware])
    @get('/systemnotification')
    async systemnotification(ctx: Context, next: Next) {
        let { notificationType, pageIndex } = ctx.params
        let pageSize = 10
        let cookie = await getCookie(ctx, userlogin)
        let userId = 0
        let cookieJson = JSON.parse(cookie)
        if (cookie !== 'undefined') {
            userId = cookieJson.userId
        }
        //获取系统通知
        let systemData = await GetNoticeByUid({
            userId,
            pageIndex: 1,
            pageSize,
            notification: NotificationTypeDefine.System
        })

        await ctx.render('m/user/systemnotification', {
            pageSize,
            systemData: systemData?.items || [],
            systemtotalPages: systemData?.totalPages || 0,

        })
    }

    @middlewares([m_user_login_middleware])
    @get('/setting')
    async setting(ctx: Context, next: Next) {
        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))
        await ctx.render('m/user/setting', {
            cookieuserinfo
        })
    }

    @middlewares([m_user_login_middleware])
    @get('/updatepwd')
    async updatepwd(ctx: Context, next: Next) {
        let cookieuserinfo: userLoginModel = JSON.parse(await getCookie(ctx, userlogin))
        await ctx.render('m/user/updatepwd', {
            cookieuserinfo
        })
    }


}
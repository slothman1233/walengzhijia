import { bodyModel } from '../../model/resModel'
import { nunRender } from './index'
import commonService from '../../services/common/component.services'
import { Context, Next } from 'koa'
import { getCookie } from '../utils/cookies'
import { userlogin } from '../../routes/login'

export default {
    'FmMoreRead': function (ctx: Context, url: string, ...arg: any) {

        try {
            return nunRender(url, { models: arg })

        } catch (e) {
            return ''
        }

    },
    'userlistbox': async function (ctx: Context, url: string, ...arg: any) {
        let cookie = await getCookie(ctx, userlogin)
        let isCompany = false
        if (cookie && JSON.parse(cookie).company !== null) {
            isCompany = true
        }
        arg[0].isCompany = isCompany
        try {
            let html = await commonService.ComponentApiService({ path: url, name: 'userlistbox', data: { args: arg[0] } })
            return html
        } catch (e) {
            return ''
        }

    }
}

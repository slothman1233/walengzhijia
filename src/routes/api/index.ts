
import { Context } from 'koa'
import { test_middleware } from '../../middleware/test'
import { Controller, get, middlewares, post } from '../../common/decorator/httpMethod'
import commonService from '../../services/common/component.services'
import { ComponentModel } from '../../model/component'
import { SuccessModel } from '../../model/resModel'




export default class Index {
    @post('/component')
    async component(ctx: Context) {
        let { name, data, path }: ComponentModel = ctx.request.body
        if (!name || !path) {
            ctx.body = ''

        } else {
            let html = await commonService.ComponentApiService({ path, name, data: Object.assign({}, ctx.state, data) })
            ctx.body = new SuccessModel({ bodyMessage: html })
        }

    }


    //获取当前时间
    @get('/currenttime')
    async currenttime(ctx: Context) {
        ctx.body = Date.now()
    }
}



import { Context } from 'koa'

import conf from '../../../common/config/env'
import { STS } from 'ali-oss'
import fs from 'fs'
import path from 'path'
import { post, get } from '../../../common/decorator/httpMethod'


let sts_token: any = null

let sts_token_out: any = null


// @Controller('/test')

export default class Oss {
  @post('/sts')
    async sts(ctx: Context) {
        if (sts_token !== null) {
            ctx.set('Access-Control-Allow-Origin', '*')
            ctx.set('Access-Control-Allow-METHOD', 'GET')

            ctx.status = 200
            ctx.body = sts_token
            return
        }


        let policy
        if (conf.sts.PolicyFile) {
            policy = fs.readFileSync(path.resolve(__dirname, conf.sts.PolicyFile)).toString('utf-8')
        }

        const client = new STS({
            accessKeyId: conf.sts.AccessKeyId,
            accessKeySecret: conf.sts.AccessKeySecret
        })
        let result
        try {
            result = await client.assumeRole(conf.sts.RoleArn, policy, conf.sts.TokenExpireTime)

            ctx.set('Access-Control-Allow-Origin', '*')
            ctx.set('Access-Control-Allow-METHOD', 'GET')

            ctx.status = 200

            sts_token = {
                AccessKeyId: result.credentials.AccessKeyId,
                AccessKeySecret: result.credentials.AccessKeySecret,
                SecurityToken: result.credentials.SecurityToken,
                Expiration: result.credentials.Expiration
            }
            ctx.body = sts_token


            // 过期自动删除
            if (sts_token_out !== null) { clearTimeout(sts_token) }

            sts_token_out = setTimeout(() => {
                sts_token = null
            }, conf.sts.TokenExpireTime)


        } catch (err) {
            // console.log(err)
            ctx.status = 400
            ctx.body = err.message
            sts_token = null
            if (sts_token_out !== null) { clearTimeout(sts_token) }
        }


    }
}
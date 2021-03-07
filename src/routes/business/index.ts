
import { Context, Next } from 'koa'
import { test_middleware, test_2 } from '../../middleware/test'
import { Controller, get, middlewares } from '../../common/decorator/httpMethod'
import http from '../../common/utils/net'
import path from 'path'
import fs from 'fs-extra'
import log from '../../middleware/log4js/log'

import workers from '../../common/utils/work/worker_threads'
import { nunRender } from '../../common/nunjucks'

//workers()

// import * as map from './map'
import { writeFile, EnsureFile, readFile, moveFile, copyFile } from '../../common/utils/file'


export default class Business {

  @get('/')
    async index(ctx: Context, next: Next) {

        await ctx.render('business/index', {

        })

    }



}


export const ss = function () { return 1 }

/**
 * @description 正式环境配置文件
 * @author 文亮
 */

import { SESSION_SECRET_KEY } from '../constant'

export default {
    apiPath: 'http://127.0.0.1:5005/',
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'koa_ts',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        keys: [SESSION_SECRET_KEY]
    },

    // domain: '.lepkg.com',
    domain: '.lepkg.com',
    imgFilePath: 'https://img.fx110.uk/',

    domainAllUrl: 'http://www.lepkg.com'

}
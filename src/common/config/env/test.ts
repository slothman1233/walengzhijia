/**
 * @description 测试环境环境配置文件
 * @author 文亮
 */

import { SESSION_SECRET_KEY } from '../constant'

export default {
    apiPath: 'http://114.55.24.27:5000/',
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

    domain: '114.55.24.27:5001',

    imgFilePath: 'https://img.fx110.uk/',

    domainAllUrl: 'http://114.55.24.27:5001'

}
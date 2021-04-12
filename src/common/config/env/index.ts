/**
 * @description 配置文件入口
 * @author 文亮
 */


import dev from './dev'
import test from './test'
import pre from './pre'
import ga from './ga'

import { isTest, isPre, isGa, isDocker } from '../../utils/env'

import { env } from './env'





let config: env = dev

if (isTest) {
    config = test
} else if (isPre) {
    config = pre
} else if (isGa || isDocker) {
    config = ga
}


config.dataCahce = {
    
}

config.sts = {
    AccessKeyId: 'LTAI5tJQUq919KKtFmcD8bLL',
    AccessKeySecret: 'MewilHHtQoUR6n7YNna6CHSXTZCEdz',
    RoleArn: 'acs:ram::1352393424826926:role/slothman',
    // 建议 Token 失效时间为 1 小时
    TokenExpireTime: 3600,
    PolicyFile: '../../../common/assets/policy/all_policy.txt'
}

export default config



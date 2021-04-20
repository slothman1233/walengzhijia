

import crypto from 'crypto'

//加密算法
import { CRYPTO_SECRET_KEY } from '../config/constant'

const secretkey = CRYPTO_SECRET_KEY

/**
 * 加密方法
 * @param {string}} content 明文
 */
export function doCrypto(content: string) {
    let cipher = crypto.createCipher('aes192', secretkey) //使用aes192加密
    let enc = cipher.update(content, 'utf8', 'hex') //编码方式从utf-8转为hex;
    return (enc += cipher.final('hex')) //编码方式转为hex;
}

/**
 * 解密
 * @param {string} str 
 */
export function decodeCrypto(enc:string) {
    //AES对称解密
    let decipher = crypto.createDecipher('aes192', secretkey)
    let dec = decipher.update(enc, 'hex', 'utf8')
    dec += decipher.final('utf8')
    // console.log('AES对称解密结果：' + dec)
    return dec
}

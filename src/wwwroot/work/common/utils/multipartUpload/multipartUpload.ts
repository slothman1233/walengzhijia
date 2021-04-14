


import { hex_md5 } from '../../../../assets/plugin/crypto/md5'
import http from '../../service/http'
// import OSS from 'ali-oss'
declare const OSS: any
// import '../../../../assets/plugin/ali-oss-6.9.0/dist/aliyun-oss-sdk.js'
///assets/plugin/ali-oss-6.9.0/dist/aliyun-oss-sdk.js

// import http from '../../common/service/http'

/**
 * 上传插件
 * 页面需要引入 
 * <script src="/assets/plugin/ali-oss-6.9.0/dist/aliyun-oss-sdk.js"></script>
 * @param {File} files 
 * @param {Function(url)} success 成功后的回调  url 文件地址
 * @param {Function(e)} error 失败后的回调      e 错误
 * @param {Function(p)} progres 进度回调        p当前进度
 */


type optionsType = {
  tempCheckpoint?: any,
  success?: successType
  error?: errorType
  progress?: progresType
}

/**
 * 上传参数说明
 * @param {Function(url)} success 成功后的回调  url 文件地址
 * @param {Function(e)} error 失败后的回调      e 错误
 * @param {Function(p)} progres 进度回调        p当前进度
 */
export type multipartUploadType = {
  success?: successType
  error?: errorType
  progress?: progresType
}

export type successType = (url?: string) => void
export type errorType = (e: any) => void
export type progresType = (p: any) => void
// type cacheType = {
//   tempCheckpoint?: any,
//   progres: progresType
// }

let bucket = 'lepack',
    region = 'oss-cn-hangzhou',
    appServer = '/api/oss/sts',
    maxReconnect = 10, //最大重连数
    reconnectCount = 0, //重连数量
    ossConfig: any = null,
    cacheAry = {}

function options(filename: string, { tempCheckpoint }: optionsType) {
    let options = {
        progress: (p: any, checkpoint: any) => {
            cacheAry[filename].progres && cacheAry[filename].progres(p)
            // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
            cacheAry[filename].tempCheckpoint = checkpoint

        },
        // parallel: 5,
        checkpoint: cacheAry[filename].tempCheckpoint || null,
        partSize: 100 * 1024,
        meta: {
            year: (<any>new Date()).getYear() + 1900,
        },
    }
    return options

}

/**
* 获取 token
*/
async function applyTokenDo() {

    let result = await http.post<any>(appServer, {}, { codes: { sures: ['0'] } }).catch(data => data)

    ossConfig = {
        region: region,
        accessKeyId: result.AccessKeyId,
        accessKeySecret: result.AccessKeySecret,
        stsToken: result.SecurityToken,
        bucket: bucket
    }
}



async function multi(file: File, filename: string, { success, error }: optionsType) {

    await applyTokenDo()

    let client = new OSS(ossConfig)
    // 开始分片上传。
    try {

        // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await (<any>client.multipartUpload)(filename, file, options(filename, {
            tempCheckpoint: cacheAry[filename].tempCheckpoint,
        }))

        success(result.res.requestUrls[0].split('?')[0])
        cacheAry[filename].url = result.res.requestUrls[0]
        cacheAry[filename].state = true
    } catch (e) {
        reconnectCount++
        if (maxReconnect <= reconnectCount) {
            error(e)
            return
        }
        multi(file, filename, {
            success, error
        })
    }
}


/**
* 上传
* @param {File} files 
* @param {Function} success 成功后的回调
* @param {Function} error 失败后的回调
* @param {Function} progres 进度回调
*/
export default async function multipartUpload(files: File, {
    success, error, progress
}: optionsType) {
    reconnectCount = 0
    let file = files
    let filename = hex_md5(files.name) + '.' + files.name.split('.')[1]

    if (cacheAry[filename] && cacheAry[filename].state) {
        progress && progress(1)
        return success && success(cacheAry[filename].url)
    }


    if (!cacheAry[filename]) { cacheAry[filename] = {} }

    if (progress) { cacheAry[filename].progres = progress }
    if (!file) { return }
    multi(file, filename, { success, error })

}
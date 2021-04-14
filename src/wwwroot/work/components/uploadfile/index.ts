import { isString } from '@stl/tool-ts/src/common/obj/isString'
import multipartUpload, { multipartUploadType } from '../../common/utils/multipartUpload/multipartUpload'

/**
 * 上传文件 
 * 页面需要引入  <script src="/assets/plugin/ali-oss-6.9.0/dist/aliyun-oss-sdk.js"></script>
 * @param {HTMLElement} inputDom  上传的input元素
 * @param param1 
    * @param {Function(url)} success 成功的回调    url  文件地址
    * @param {Function(e)} error 失败的回调  e错误信息
    * @param {function (i)} progress 进度回调  i 当前进度   1为100%
 */
export function uploadfilefn(inputDom: HTMLInputElement, {
    success,
    error,
    progress
}: multipartUploadType) {

    // let input = parentdom.querySelector('.uploadfileinput')

    inputDom.onchange = function (e: any) {

        multipartUpload((<HTMLInputElement>e.target).files[0], {
            success, error, progress
        })
    }
}
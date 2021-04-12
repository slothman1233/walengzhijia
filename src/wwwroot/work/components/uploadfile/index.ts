import { isString } from '@stl/tool-ts/src/common/obj/isString'
import multipartUpload, { multipartUploadType } from '../../common/utils/multipartUpload/multipartUpload'

export function uploadfilefn(parentId: string | HTMLElement, {
    success,
    error,
    progress
}: multipartUploadType) {
    let parentdom: any = parentId
    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }

    let input = parentdom.querySelector('.uploadfileinput')

    input.onchange = function (e: any) {

        multipartUpload((<HTMLInputElement>e.target).files[0], {
            success, error, progress
            // //成功的回调
            // success: function (url) {
            //     console.log(url)
            // },
            // //失败的回调
            // error: function (e) {
            //     console.log(e)
            // },
            // //进度回调
            // progress: function (i) {
            //     console.log(i)
            // }
        })
    }
}
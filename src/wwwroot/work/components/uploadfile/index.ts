import { isString } from '@stl/tool-ts/src/common/obj/isString'
import multipartUpload, { errorType, multipartUploadType, successType } from '../../common/utils/multipartUpload/multipartUpload'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import env from '../../common/config/env'
declare const $: JQueryStatic
export type delType = () => void
export type multipartUploadImgType = {
    success?: successType
    error?: errorType
    delcallback?: delType
}
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
        let file: File = (<HTMLInputElement>e.target).files[0]


        if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) >= 0 && file.size >= env.imgMaxSize) {
            alert('图片不能超过5M大小！')
            return
        }

        if (['video/mp4'].indexOf(file.type) >= 0 && file.size >= env.videoMaxSize) {
            alert('视频不能超过5G大小！')
            return
        }


        multipartUpload((<HTMLInputElement>e.target).files[0], {
            success, error, progress
        })
    }
}

/**
 * 上传图片
 * 配合macro uploadfileImg使用
 * 页面需要引入  <script src="/assets/plugin/ali-oss-6.9.0/dist/aliyun-oss-sdk.js"></script>
 * @param { string | HTMLElement} parentId  父级元素或者id
 * @param param1 
    * @param {Function(url)} success 成功的回调    url  文件地址
    * @param {Function(e)} error 失败的回调  e错误信息
    * @param {Function()} delcallback 删除图片后的回调
 */
export function uploadfilefnImg(parentId: string | HTMLElement, {
    success,
    error,
    delcallback
}: multipartUploadImgType) {
    let parentdom: any = parentId
    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }
    let inputDom: HTMLInputElement = parentdom.querySelector('.uploadfileinput')
    let deleteDom: HTMLElement = parentdom.querySelector('.delete')
    let preview = $(inputDom).siblings('.previewbg').find('.preview')
    if (!parentdom) { return }

    inputDom.onchange = function (e: any) {
        let file: File = (<HTMLInputElement>e.target).files[0]
        if (file.size >= env.imgMaxSize) {
            alert('图片不能超过5M大小！')
            return
        }
        multipartUpload(file, {
            success: function (url: string) {

                preview.css({
                    'background-image': `url(${url})`,
                }).show()

                $(deleteDom).show()

                success && success(url)
                //清除input里面的内容
                inputDom.value = ''
            },
            error: function (e: any) {
                //清除input里面的内容
                inputDom.value = ''
                error && error(e)
            },
            progress: function (index: number) { }
        })
    }

    deleteDom.onclick = function () {
        preview.css({
            'background-image': `none`,
        }).hide()
        $(deleteDom).hide()
        delcallback && delcallback()
    }

}


/**
 * 上传视频
 * 配合macro uploadfileVideo使用
 * 页面需要引入  <script src="/assets/plugin/ali-oss-6.9.0/dist/aliyun-oss-sdk.js"></script>
 * @param { string | HTMLElement} parentId  父级元素或者id
 * @param param1 
    * @param {Function(url)} success 成功的回调    url  文件地址
    * @param {Function(e)} error 失败的回调  e错误信息
    * @param {Function()} delcallback 删除图片后的回调
 */
export function uploadfilefnVideo(parentId: string | HTMLElement, {
    success,
    error,
    delcallback
}: multipartUploadImgType) {
    let parentdom: any = parentId
    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }
    let inputDom: HTMLInputElement = parentdom.querySelector('.uploadfileinput')
    let deleteDom: HTMLElement = parentdom.querySelector('.delete')
    let preview = $(inputDom).siblings('.previewbg').find('.preview')
    let video = preview.find('video')
    if (!parentdom) { return }

    inputDom.onchange = function (e: any) {
        let file: File = (<HTMLInputElement>e.target).files[0]
        if (file.size >= env.videoMaxSize) {
            alert('视频不能超过5G大小！')
            return
        }
        multipartUpload(file, {
            success: function (url: string) {

                video.attr('src', url)
                preview.show()

                $(deleteDom).show()

                success && success(url)
                //清除input里面的内容
                inputDom.value = ''
            },
            error: function (e: any) {
                //清除input里面的内容
                inputDom.value = ''
                error && error(e)
            },
            progress: function (index: number) { }
        })
    }

    deleteDom.onclick = function () {
        video.attr('src', '')
        preview.hide()
        $(deleteDom).hide()
        delcallback && delcallback()
    }

}
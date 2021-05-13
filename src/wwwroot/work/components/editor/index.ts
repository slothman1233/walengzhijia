
import { isString } from '@stl/tool-ts/src/common/obj/isString'
import { hex_md5 } from '../../../assets/plugin/crypto/md5'
import multipartUpload, { multipartUploadType } from '../../common/utils/multipartUpload/multipartUpload'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic

let loadPath = '/assets/images/loading.png?'

/**
 * 上传参数说明
 * @param {Function(url)} success 成功后的回调  url 文件地址
 * @param {Function(e)} error 失败后的回调      e 错误
 * @param {Function(p)} progres 进度回调        p当前进度
 */
export type editorUploadType = {
    success?: successType
    error?: errorType
    // progress?: progresType
}

export type successType = (img?: HTMLImageElement | HTMLVideoElement) => void
export type errorType = (e: any) => void
// export type progresType = (p: any) => void

/**
 * 
 * @param parentId 
 * @param  {uedit} ue 当前编辑器元素
 * @param param2 
 */
export function editor_uploadimg(parentId: string | HTMLElement, ue: any, {
    success,
    error
}: editorUploadType) {
    let parentdom: any
    if (isString(parentId)) {
        parentdom = document.getElementById(<string>parentId).querySelector('.edui-for-insertimage')
    } else {
        parentdom = (<HTMLElement>parentId).querySelector('.edui-for-insertimage')
    }
    parentdom.querySelector('.uploadfileinput').onchange = function (e: any) {
        let files = (<HTMLInputElement>e.target).files
        for (let i = 0; i < files.length; i++) {
            let img = document.createElement('img')

            let md5 = hex_md5(Date.now().toString() + Math.round(Math.random() * 1000000).toString())


            let loadurl = loadPath + md5
            img.src = loadurl
            ue.execCommand('insertImage', img)


            multipartUpload(files[i], {
                success: function (url: string) {
                    let img = $(ue.body).find(`img[src="${document.location.origin + loadurl}"]`)
                    img.attr('src', url)
                    img.attr('data-viewer', url)
                    img.attr('_src', url)
                    success && success(<HTMLImageElement>img[0])
                },
                error,
                progress: function (i: number) { }
            })

        }


    }
}

export function editor_uploadvideo(parentId: string | HTMLElement, ue: any, {
    success,
    error
}: editorUploadType) {
    let parentdom: any
    if (isString(parentId)) {
        parentdom = document.getElementById(<string>parentId).querySelector('.edui-for-insertvideo')
    } else {
        parentdom = (<HTMLElement>parentId).querySelector('.edui-for-insertvideo')
    }

    parentdom.querySelector('.uploadfileinput').onchange = function (e: any) {

        let files = (<HTMLInputElement>e.target).files
        for (let i = 0; i < files.length; i++) {
            let img = document.createElement('img')
            let md5 = hex_md5(Date.now().toString() + Math.round(Math.random() * 1000000).toString())

            let loadurl = loadPath + md5
            img.src = loadurl
            ue.execCommand('insertImage', img)


            multipartUpload(files[i], {
                success: function (url: string) {
                    let img = $(ue.body).find(`img[src="${document.location.origin + loadurl}"]`)
                    let video: HTMLVideoElement = document.createElement('video')
                    video.controls = true
                    video.src = url

                    img[0].parentNode.replaceChild(video, img[0])
                    success && success(<HTMLVideoElement>video[0])
                },
                error,
                progress: function (i: number) { }
            })

        }



    }
}


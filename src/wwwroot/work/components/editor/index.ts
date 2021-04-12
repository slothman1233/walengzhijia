
import { isString } from '@stl/tool-ts/src/common/obj/isString'
import { multipartUploadType } from '../../common/utils/multipartUpload/multipartUpload'
import { uploadfilefn } from '../uploadfile'

export function editor_uploadimg(parentId: string | HTMLElement, {
    success,
    error,
    progress
}: multipartUploadType) {
    let parentdom: any
    if (isString(parentId)) {
        parentdom = document.getElementById(<string>parentId).querySelector('.edui-for-insertimage')
    } else {
        parentdom = (<HTMLElement>parentId).querySelector('.edui-for-insertimage')
    }
    return uploadfilefn(parentdom, {
        success,
        error,
        progress
    })
}

export function editor_uploadvideo(parentId: string | HTMLElement, {
    success,
    error,
    progress
}: multipartUploadType) {
    let parentdom: any
    if (isString(parentId)) {
        parentdom = document.getElementById(<string>parentId).querySelector('.edui-for-insertvideo')
    } else {
        parentdom = (<HTMLElement>parentId).querySelector('.edui-for-insertvideo')
    }
    return uploadfilefn(parentdom, {
        success,
        error,
        progress
    })
}


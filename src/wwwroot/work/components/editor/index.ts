
import { isString } from '@stl/tool-ts/src/common/obj/isString'
import { uploadfilefn } from '../uploadfile'

type errorfn = (error: any) => void

type successfn = (e: any, name: string) => void
type d = {
  success?: successfn,
  error?: errorfn
}

export function editor_uploadimg(parentId: string | HTMLElement, {
    success,
    error
}: d) {
    let parentdom: any
    if (isString(parentId)) {
        parentdom = document.getElementById(<string>parentId).querySelector('.edui-for-insertimage')
    } else {
        parentdom = (<HTMLElement>parentId).querySelector('.edui-for-insertimage')
    }
    return uploadfilefn(parentdom, {
        success,
        error
    })
}

export function editor_uploadvideo(parentId: string | HTMLElement, {
    success,
    error
}: d) {
    let parentdom: any
    if (isString(parentId)) {
        parentdom = document.getElementById(<string>parentId).querySelector('.edui-for-insertvideo')
    } else {
        parentdom = (<HTMLElement>parentId).querySelector('.edui-for-insertvideo')
    }
    return uploadfilefn(parentdom, {
        success,
        error
    })
}


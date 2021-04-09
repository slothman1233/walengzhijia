import { isString } from '@stl/tool-ts/src/common/obj/isString'

type errorfn = (error: any) => void

type successfn = (e: any, name: string) => void
type d = {
  success?: successfn,
  error?: errorfn
}

export function uploadfilefn(parentId: string | HTMLElement, {
    success,
    error
}: d) {
    let parentdom: any = parentId
    if (isString(parentId)) { parentdom = document.getElementById(<string>parentId) }

    let input = parentdom.querySelector('.uploadfileinput')

    input.onchange = function (e: any) {


        console.log(e)

        success && success(e, 'sss')
    }
}
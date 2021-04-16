import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
declare const $: JQueryStatic
declare const type: any
declare const userid: any


(function () {
    //修改
    on({
        agent: document.querySelector('.information_content'),
        events: 'click',
        ele: '.applyfor',
        fn: function (dom: any, ev: any) {
            $(dom).siblings('.textarea').attr('contenteditable', 'plaintext-only')
            // $(dom).siblings('.textarea').focus()
            $(dom).hide()
            $(dom).siblings('.submit').show()
        }
    })


    //上传图片
    document.querySelector('.information_content').querySelectorAll('.uploadfileinput').forEach(function (input: HTMLInputElement, index: number) {
        uploadfilefn(input, {
            success: (url: string) => {

                $(input).parent().siblings('.padding').find('img').attr('src', url)
                alert('上传成功')
            },
            error: (err: any) => {
                alert('上传失败请重新上传')
            },
            progress: (i: number) => {
                console.log(i)
            }
        })
    })
})();

(function () {

    //新建下的保存
    let information_submit = $('#usermain .information_submit')
    information_submit.click(function () {
        alert('保存成功')
    })


})()

import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
declare const $: JQueryStatic
declare const type: any
declare const userid: any
(function () {

    //type 1 是新增 2 是修改
    if (type === 2) {
    //编辑状态下显示编辑按钮
        $(document.querySelector('.sales_content')).find('.applyfor').show()
    } else {
    //创建状态下 默认开启div的编辑模式
        $(document.querySelector('.sales_content')).find('.textarea').attr('contenteditable', 'plaintext-only')
    }
})();

(function () {
    //修改
    on({
        agent: document.querySelector('.sales_content'),
        events: 'click',
        ele: '.applyfor',
        fn: function (dom: any, ev: any) {
            $(dom).siblings('.textarea').attr('contenteditable', 'plaintext-only')
            // $(dom).siblings('.textarea').focus()
            $(dom).hide()
            $(dom).siblings('.submit').show()
        }
    })

    //保存
    on({
        agent: document.querySelector('.sales_content'),
        events: 'click',
        ele: '.submit',
        fn: function (dom: any, ev: any) {
            $(dom).siblings('.textarea').attr('contenteditable', 'false')
            $(dom).hide()
            $(dom).siblings('.applyfor').show()
        }
    })

    //上传图片
    document.querySelector('.sales_content').querySelectorAll('.uploadfileinput').forEach(function (input: HTMLInputElement, index: number) {
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
    let sales_submit = $('#usermain .sales_submit')
    sales_submit.click(function () {
        alert('保存成功')
    })


})()

import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
declare const $: JQueryStatic
declare const tabType: any
(function(){
    if(tabType === 2){
        $('#usermain .usernavigationbar > a').show()
    }

})();
(function () {

    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
        if (index === 1) {
            $('#usermain .usernavigationbar > a').show()
        } else {
            $('#usermain .usernavigationbar > a').hide()
        }
    })
})();


(function () {
    //修改
    on({
        agent: document.querySelector('.basic_box'),
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
        agent: document.querySelector('.basic_box'),
        events: 'click',
        ele: '.submit',
        fn: function (dom: any, ev: any) {
            $(dom).siblings('.textarea').attr('contenteditable', 'false')
            $(dom).hide()
            $(dom).siblings('.applyfor').show()
        }
    })

})();

(function () {

    on({
        agent: document.querySelector('.basic_box'),
        events: 'click',
        ele: '.submit',
        fn: function (dom: any, ev: any) {
            $(dom).siblings('.textarea').attr('contenteditable', 'false')
            $(dom).hide()
            $(dom).siblings('.applyfor').show()
        }
    })

    document.querySelector('.basic_box').querySelectorAll('.uploadfileinput').forEach(function (input: HTMLInputElement, index: number) {
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


})()


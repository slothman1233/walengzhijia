import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
import { contentType, popupType } from '../../public/script/popup'
import { DeleteCompanySaler } from '../../common/service/ManageLepackCompany'
import { subCodeEnums } from '../../../../enums/enums'
import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
declare const $: JQueryStatic
declare const tabType: any
// 基本信息
(function () {
    if (tabType === 2) {
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

    //上传图片
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

})();


//销售信息
(function () {
    let market = document.querySelector('#usermain .market')

    //删除
    on({
        agent: market,
        events: 'click',
        ele: '.del',
        fn: function (dom: any, ev: any) {
            let id = $(dom).data('id')

            alert({
                str: '确定要删除吗？',
                type: popupType.b,
                contentType: contentType.warning,
                successCallback: async function () {

                    let userData = JSON.parse(getCookie(config.userlogin))
                    let companyId = userData.company.companyId
                    let userId = userData.userId
                    let delData = await DeleteCompanySaler({
                        salerId: id,
                        companyId,
                        createUser: userId
                    })
                    if (delData.code === 0 && delData.subCode === subCodeEnums.success) {
                        $(dom).parents('.child').remove()
                        alert('删除成功')
                    } else {
                        alert('删除失败，请重新删除')
                    }

                }
            })


        }
    })

    //置顶
    on({
        agent: market,
        events: 'click',
        ele: '.stick',
        fn: function (dom: any, ev: any) {
            let id = $(dom).data('id')
            $($(market).find('.child')[0]).find('.stick').show()
            $(market).prepend($(dom).parents('.child'))
            $(dom).hide()
        }
    })

})()


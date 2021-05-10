import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
import { AddCompanySaler, UpdateCompanySaler } from '../../common/service/ManageLepackCompany'
import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { subCodeEnums } from '../../../../enums/enums'
import { CompanyProductSalerModel } from '../../../../model/company/resCompany'
declare const $: JQueryStatic
declare const type: any
declare const salerId: any


let usermain = document.querySelector('#usermain');

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
        fn: async function (dom: any, ev: any) {
            let publishData = await setPublishData()

            if (!publishData) { return }

            publishData.salerId = salerId

            let data = await UpdateCompanySaler(publishData)

            if (data.code === 0 && data.subCode === subCodeEnums.success) {

                alert('修改销售信息成功')
                $(dom).siblings('.textarea').attr('contenteditable', 'false')
                $(dom).hide()
                $(dom).siblings('.applyfor').show()
            } else {
                alert('修改失败重新添加')

            }


        }
    })

    //上传图片
    document.querySelector('.sales_content').querySelectorAll('.uploadfileinput').forEach(function (input: HTMLInputElement, index: number) {
        uploadfilefn(input, {
            success: async (url: string) => {

                $(input).parent().siblings('.padding').find('img').attr('src', url)

                let publishData = await setPublishData()

                if (!publishData) { return }

                publishData.salerId = salerId

                let data = await UpdateCompanySaler(publishData)

                if (data.code === 0 && data.subCode === subCodeEnums.success) {

                    alert('修改头像成功')

                }else{
                    alert('修改头像失败请重新上传')
                }
            },
            error: (err: any) => {
                alert('修改头像失败请重新上传')
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
    sales_submit.click(async function () {
        let publishData = await setPublishData()

        if (!publishData) { return }

        let data = await AddCompanySaler(publishData)

        if (data.code === 0 && data.subCode === subCodeEnums.success) {

            alert('添加销售信息成功')

        } else {
            alert('添加失败重新添加')

        }
    })


})()


async function setPublishData() {
    let sales_content = usermain.querySelector('.sales_content')
    let salerName: HTMLElement = sales_content.querySelector('.salerName')
    let salerIcon: HTMLImageElement = sales_content.querySelector('.salerIcon')
    let salerPosition: HTMLElement = sales_content.querySelector('.salerPosition')
    let salerFunction: HTMLElement = sales_content.querySelector('.salerFunction')
    let salerWorkYears: HTMLElement = sales_content.querySelector('.salerWorkYears')

    if (salerName.innerText.length <= 0) {
        alert('姓名不能为空')
        return false
    }
    if ($(salerIcon).attr('src').length <= 0) {
        alert('头像不能为空')
        return false
    }
    if (salerPosition.innerText.length <= 0) {
        alert('职称不能为空')
        return false
    }
    if (salerFunction.innerText.length <= 0) {
        alert('职能不能为空')
        return false
    }
    if (salerWorkYears.innerText.length <= 0) {
        alert('行业经验不能为空')
        return false
    } else if ((<any>isNaN)(salerWorkYears.innerText)) {
        alert('行业经验必须为纯数字')
        return false
    }

    let userData = JSON.parse(getCookie(config.userlogin))

    let publishData: CompanyProductSalerModel = {
        companyId: userData.company.companyId,
        salerName: salerName.innerText,
        salerPosition: salerPosition.innerText,
        salerFunction: salerFunction.innerText,
        salerIcon: salerIcon.src,
        salerSummary: '',
        salerWorkYears: salerWorkYears.innerText,
        createUser: userData.userId
    }

    return publishData





}
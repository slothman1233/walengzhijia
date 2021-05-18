import { usernavigationbar } from '../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event/on'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { uploadfilefn } from '../../components/uploadfile'
import { contentType, popupType } from '../../public/script/popup'
import { DeleteCompanySaler, UpdateCompanyInfoByItem } from '../../common/service/ManageLepackCompany'
import { CompanyUpdateTypeDefine, subCodeEnums } from '../../../../enums/enums'
import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { userLoginModel } from '../../../../model/common'
import window from '../../common/win/windows'
declare const $: JQueryStatic
declare const tabType: any

let usercookie: userLoginModel = JSON.parse(window.getusercookie());

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
        fn: async function (dom: any, ev: any) {
            let classname = dom.className
            if (classname.indexOf('abbrName') >= 0) {
                let value = $(dom).siblings('.textarea').text()
                //简称
                if (value.length <= 0) {
                    alert('公司名称不能为空!')
                    return
                }
                let data = await UpdateCompanyInfoByItem({
                    companyId: usercookie.company.companyId,
                    userId: parseInt(usercookie.userId),
                    itemValue: value,
                    itemType: CompanyUpdateTypeDefine.Update_AbbrName
                })

                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    alert('修改成功')
                    usercookie.company.abbrName = value
                    window.setusercookie(JSON.stringify(usercookie))
                    $(dom).siblings('.textarea').attr('contenteditable', 'false')
                    $(dom).hide()
                    $(dom).siblings('.applyfor').show()
                } else {
                    alert('修改错误，请重新提交！')
                    return
                }

            } else if (classname.indexOf('fullName') >= 0) {
                let value = $(dom).siblings('.textarea').text()
                //全称
                if (value.length <= 0) {
                    alert('公司全称不能为空!')
                    return
                }
                let data = await UpdateCompanyInfoByItem({
                    companyId: usercookie.company.companyId,
                    userId: parseInt(usercookie.userId),
                    itemValue: value,
                    itemType: CompanyUpdateTypeDefine.Update_FullName
                })

                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    alert('修改成功')
                    usercookie.company.fullName = value
                    window.setusercookie(JSON.stringify(usercookie))
                    $(dom).siblings('.textarea').attr('contenteditable', 'false')
                    $(dom).hide()
                    $(dom).siblings('.applyfor').show()
                } else {
                    alert('修改错误，请重新提交！')
                    return
                }
            } else if (classname.indexOf('website') >= 0) {
                let value = $(dom).siblings('.textarea').text()
                //网址
                if (value.length <= 0) {
                    alert('公司网址不能为空!')
                    return
                }
                let data = await UpdateCompanyInfoByItem({
                    companyId: usercookie.company.companyId,
                    userId: parseInt(usercookie.userId),
                    itemValue: value,
                    itemType: CompanyUpdateTypeDefine.Update_Website
                })

                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    alert('修改成功')
                    usercookie.company.website = value
                    window.setusercookie(JSON.stringify(usercookie))
                    $(dom).siblings('.textarea').attr('contenteditable', 'false')
                    $(dom).hide()
                    $(dom).siblings('.applyfor').show()
                } else {
                    alert('修改错误，请重新提交！')
                    return
                }
            } else if (classname.indexOf('contactPhone') >= 0) {
                let value = $(dom).siblings('.textarea').text()
                //电话
                if (value.length <= 0) {
                    alert('公司电话不能为空!')
                    return
                }

                let data = await UpdateCompanyInfoByItem({
                    companyId: usercookie.company.companyId,
                    userId: parseInt(usercookie.userId),
                    itemValue: value,
                    itemType: CompanyUpdateTypeDefine.Update_ContactPhone
                })

                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    alert('修改成功')
                    usercookie.company.contactPhone = value
                    window.setusercookie(JSON.stringify(usercookie))
                    $(dom).siblings('.textarea').attr('contenteditable', 'false')
                    $(dom).hide()
                    $(dom).siblings('.applyfor').show()
                } else {
                    alert('修改错误，请重新提交！')
                    return
                }
            } else if (classname.indexOf('addr') >= 0) {
                let value = $(dom).siblings('.textarea').text()
                //地址
                if (value.length <= 0) {
                    alert('公司地址不能为空!')
                    return
                }

                let data = await UpdateCompanyInfoByItem({
                    companyId: usercookie.company.companyId,
                    userId: parseInt(usercookie.userId),
                    itemValue: value,
                    itemType: CompanyUpdateTypeDefine.Update_Addr
                })

                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    alert('修改成功')
                    usercookie.company.addr = value
                    window.setusercookie(JSON.stringify(usercookie))
                    $(dom).siblings('.textarea').attr('contenteditable', 'false')
                    $(dom).hide()
                    $(dom).siblings('.applyfor').show()
                } else {
                    alert('修改错误，请重新提交！')
                    return
                }
            } else if (classname.indexOf('desc') >= 0) {
                let value = $(dom).siblings('.textarea').text()
                //介绍
                if (value.length <= 0) {
                    alert('公司介绍不能为空!')
                    return
                }

                let data = await UpdateCompanyInfoByItem({
                    companyId: usercookie.company.companyId,
                    userId: parseInt(usercookie.userId),
                    itemValue: value,
                    itemType: CompanyUpdateTypeDefine.Update_Description
                })

                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    alert('修改成功')
                    usercookie.company.desc = value
                    window.setusercookie(JSON.stringify(usercookie))
                    $(dom).siblings('.textarea').attr('contenteditable', 'false')
                    $(dom).hide()
                    $(dom).siblings('.applyfor').show()
                } else {
                    alert('修改错误，请重新提交！')
                    return
                }
            }



        }
    })

    //上传图片
    document.querySelector('.basic_box').querySelectorAll('.uploadfileinput').forEach(function (input: HTMLInputElement, index: number) {
        uploadfilefn(input, {
            success: async (url: string) => {

                let classname = input.className
                if (classname.indexOf('logo') >= 0) {
                    let data = await UpdateCompanyInfoByItem({
                        companyId: usercookie.company.companyId,
                        userId: parseInt(usercookie.userId),
                        itemValue: url,
                        itemType: CompanyUpdateTypeDefine.Update_Logo
                    })

                    if (data.code === 0 && data.subCode === subCodeEnums.success) {
                        $(input).parent().siblings('.padding').find('img').attr('src', url)
                        alert('上传成功')
                        usercookie.company.logo = url
                        window.setusercookie(JSON.stringify(usercookie))

                    } else {
                        alert('修改错误，请重新提交！')
                        return
                    }
                } else if (classname.indexOf('license') >= 0) {
                    let data = await UpdateCompanyInfoByItem({
                        companyId: usercookie.company.companyId,
                        userId: parseInt(usercookie.userId),
                        itemValue: url,
                        itemType: CompanyUpdateTypeDefine.Update_Licence
                    })

                    if (data.code === 0 && data.subCode === subCodeEnums.success) {
                        $(input).parent().siblings('.padding').find('img').attr('src', url)
                        alert('上传成功')
                        usercookie.company.license = url
                        window.setusercookie(JSON.stringify(usercookie))

                    } else {
                        alert('修改错误，请重新提交！')
                        return
                    }
                }
               
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


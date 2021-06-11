import { NodeListToArray } from '@stl/tool-ts/src/common/obj/NodeListToArray'
import { subCodeEnums, ValidateCodeDefine } from '../../../../../enums/enums'
import { CompanyProductAdvisoryModel } from '../../../../../model/company/Company'
import { sendCode, ValidateCode } from '../../../common/service/login.services'
import { on } from '@stl/tool-ts/src/common/event'
import { AddCompanyProductAdvisory } from '../../../common/service/company.services'
import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
declare const companyId: any
declare const mui: any
declare const $: JQueryStatic
//手机号码正则
let phoneReg = /^1\d{10}$/
let enquiry_verification: any
let main = document.querySelector('.container')



//用户id
let userId = window.getuserid()


let PublishData: CompanyProductAdvisoryModel = {
    companyId: companyId,
    productId: 0,
    contactPhone: '',
    summary: '',
    status: 0,
    createUser: userId,
    salers: [],
    ContactCompany: '',
    ContactEmail: ''
};

//产品id
(function () {
    let prouductoption: HTMLElement = document.querySelector('.prouductoption')
    PublishData.productId = parseInt(prouductoption.querySelector('.prouduct .prouductselect').getAttribute('data-id'))

    on({
        agent: '#modal',
        events: 'tap',
        ele: 'a',
        fn: function (dom: HTMLElement) {
            let id = dom.getAttribute('data-id')
            let value = dom.querySelector('p').innerHTML

            prouductoption.querySelector('.prouductselect').setAttribute('data-id', id)
            prouductoption.querySelector('.prouductselect span').innerHTML = value

            $(dom).siblings().removeClass('select')
            $(dom).addClass('select')
            mui('#modal').popover('toggle')
            PublishData.productId = parseInt(id)
        }
    })


    on({
        agent: '#modal #smheader',
        events: 'tap',
        ele: '.left',
        fn: function (dom: HTMLElement) {

            mui('#modal').popover('toggle')
        }
    })


})();

//获取验证码
(function () {
    let info: HTMLElement = main.querySelector('.info')
    let phone: HTMLInputElement = info.querySelector('.phone').querySelector('input')
    let verification: HTMLElement = info.querySelector('.verification')
    let sub: HTMLElement = verification.querySelector('a')
    let countdown: HTMLElement = verification.querySelector('.countdown')

    sub.onclick = async () => {
        if (!phoneReg.test(phone.value)) {
            alert('手机号码格式不正确')
            return
        }

        let type: ValidateCodeDefine = ValidateCodeDefine.enquiry

        let data = await sendCode({
            phoneNumber: phone.value,
            validateCodeType: type
        })

        if (data.code === 0 && data.subCode === subCodeEnums.success) {
            alert('发送验证码成功')
            sub.style.display = 'none'
            countdown.style.display = 'block'
            let t = 60
            enquiry_verification = setInterval(() => {
                if (t === 1) {
                    clearInterval(enquiry_verification)
                    countdown.style.display = 'none'
                    sub.style.display = 'block'
                    return
                }
                t -= 1
                countdown.innerHTML = `${t}S`
            }, 1000)
            return
        } else {
            alert('发送失败，请重新发送')
            return
        }

    }

})();

//选择销售客服
(function () {
    let salesman = main.querySelector('.salesman')
    if (!salesman) { return }

    let personnelselection = salesman.querySelector('.personnelselection')

    on({
        agent: personnelselection,
        events: 'tap',
        ele: 'input',
        fn: function (dom: HTMLInputElement, e: Event) {
            e.preventDefault()

            if (dom.getAttribute('checked') === 'true') {
                dom.setAttribute('checked', 'false')
                return
            }

            let inputary: any[] = NodeListToArray(personnelselection.querySelectorAll('input'))
            let selectCount = 0
            inputary.forEach((item: HTMLInputElement) => {
                if (item.getAttribute('checked') === 'true') {
                    selectCount++
                }
            })

            if (selectCount >= 2) {
                alert('最多选择2位销售人员')
                return
            }
            dom.setAttribute('checked', 'true')



        }
    })



})();

//提交
(function () {
    let info: HTMLElement = document.querySelector('.info')
    let submit: HTMLElement = info.querySelector('.submit')
    // let popup_succee: HTMLElement = document.querySelector('.popup_succee')
    // popup_succee.querySelector('span').onclick = function () {
    //     popup_succee.style.display = 'none'
    // }

    submit.onclick = function () {
        publish()
    }

})()

async function publish() {
    // let popup_succee: HTMLElement = document.querySelector('.popup_succee')
    let info: HTMLElement = main.querySelector('.info')
    let company: HTMLInputElement = info.querySelector('.company').querySelector('input')
    let email: HTMLInputElement = info.querySelector('.email').querySelector('input')
    let phone: HTMLInputElement = info.querySelector('.phone').querySelector('input')
    let verification: HTMLInputElement = info.querySelector('.verification input')
    let describe: HTMLTextAreaElement = info.querySelector('.describe textarea')
    let salesman = main.querySelector('.salesman')
    let personnelselection
    if (salesman) {
        personnelselection = salesman.querySelector('.personnelselection')
    }



    if (PublishData.createUser === 0) {
        window.loginshow()
        alert('需要登录后才能发表询价')
        return
    }

    if (company.value.length <= 0) {
        alert('公司不能为空')
        return
    } else if (!phoneReg.test(phone.value)) {
        alert('手机号码格式不正确')
        return
    } else if (verification.value.length <= 0) {
        alert('验证码不正确')
        return
    }

    let type: ValidateCodeDefine = ValidateCodeDefine.enquiry

    let data = await ValidateCode({
        phoneNumber: phone.value,
        validateCode: parseInt(verification.value),
        validateCodeType: type
    })

    if (data.code !== 0 || data.subCode !== subCodeEnums.success) {
        alert('验证码不正确')
        return
    }


    PublishData.contactPhone = phone.value
    PublishData.summary = describe.value
    PublishData.ContactCompany = company.value
    PublishData.ContactEmail = email.value
    if (personnelselection) {
        let inputary: any[] = NodeListToArray(personnelselection.querySelectorAll('input'))
        PublishData.salers = []
        inputary.forEach((item: HTMLInputElement) => {
            if (item.getAttribute('checked') === 'true') {
                PublishData.salers.push({
                    salerId: parseInt(item.getAttribute('data-id'))
                })
            }
        })
    }


    // if (PublishData.salers.length <= 0) {
    //     alert('请选择需要询价的销售')
    //     return
    // }

    // console.log(PublishData)
    let dataJson = await AddCompanyProductAdvisory(PublishData)

    if (dataJson.code === 0 && dataJson.subCode === subCodeEnums.success) {
        // popup_succee.style.display = 'block'
        alert('提交成功')
        setTimeout(() => {
            document.location.href = document.location.href
        }, 4000)
    } else {
        alert(dataJson.message)
    }


}
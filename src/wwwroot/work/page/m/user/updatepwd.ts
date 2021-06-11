import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic
import { on } from '@stl/tool-ts/src/common/event'
import { Login, Register, sendCode, UpdatePasswordByPhone } from '../../../common/service/login.services'
import window from '../../../common/win/windows'
import { LoginEnums, subCodeEnums, ValidateCodeDefine } from '../../../../../enums/enums'
import { userLoginModel } from '../../../../../model/common'
declare const mui: any
let update_box = document.querySelector('.update_box')

let usercookie: userLoginModel = JSON.parse(window.getusercookie());

//发送验证码
(function () {
    let login_verification = null
    let one = update_box.querySelector('.one')
    let verification = one.querySelector('.verification')
    let newspwddom = one.querySelector('.newspwd')
    let newspwd = newspwddom.querySelector('input')

    let confirmpwddom = one.querySelector('.confirmpwd')
    let confirmpwd = confirmpwddom.querySelector('input')
    let submitdiv = one.querySelector('.submitdiv ')
    let validation: HTMLInputElement= one.querySelector('.verification input')
    on({
        agent: verification,
        events: 'tap',
        ele: 'a',
        fn: async function (dom: any, e: any) {
            let domjq = $(dom)

            let data = await sendCode({
                phoneNumber: usercookie.phoneNumber,
                validateCodeType: ValidateCodeDefine.Forgot
            })

            if (data.code === 0 && data.subCode === subCodeEnums.success) {
                alert('发送验证码成功')
                domjq.hide()
                let countdown = domjq.siblings('.countdown')
                countdown.show()
                let t = 60
                login_verification = setInterval(() => {
                    if (t === 1) {
                        clearInterval(login_verification)
                        countdown.hide()
                        domjq.show()
                        return
                    }
                    t -= 1
                    countdown.html(`${t}S`)
                }, 1000)
                return
            }


        }
    })

    on({
        agent: submitdiv,
        events: 'tap',
        ele: '.submit',
        fn: async function () {
            if (newspwd.value.length <= 0) {
                alert('新密码不能为空！')
                return
            } else if (confirmpwd.value.length <= 0) {
                alert('确认密码不能为空！')
                return
            } if (newspwd.value !== confirmpwd.value) {
                alert('新密码和确认密码不一样！')
                return
            }
            let data = await UpdatePasswordByPhone({ phoneNumber: usercookie.phoneNumber, userPwd: newspwd.value, validateCode: parseInt(validation.value) })
            if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
                //需要接入修改密码的接口
                window.removeusercookie()
                alert('修改成功')
                setTimeout(() => {
                    window.history.back()
                }, 2000)
            } else {
                alert(data && data.message || '修改失败，请重新修改')
            }

        }
    })


})()



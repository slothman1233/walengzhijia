import { subCodeEnums, ValidateCodeDefine } from '../../../../enums/enums'
import { userLoginModel } from '../../../../model/common'
import { sendCode, UpdatePasswordByPhone, ValidateCode } from '../../common/service/login.services'
import window from '../../common/win/windows'
let usermain = document.querySelector('#usermain')
let usercookie: userLoginModel = JSON.parse(window.getusercookie());
//第一步
(function () {

    let one: HTMLElement = usermain.querySelector('.one')
    let two: HTMLElement = usermain.querySelector('.two')
    let getvalidation: HTMLElement = one.querySelector('.getvalidation')
    let validation: HTMLInputElement = one.querySelector('.validation')
    let countdown: HTMLElement = one.querySelector('.countdown')
    let next: HTMLElement = one.querySelector('.next')
    let enquiry_verification: any
    //获取验证码
    getvalidation.onclick = async () => {


        let type: ValidateCodeDefine = ValidateCodeDefine.Forgot

        let data = await sendCode({
            phoneNumber: usercookie.phoneNumber,
            validateCodeType: type
        })

        if (data.code === 0 && data.subCode === subCodeEnums.success) {
            alert('发送验证码成功')
            getvalidation.style.display = 'none'
            countdown.style.display = 'block'
            let t = 60
            enquiry_verification = setInterval(() => {
                if (t === 1) {
                    clearInterval(enquiry_verification)
                    countdown.style.display = 'none'
                    getvalidation.style.display = 'block'
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
    // ----------------------------------------------------------------
    next.onclick = async () => {
        if (validation.value.length <= 0) {
            alert('验证码不能为空！')
            return
        }

        let data = await ValidateCode({
            validateCodeType: ValidateCodeDefine.Forgot,
            phoneNumber: usercookie.phoneNumber,
            validateCode: parseInt(validation.value)
        })

        if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
            one.style.display = 'none'
            two.style.display = 'block'
        } else {
            alert(data.message)
            return
        }

    }
})();



//第二步
(function () {
    let one: HTMLElement = usermain.querySelector('.one')
    let validation: HTMLInputElement = one.querySelector('.validation')
    let two: HTMLElement = usermain.querySelector('.two')
    let three: HTMLElement = usermain.querySelector('.three')
    let newspwd: HTMLInputElement = two.querySelector('.newspwd')
    let confirmpwd: HTMLInputElement = two.querySelector('.confirmpwd')
    let next: HTMLElement = two.querySelector('.next')

    next.onclick = async () => {
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
        //需要接入修改密码的接口

        two.style.display = 'none'
        three.style.display = 'block'
        window.removeusercookie()
    }

})();

//第三步
(async function () {
    let three: HTMLElement = usermain.querySelector('.three')



    three.querySelector('a').onclick = function () {
        document.location.href = '/'
    }
})()
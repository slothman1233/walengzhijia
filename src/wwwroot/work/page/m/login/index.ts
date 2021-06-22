import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic
import { on } from '@stl/tool-ts/src/common/event'
import { Login, Register, sendCode } from '../../../common/service/login.services'
import window from '../../../common/win/windows'
import { LoginEnums, subCodeEnums, ValidateCodeDefine } from '../../../../../enums/enums'
declare const mui: any
let login_container = document.getElementById('login_container')
let login_verification: any
let register_verification: any
//手机号码正则
let phoneReg = /^1\d{10}$/
let pwdReg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
//点击关闭按钮触发
(function () {
    on({
        agent: login_container,
        events: 'click',
        ele: '.login_title .close',
        fn: function () {
            closeCallback()
        }
    })
    mui('.agreementwrapper').scroll()
    mui('.privacywrapper').scroll()
    on({
        agent: '#agreement',
        events: 'tap',
        ele: '.left',
        fn: function (dom: HTMLElement) {

            mui('#agreement').popover('toggle')
        }
    })

    on({
        agent: '#privacy',
        events: 'tap',
        ele: '.left',
        fn: function (dom: HTMLElement) {

            mui('#privacy').popover('toggle')
        }
    })
})();

//登录方式切换
(function () {
    on({
        agent: login_container,
        events: 'click',
        ele: '.login_phone',
        fn: function () {
            let phone_login = login_container.querySelector('.phone_login')
            $(phone_login).siblings().hide()
            $(phone_login).show()
        }
    })

    on({
        agent: login_container,
        events: 'click',
        ele: '.login_register',
        fn: function () {
            let register = login_container.querySelector('.register')
            $(register).siblings().hide()
            $(register).show()
        }
    })

    on({
        agent: login_container,
        events: 'click',
        ele: '.login_pwd',
        fn: function () {
            let pwd_login = login_container.querySelector('.pwd_login')
            $(pwd_login).siblings().hide()
            $(pwd_login).show()
        }
    })



})();

//发送验证码
(function () {
    // let countdown = login_container.querySelector('.countdown')
    on({
        agent: login_container,
        events: 'click',
        ele: '.getverification',
        fn: async function (dom: any, e: any) {
            let domjq = $(dom)
            let phone = domjq.parent().siblings('.phone').find('input')
            let error = domjq.parent().siblings('.error').find('span')
            if (phone.val().length <= 0) {
                error.html('手机号不能为空')
                error.css('visibility', 'visible')
                return

            } else if (!phoneReg.test(phone.val())) {
                error.html('手机号码格式不正确')
                error.css('visibility', 'visible')
                return
            }

            let type: ValidateCodeDefine = ValidateCodeDefine.Login

            if (domjq.data('type') === 'login') {
                type = ValidateCodeDefine.Login
            } else if (domjq.data('type') === 'register') {
                type = ValidateCodeDefine.Register
            }

            let data = await sendCode({
                phoneNumber: phone.val(),
                validateCodeType: type
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

            error.html(data.message)
            error.css('visibility', 'visible')



        }
    })

})();

//手机登录
(async function () {

    let phone_login: HTMLElement = login_container.querySelector('.phone_login')
    let login_login: HTMLElement = phone_login.querySelector('.login_login')
    let phone: HTMLInputElement = phone_login.querySelector('.phone input')
    let verification: HTMLElement = phone_login.querySelector('.verification')
    let login_footer: HTMLElement = phone_login.querySelector('.login_footer')

    let getverification: HTMLInputElement = verification.querySelector('input')
    let error: HTMLElement = phone_login.querySelector('.error span')

    login_login.onclick = async function () {

        if (phone.value.length <= 0) {
            error.innerHTML = '手机号不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!phoneReg.test(phone.value)) {
            error.innerHTML = '手机号码格式不正确'
            error.style.visibility = 'visible'
            return
        } else if (getverification.value.length <= 0) {
            error.innerHTML = '验证码不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!login_footer.querySelector('input').checked) {
            error.innerHTML = '请您阅读并同意服务协议和隐私政策并勾选'
            error.style.visibility = 'visible'
            return
        }



        let data = await Login({
            type: LoginEnums.Phone,
            phoneNumber: phone.value,
            validateCode: parseInt(getverification.value)
        })

        if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
            alert('登录成功')
            closeCallback()
            window.setlocalStorageuser(JSON.stringify(data.bodyMessage.company))

            setTimeout(() => {
                // window.history.back()
                window.location.replace(document.referrer)
            }, 2000)
            return
        }

        error.innerHTML = data.message
        error.style.visibility = 'visible'
    }
})();

//手机密码登录
(async function () {

    let pwd_login: HTMLElement = login_container.querySelector('.pwd_login')
    let login_login: HTMLElement = pwd_login.querySelector('.login_login')
    let phone: HTMLInputElement = pwd_login.querySelector('.phone input')
    let pwd: HTMLElement = pwd_login.querySelector('.pwd')
    let getpwd: HTMLInputElement = pwd.querySelector('input')
    let error: HTMLElement = pwd_login.querySelector('.error span')
    let login_footer: HTMLElement = pwd_login.querySelector('.login_footer')
    login_login.onclick = async function () {
        if (phone.value.length <= 0) {
            error.innerHTML = '手机号不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!phoneReg.test(phone.value)) {
            error.innerHTML = '手机号码格式不正确'
            error.style.visibility = 'visible'
            return
        } else if (getpwd.value.length <= 0) {
            error.innerHTML = ' 密码不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!login_footer.querySelector('input').checked) {
            error.innerHTML = '请您阅读并同意服务协议和隐私政策并勾选'
            error.style.visibility = 'visible'
            return
        }


        let data = await Login({
            type: LoginEnums.AccountPwd,
            phoneNumber: phone.value,
            pwd: getpwd.value
        })

        if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
            alert('登录成功')
            closeCallback()
            window.setlocalStorageuser(JSON.stringify(data.bodyMessage.company))

            setTimeout(() => {
                // window.history.back()
                window.location.replace(document.referrer)
            }, 2000)
            return
        }

        error.innerHTML = data.message
        error.style.visibility = 'visible'


    }
})();

//注册
(async function () {
    let register: HTMLElement = login_container.querySelector('.register')
    let login_login: HTMLElement = register.querySelector('.login_login')
    let phone: HTMLInputElement = register.querySelector('.phone input')
    let verification: HTMLElement = register.querySelector('.verification')
    let getverification: HTMLInputElement = verification.querySelector('input')
    let username: HTMLInputElement = register.querySelector('.username input')
    let password: HTMLInputElement = register.querySelector('.pwd input')
    let error: HTMLElement = register.querySelector('.error span')
    let login_footer: HTMLElement = register.querySelector('.login_footer')
    login_login.onclick = async function () {
        if (username.value.length <= 0) {
            error.innerHTML = '用户名不能为空'
            error.style.visibility = 'visible'
            return
        } else if (password.value.length <= 0) {
            error.innerHTML = '密码不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!pwdReg.test(password.value) || password.value.length < 6) {
            error.innerHTML = '密码格式不正确'
            error.style.visibility = 'visible'
            return
        }
        else if (phone.value.length <= 0) {
            error.innerHTML = '手机号不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!phoneReg.test(phone.value)) {
            error.innerHTML = '手机号码格式不正确'
            error.style.visibility = 'visible'
            return
        } else if (getverification.value.length <= 0) {
            error.innerHTML = '验证码不能为空'
            error.style.visibility = 'visible'
            return
        } else if (!login_footer.querySelector('input').checked) {
            error.innerHTML = '请您阅读并同意服务协议和隐私政策并勾选'
            error.style.visibility = 'visible'
            return
        }


        let data = await Register({
            userName: username.value,
            userPwd: password.value,
            phoneNumber: phone.value,
            validateCode: parseInt(getverification.value)
        })

        if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
            alert('注册成功')
            // closeCallback()
            username.value = ''
            password.value = ''
            phone.value = ''
            getverification.value = ''
            login_footer.querySelector('input').checked = false
            return
        }

        error.innerHTML = data.message
        error.style.visibility = 'visible'
    }
})()

/**
 * 关闭栏目需要执行的方法
 */
function closeCallback() {
    // login_container.style.display = 'none'
    // clearInterval(login_verification)
    // clearInterval(register_verification)
    // $(login_container.querySelector('.countdown')).hide()
    // $(login_container.querySelector('.countdown')).siblings('.getverification').show()
    // $(login_container).find('.error').find('span').css('visibility', 'hidden')
}



/**
 * 显示登录界面默认展示的类型
 * phonelogin  手机登录
 * pwdlogin  手机密码登录
 * register  注册
 */
export enum logintype {
    phonelogin = 1,
    pwdlogin = 2,
    register = 3
}

/**
   * 弹出登录界面
   * @param {logintype} type 显示登录界面默认展示的类型
   */
window.loginshow = function loginshow(type: logintype = logintype.phonelogin) {
    let login_container = document.getElementById('login_container')
    if (login_container !== null) {
        switch (type) {
            case logintype.phonelogin:
                $(login_container).find('.phone_login').siblings().hide()
                $(login_container).find('.phone_login').show()
                break
            case logintype.pwdlogin:
                $(login_container).find('.pwd_login').siblings().hide()
                $(login_container).find('.pwd_login').show()
                break
            case logintype.register:
                $(login_container).find('.register').siblings().hide()
                $(login_container).find('.register').show()
                break
            default:
                $(login_container).find('.phone_login').siblings().hide()
                $(login_container).find('.phone_login').show()
        }

        login_container.style.display = 'block'

    }
}
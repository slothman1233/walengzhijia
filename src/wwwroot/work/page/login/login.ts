import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { on } from '@stl/tool-ts/src/common/event'
import { Login } from '../../common/service/login.services'
declare const $: JQueryStatic

let login_container = document.getElementById('login_container')
let login_verification: any
let register_verification: any

//点击关闭按钮触发
(function () {
    on({
        agent: login_container,
        events: 'click',
        ele: '.login_title .close',
        fn: function () {
            login_container.style.display = 'none'
            clearInterval(login_verification)
            clearInterval(register_verification)
            $(login_container.querySelector('.countdown')).hide()
            $(login_container.querySelector('.countdown')).siblings('.getverification').show()
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

//倒计时
(function () {
    // let countdown = login_container.querySelector('.countdown')
    on({
        agent: login_container,
        events: 'click',
        ele: '.getverification',
        fn: function (dom:any, e:any) {
            let domjq = $(dom)
            domjq.hide()
            let countdown = domjq.siblings('.countdown')
            countdown.show()
            let t = 3
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
        }
    })

})();

//手机登录
(async function  () {

    let phone_login = login_container.querySelector('.phone_login')

    let n = await Login('ddsdsds', '123123')

    console.log(n)

})()




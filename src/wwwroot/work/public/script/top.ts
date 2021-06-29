import { on } from '@stl/tool-ts/src/common/event/on'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { delCookie } from '../../common/utils/common'
import config from '../../common/config/env'
import window from '../../common/win/windows'
import { subCodeEnums } from '../../../../enums/enums'
import type { userLoginModel } from '../../../../model/common'
import { HasNotReadNotice } from '../../common/service/ManageLepackNotice'
let header = document.getElementById('header')
if (header) {
    let notlogin: HTMLElement = header.querySelector('.notlogin')
    let inlogin: HTMLElement = header.querySelector('.inlogin')


    setTimeout(() => {
        let cookie: string = window.getusercookie();
        (function () {
            on({
                agent: header,
                events: 'click',
                ele: '.login .loginout',
                fn: function () {
                    window.removeusercookie()
                    window.removelocalStorageuser()
                    document.location.href = document.location.href
                }
            })
        })();

        (function () {
            if (!cookie) {
                notlogin.style.display = 'block'
            } else {
                let cookiejson = JSON.parse(cookie);
                // $(inlogin.querySelector('.userinfo img')).attr('src', cookiejson.userIcon)
                // $(inlogin.querySelector('.userinfo span')).html(cookiejson.name)
                (<HTMLImageElement>inlogin.querySelector('.userinfo img')).setAttribute('src', cookiejson.userIcon || '')
                inlogin.querySelector('.userinfo span').innerHTML = cookiejson.name
                inlogin.style.display = 'block'

            }
        })()

    }, 0)
}


(function () {
    setTimeout(() => {
        let usercookie: userLoginModel = JSON.parse(window.getusercookie())
        let userId = window.getuserid()
        if (userId > 0) {
            getHasNotReadNotice(userId)
        }


        async function getHasNotReadNotice(userid: number) {
            let userId = window.getuserid()
            if (userId <= 0) { return }

            let data = await HasNotReadNotice({ userId: userid })
            if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
                let header = document.getElementById('header')
                let red: HTMLElement = header.querySelector('.login .user .red')
                if (data.bodyMessage === true || data.bodyMessage.toString() === 'true') {
                    red.style.display = 'block'
                } else {
                    red.style.display = 'none'
                }
            }

            setTimeout(async () => {
                getHasNotReadNotice(userid)
            }, 10000)
        }

    }, 0)
})()
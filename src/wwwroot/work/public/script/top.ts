import { on } from '@stl/tool-ts/src/common/event/on'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { delCookie } from '../../common/utils/common'
import config from '../../common/config/env'
import window from '../../common/win/windows'
let header = document.getElementById('header')
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
            (<HTMLImageElement>inlogin.querySelector('.userinfo img')).setAttribute('_src_', cookiejson.userIcon || '')
            inlogin.querySelector('.userinfo span').innerHTML = cookiejson.name
            inlogin.style.display = 'block'

        }
    })()

}, 0)
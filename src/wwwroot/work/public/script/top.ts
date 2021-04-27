import { on } from '@stl/tool-ts/src/common/event/on'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { delCookie } from '../../common/utils/common'
import config from '../../common/config/env'
let header = document.getElementById('header')
let notlogin: HTMLElement = header.querySelector('.notlogin')
let inlogin: HTMLElement = header.querySelector('.inlogin')
let cookie: string = getCookie(config.userlogin);

(function () {
    on({
        agent: header,
        events: 'click',
        ele: '.login .loginout',
        fn: function () {
            delCookie(config.userlogin)
            document.location.href = document.location.href
        }
    })
})();

(function () {
    if (!cookie) {
        notlogin.style.display = 'block'
    } else {
        let cookiejson = JSON.parse(decodeURI(cookie));
        // $(inlogin.querySelector('.userinfo img')).attr('src', cookiejson.userIcon)
        // $(inlogin.querySelector('.userinfo span')).html(cookiejson.name)
        (<HTMLImageElement>inlogin.querySelector('.userinfo img')).src = cookiejson.userIcon || ''
        inlogin.querySelector('.userinfo span').innerHTML = cookiejson.name
        inlogin.style.display = 'block'
    }
})()

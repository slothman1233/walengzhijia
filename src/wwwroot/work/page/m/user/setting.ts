import window from '../../../common/win/windows'
import { on } from '@stl/tool-ts/src/common/event/on'
declare const mui: any
(function () {
    let settinglist = document.querySelector('.settinglist')
    on({
        agent: settinglist,
        events: 'click',
        ele: '.loginout',
        fn: function () {
            window.removeusercookie()
            window.removelocalStorageuser()
            window.location.href = '/m/index'
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

})()
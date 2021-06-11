import { kkpager } from '@stl/kkpager'
import { usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { GetNoticeByUid } from '../../common/service/ManageLepackNotice'
import { userLoginModel } from '../../../../model/common'
import window from '../../common/win/windows'
import { NotificationTypeDefine, subCodeEnums } from '../../../../enums/enums'
import { get_time_timestamp, ge_time_format } from '../../../../common/utils/util'
declare const $: JQueryStatic

declare const pageIndex: number
declare const notificationType: any
declare const systemtotalPages: any
declare const interactiveotalPages: any
declare const pageSize: any
let usercookie: userLoginModel = JSON.parse(window.getusercookie());

(function () {
    if (document.getElementById('systematic_kkpage')) {
        kkpager({
            pagerid: 'systematic_kkpage',
            total: 2, //systemtotalPages
            pno: pageIndex,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async (index: number) => {
                console.log(index)
                let systemData = await GetNoticeByUid({
                    userId: parseInt(usercookie.userId),
                    pageIndex: index,
                    pageSize,
                    notification: NotificationTypeDefine.System
                })

                if (systemData && systemData.code === 0 && systemData.subCode === subCodeEnums.success) {
                    let items = systemData.bodyMessage?.items
                    if (items && items.length > 0) {
                        let html = ''
                        for (let i = 0; i < items.length; i++) {
                            let item = items[i]
                            let time = ge_time_format(get_time_timestamp(item.noticeTime).toString(), '2')

                            html += `<a class="child" href="${item.notificationLink}" target="_blank">
                            <h3>${item.notificationTitle}
                              <span>${time}</span></h3>
                            <p>${item.notificationContent || ''}</p>
                          </a>`
                        }

                        document.querySelector('.systematic .systematic_box').innerHTML = html
                    }
                }

            }

        })
    }

    if (document.getElementById('interaction_kkpage')) {
        kkpager({
            pagerid: 'interaction_kkpage',
            total: interactiveotalPages,
            pno: pageIndex,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async (index: number) => {
                // return `/user/index/2/${t}`

                let interactiveData = await GetNoticeByUid({
                    userId: parseInt(usercookie.userId),
                    pageIndex: index,
                    pageSize,
                    notification: NotificationTypeDefine.Interactive
                })

                //----------------------------------------------

                if (interactiveData && interactiveData.code === 0 && interactiveData.subCode === subCodeEnums.success) {
                    let items = interactiveData.bodyMessage?.items
                    if (items && items.length > 0) {
                        let html = ''
                        for (let i = 0; i < items.length; i++) {
                            let item = items[i]
                            let time = ge_time_format(get_time_timestamp(item.noticeTime).toString(), '2')

                            html += `<a class="child" href="${item.notificationLink}" target="_blank">
                            <div class="title">
                              <img _src_="${item.notificationSendUserIcon}"/>
                              <p>${item.notificationSendUserName}</p>
                              <b>回答了你的提问</b>
                              <i>${JSON.parse(item.extensionJson).CommentTargetContent || ''}</i>
                            </div>
                            <p>${JSON.parse(item.extensionJson).CommentContent || ''}</p>
                            <div class="time">
                             ${time}
                            </div>
                          </a>`
                        }
                        document.querySelector('.interaction .interaction_box').innerHTML = html
                    }
                }


            }

        })
    }
})();



(function () {
    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
    })
})()
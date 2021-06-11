import { get_time_timestamp, ge_time_format } from '../../../../../common/utils/util'
import { NotificationTypeDefine, subCodeEnums } from '../../../../../enums/enums'
import { userLoginModel } from '../../../../../model/common'
import { GetNoticeByUid } from '../../../common/service/ManageLepackNotice'
import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
declare const pageSize: any
declare const $: JQueryStatic

let usercookie: userLoginModel = JSON.parse(window.getusercookie());

(function () {
    let pageIndex = 1
    let isloaded = false
    let windowscroll: any = document.onscroll
    document.onscroll = async function (ev: Event) {
        windowscroll && windowscroll(ev)
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true


            let interactiveData = await GetNoticeByUid({
                userId: parseInt(usercookie.userId),
                pageIndex: pageIndex + 1,
                pageSize,
                notification: NotificationTypeDefine.Interactive
            })

            if (interactiveData && interactiveData.code === 0 && interactiveData.subCode === subCodeEnums.success) {
                let items = interactiveData.bodyMessage?.items
                if (items && items.length > 0) {
                    let html = ''
                    for (let i = 0; i < items.length; i++) {
                        let item = items[i]
                        let time = ge_time_format(get_time_timestamp(item.noticeTime).toString(), '2')

                        html += ` <a href="${item.notificationLink}">
                        <section class="t">
                      【${item.notificationSendUserName}】<span>评论了你的口碑</span></section>
                        <section class="r">${JSON.parse(item.extensionJson).CommentTargetContent || ''}</section>
                        <p>${JSON.parse(item.extensionJson).CommentContent || ''}</p>
                        <section class="time">${time}</section>
                      </a>`

                    }
                    $('.systembox .list_box').append(html)

                    pageIndex = pageIndex + 1
                    window.imgload()
                    isloaded = items.length < parseInt(pageSize) ? true : false
                }
            }

        }
    }

})()
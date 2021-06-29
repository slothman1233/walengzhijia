import { kkpager } from '@stl/kkpager'
import { usernavigationbar } from '../../components/navigationbar'
import type { JQuery, JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { GetNoticeByUid, SetNoticeIsReadByPlat } from '../../common/service/ManageLepackNotice'
import { userLoginModel } from '../../../../model/common'
import window from '../../common/win/windows'
import { NotificationQueryTypeDefine, NotificationTypeDefine, subCodeEnums } from '../../../../enums/enums'
import { get_time_timestamp, ge_time_format } from '../../../../common/utils/util'
declare const $: JQueryStatic

declare const pageIndex: number
declare const notificationType: any
declare const systemtotalPages: any
declare const interactiveotalPages: any
declare const pageSize: any
declare let SystemReadNotice: any
declare let InteractiveReadNotice: any
let usercookie: userLoginModel = JSON.parse(window.getusercookie())

let usermain = document.querySelector('#usermain')
let systematic = usermain.querySelector('.systematic')
let interaction = usermain.querySelector('.interaction');
//首次设置已读状态
(function () {
    // let domAry: JQuery = $(systematic).find('.child[data-isread=false]')
    // setisread(domAry)
    SetNoticeIsRead(NotificationQueryTypeDefine.System)

})()

//设置已读的方法
async function setisread(domAry: JQuery) {

    setTimeout(function () {
        let object: any = {
            receiverUser: usercookie.userId,
            noticeIds: []
        }
        for (let i = 0; i < domAry.length; i++) {
            let dom = $(domAry[i])
            let id = dom.data('id')
            let type = dom.data('type')
            object.noticeIds.push({
                noticeType: parseInt(type),
                noticeId: parseInt(id)
            })
            dom.addClass('read')
            dom.data('isread', true)
        }

        SetNoticeIsRead(object)
    }, 2000)

}


async function SetNoticeIsRead(type: NotificationQueryTypeDefine) {


    if (type === NotificationQueryTypeDefine.System && !SystemReadNotice) { return }
    if (type === NotificationQueryTypeDefine.Interactive && !InteractiveReadNotice) { return }

    let data = await SetNoticeIsReadByPlat({
        userId: parseInt(usercookie.userId),
        notificationQueryType: type
    })

    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        switch (type) {
            case NotificationQueryTypeDefine.System:
                (<any>document.querySelector('.systematicdot')).style.display = 'none'
                SystemReadNotice = false
                break
            case NotificationQueryTypeDefine.Interactive:
                (<any>document.querySelector('.interactiondot')).style.display = 'none'
                InteractiveReadNotice = false
                break
            default: break
        }

    }

}

(function () {
    if (document.getElementById('systematic_kkpage')) {
        kkpager({
            pagerid: 'systematic_kkpage',
            total: systemtotalPages,
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

                            html += `<a class="child ${item.isRead ? 'read' : ''}" href="${item.notificationLink}" data-isread='${item.isRead}' data-id="${item.noticeId}" data-type="${item.notificationType}" target="_blank">
                            <h3>${item.notificationTitle}
                              <span>${time}</span></h3>
                            <p>${item.notificationContent || ''}</p>
                          </a>`
                        }

                        document.querySelector('.systematic .systematic_box').innerHTML = html



                        // setisread($(systematic).find('.child[data-isread=false]'))
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
                            console.log(item)
                            let time = ge_time_format(get_time_timestamp(item.noticeTime).toString(), '2')
                            let content = JSON.parse(item.extensionJson).CommentContent
                            let identifiableContent = '回答了你的提问'
                            switch (item.notificationType) {
                                case NotificationTypeDefine.Advisory:
                                    content = item.notificationContent
                                    identifiableContent = '给你发送了咨询销售'
                                    break
                                case NotificationTypeDefine.Comment:
                                    content = JSON.parse(item.extensionJson).CommentContent || ''
                                    identifiableContent = '回答了你的提问'
                                    break
                                case NotificationTypeDefine.ReplyComment:
                                    content = JSON.parse(item.extensionJson).CommentContent || ''
                                    identifiableContent = '评论了你发布的内容'
                                    break
                                default:
                                    break
                            }
                            let typeurl = parseInt(JSON.parse(item.extensionJson).commentTargetType) === 1 ? '/news' : '/news/reputation'
                            let url = `${typeurl}/${JSON.parse(item.extensionJson).CommentTargetId}#comments`

                            html += `<a class="child ${item.isRead ? 'read' : ''}" href="${url}" data-isread='${item.isRead}' data-id="${item.noticeId}" data-type="${item.notificationType}"  target="_blank">
                            <div class="title">
                              <img _src_="${item.notificationSendUserIcon}"/>
                              <p>${item.notificationSendUserName}</p>
                              <b>${identifiableContent}</b>
                              <i>${JSON.parse(item.extensionJson).CommentTargetContent || ''}</i>
                            </div>
                            <p>${content}</p>
                            <div class="time">
                             ${time}
                            </div>
                          </a>`
                        }
                        document.querySelector('.interaction .interaction_box').innerHTML = html


                        setisread($(interaction).find('.child[data-isread=false]'))
                        window.imgload()
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

        switch (index) {
            case 0:
                SetNoticeIsRead(NotificationQueryTypeDefine.System)
                break
            case 1:
                SetNoticeIsRead(NotificationQueryTypeDefine.Interactive)
                break
            default:
                break
        }



        // setisread(thatshowdom.find('.child[data-isread=false]'))

    })
})()


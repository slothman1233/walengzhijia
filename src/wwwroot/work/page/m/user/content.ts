



import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import { userLoginModel } from '../../../../../model/common'
import { GetReuputationPagedByUser } from '../../../common/service/ManageLepackReputaion'
import { subCodeEnums } from '../../../../../enums/enums'
import { get_time_timestamp, ge_time_format } from '../../../../../common/utils/util'

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
            let pageData = await GetReuputationPagedByUser({
                userId: parseInt(usercookie.userId),
                pageIndex: pageIndex
            })

            if (pageData && pageData.code === 0 && pageData.subCode === subCodeEnums.success) {
                let items = pageData.bodyMessage?.items
                if (items && items.length > 0) {
                    let html = ''
                    for (let i = 0; i < items.length; i++) {
                        let item = items[i]
                        let time = ge_time_format(get_time_timestamp(item.createTime).toString(), '2')

                        html += `<a href="/m/news/reputation/${item.newsId}">
                        <section class="t">${item.title}</section>
                        <p>${item.summary}</p>
                        <section class="time">${time}</section>
                      </a>`

                    }
                    $('.kb .list_box').append(html)

                    pageIndex = pageIndex + 1
                    window.imgload()
                    isloaded = items.length < 10 ? true : false
                }
            }


        }
    }

})()
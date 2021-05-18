import { kkpager } from '@stl/kkpager'
import { on } from '@stl/tool-ts/src/common/event/on'
import { navigationbar2, usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { userLoginModel } from '../../../../model/common'
import window from '../../common/win/windows'
import { DeleteReputation, GetReuputationPagedByUser } from '../../common/service/ManageLepackReputaion'
import { subCodeEnums } from '../../../../enums/enums'
import filter from '../../../../common/nunjucks/filter'
declare const tabType: any
declare const pageIndex: number
declare const totalPages: number
declare const $: JQueryStatic
let usercookie: userLoginModel = JSON.parse(window.getusercookie())

let usermain: HTMLElement = document.querySelector('#usermain');
//审核中
(function () {
    //已发布下的分页
    // if (document.getElementById('questions_kkpage')) {
    //     kkpager({
    //         pagerid: 'questions_kkpage',
    //         total: 20,
    //         pno: pageIndex,
    //         mode: 'click',
    //         isShowFirstPageBtn: false,
    //         isShowLastPageBtn: false,
    //         isShowLastPage: false,
    //         lang: {
    //             prePageText: '上一页',
    //             nextPageText: '下一页',
    //         },
    //         click: async function (i: number) {
    //             // let id = $('#usermain .drafts .navigationbar2 .select').data('id')
    //             // console.log(id)
    //             // let html = await getdata(id)
    //             // $('#usermain .drafts .child_box').html(html)
    //         }

    //     })
    // }

    if (document.getElementById('kb_kkpage')) {
        kkpager({
            pagerid: 'kb_kkpage',
            total: totalPages,
            pno: pageIndex,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async function (i: number) {

                //获取用户对应的口碑
                let pageData = await GetReuputationPagedByUser({
                    userId: parseInt(usercookie.userId),
                    pageIndex: i
                })

                if (pageData.code === 0 && pageData.subCode === subCodeEnums.success) {
                    let html = ``
                    let container = usermain.querySelector('.kb .container')
                    pageData.bodyMessage.items.forEach(item => {
                        html += `
                        <div class="child clearfix">
                        <div class="r">
                          <a href="/news/reputation/${item.newsId}" target="_blank">详情</a>
                          <a href="javascript:void(0);"  class="del" data-id="${item.reputationId}">删除</a>
                        </div>
                        <div class="l">
                        <a class="child_title" href="/news/reputation/${item.newsId}" target="_blank">
                          ${filter.delHtmlTag(item.title)}
                        </a>
                          <div class="child_summary">
                           ${filter.delHtmlTag(item.summary)}
                          </div>
                          <p>
                            <span>发表时间<i>${filter.ge_time_format(filter.get_time_timestamp(item.createTime).toString(), '2')}</i></span>
                            <span>评论<i>${item.commentCount}</i></span>
                            <span>赞<i>${item.praiseCount}</i></span>
                          </p>
                        </div>
        
                      </div>
                        `
                    })

                    container.innerHTML = html
                }
            }

        })
    }
})();

//口碑 删除
(function () {
    let container = usermain.querySelector('.kb .container')

    on({
        agent: container,
        events: 'click',
        ele: '.del',
        fn: function (dom: HTMLElement, ev: Event) {
            let id = dom.getAttribute('data-id')

            window.alert({
                title: '确定要删除这条口碑吗？',
                str: '删除后无法复原',
                type: 1,
                contentType: 2,
                successCallback: async () => {
                    console.log(id)
                    let data = await DeleteReputation({
                        reputationId: parseInt(id),
                        createUser: parseInt(usercookie.userId)
                    })

                    if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
                        alert('删除口碑成功！')
                        $(dom).parents('.child').remove()
                    } else {
                        alert('删除失败，请重新删除！')
                    }
                }
            })

        }
    })

})();

(function () {
    //tab切换
    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
    })
})()
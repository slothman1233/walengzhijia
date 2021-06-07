import { ChartstoKV } from '../../../components/chart/chart'
import imgPreview from '../../../common/utils/imgPreview/imgPreview'
import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import { navigationbar } from '../../../components/navigationbar'
import { bodyModel } from '../../../../../model/resModel'
import { on } from '@stl/tool-ts/src/common/event/on'
import { GetReputationByCompanyFilter, GetReputationByProductId } from '../../../common/service/Reputation.services'
import { NewsContentTypeArray, subCodeEnums } from '../../../../../enums/enums'
import { getcomponent } from '../../../common/service/ComponentService/ComponentService'
import { GetNewsByCompanyId, GetNewsByProductId } from '../../../common/service/news.services'
import { get_unix_time_stamp, ge_time_format } from '../../../../../common/utils/util'
declare const mui: any
declare const reshighKbChart: any
declare const companyId: any
declare const productId: any
declare const $: JQueryStatic
let product_list_box: HTMLElement = document.querySelector('#product_list_box');

//图表
(function () {
    ChartstoKV(document.getElementById(`ecahr0`), reshighKbChart)
})();
(function () {

    imgPreview({
        parentEle: document.querySelector('.productVideo'),
        key: 'video',
        videoWdith: 200,
        clickCallback: function (dom, ev) {
            // console.log(dom, ev)
            return true
        }
    })

    mui.previewImage()
    mui('.modalwrapper').scroll()
    mui('.mui-scroll-wrapper.productsummary').scroll()
    mui('.mui-scroll-wrapper.productproductargs').scroll()

    mui('#productSummary').on('tap', '.productSummaryhide', function () {
        mui('#productSummary').popover('toggle')//这是可以用来关闭底部弹窗的事件
    })
    mui('#productProductArgs').on('tap', '.sproductProductArgshide', function () {
        mui('#productProductArgs').popover('toggle')//这是可以用来关闭底部弹窗的事件
    })
    //下沉菜单中的点击事件
    mui('#modal').on('tap', 'a', function () {
        document.location.href = this.href /*本文主要就是这句代码！*/

    })
    mui(product_list_box).on('tap', 'a', function () {
        document.location.href = this.href /*本文主要就是这句代码！*/
    })
})();



// 产品、口碑、新闻切换
(function () {
    //点击排序类型触发
    navigationbar(product_list_box, async (dom: HTMLElement) => {
        let id = parseInt(dom.getAttribute('data-id'))
        $(product_list_box).find('.list_content > div').eq(id - 1).siblings().hide()
        $(product_list_box).find('.list_content > div').eq(id - 1).show()
    }, 'tap')

    let productProductArgs: HTMLElement = document.querySelector('.productProductArgs')

    productProductArgs.onclick = function () {
        let a = $(product_list_box).find('.navigationbar .list a').eq(1)[0]
        mui.trigger(a, 'tap')
        $(document).scrollTop(product_list_box.offsetTop)
    }

    let productSummary: HTMLElement = document.querySelector('.productSummary')

    productSummary.onclick = function () {
        let a = $(product_list_box).find('.navigationbar .list a').eq(0)[0]
        mui.trigger(a, 'tap')
        $(document).scrollTop(product_list_box.offsetTop)
    }

})();



//口碑
(function () {
    let pageSize = 10
    let pageIndex = 1
    let reputation = product_list_box.querySelector('.reputation')
    let list_box = reputation.querySelector('.list_box')
    let isloaded = false
    //点击二级分类
    on({
        agent: $(reputation).find('.mui-scroll'),
        events: 'tap',
        ele: 'span',
        fn: async function (dom: HTMLElement) {
            $(dom).siblings().removeClass('select')
            $(dom).addClass('select')

            let reputationType = parseInt(dom.getAttribute('data-id'))
            let option = {
                productId,
                reputationType,
                pageIndex: 1,
                pageSize
            }

            let { html, length } = await getHtml(option)
            list_box.innerHTML = html
            isloaded = length < pageSize ? true : false
            pageIndex = 1
            window.imgload()
        }
    })


    let windowscroll: any = document.onscroll
    document.onscroll = async function (ev: Event) {
        windowscroll && windowscroll(ev)
        if ($(reputation).is(':hidden')) {
            return
        }
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true
            let reputationType = $(reputation).find('.select').data('id')
            let child = list_box.querySelectorAll('.child')
            // let timeTicks = child[child.length - 1].getAttribute('data-timetick')
            let option = {
                productId,
                reputationType,
                pageIndex: pageIndex + 1,
                pageSize
            }

            let { html, length } = await getHtml(option)
            $(list_box).append(html)
            isloaded = length < pageSize ? true : false

            window.imgload()
        }
    }

    async function getHtml(option: any) {
        let length = 0
        let html = ``
        let { productId, pageIndex: pageIndexs, pageSize, reputationType } = option
        let ReputationData = await GetReputationByProductId(productId, pageIndexs, pageSize, reputationType)

        if (ReputationData.code === 0 && ReputationData.subCode === subCodeEnums.success) {
            length = ReputationData.bodyMessage.reputations.length
            let datas: bodyModel<string> = await getcomponent({ path: 'components/m/list.njk', name: 'reputationlist', data: { args: ReputationData.bodyMessage.reputations } })

            if (datas.code === 0) {
                html += datas.bodyMessage
                pageIndex = pageIndex + 1
            }
        }

        return { html, length }
    }

})();

//新闻
(function () {
    let pageSize = 10
    let news = product_list_box.querySelector('.news')
    let list_box = news.querySelector('.list_box')
    let isloaded = false
    //点击二级分类
    // on({
    //     agent: $(news).find('.mui-scroll'),
    //     events: 'tap',
    //     ele: 'span',
    //     fn: async function (dom: HTMLElement) {
    //         $(dom).siblings().removeClass('select')
    //         $(dom).addClass('select')

    //         let newsType = parseInt(dom.getAttribute('data-id'))
    //         let option = {
    //             productId,
    //             newsType,
    //             timeTicks: 0,
    //             pageSize
    //         }

    //         let { html, length } = await getHtml(option)
    //         list_box.innerHTML = html
    //         isloaded = length < pageSize ? true : false
    //         window.imgload()
    //     }
    // })


    let windowscroll: any = document.onscroll
    document.onscroll = async function (ev: Event) {
        windowscroll && windowscroll(ev)
        if ($(news).is(':hidden')) {
            return
        }
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true
            let newsType = $(news).find('.select').data('id')
            let child = list_box.querySelectorAll('.child')
            let timetick = child[child.length - 1].getAttribute('data-timetick')
            let option = {
                productId,
                newsType,
                timetick,
                pageSize
            }

            let { html, length } = await getHtml(option)
            $(list_box).append(html)
            isloaded = length < pageSize ? true : false

            window.imgload()
        }
    }

    async function getHtml(option: any) {
        let length = 0
        let html = ``
        let { productId, newsType, timetick } = option
        // let ReputationData = await GetReputationByCompanyFilter(companyId, timeTicks, pageSize, reputationType)
        //companyId?: number, newsType?: number, timetick?: number,

        let firstNewsdata = await GetNewsByProductId(productId, newsType, timetick)


        let firstNewsList: any[] = []
        //: ResNewsModel[]

        if (firstNewsdata && firstNewsdata.code === 0 && firstNewsdata.subCode === subCodeEnums.success) {
            let firstNews = firstNewsdata.bodyMessage
            firstNews.forEach((item) => {
                let link = '/m/news/' + item.newsId
                if (item.reputationId !== 0) {
                    link = '/m/news/reputation/' + item.newsId
                }
                firstNewsList.push({
                    pagetype: 'moblie',
                    link,
                    img: item.newsIcon,
                    title: item.newsTitle,
                    content: item.newsContent.replace(/<[^>]*>|/g, ''),
                    author: item.userName,
                    time: ge_time_format(item.newsTime, '2'),
                    businesslogo: item.companyIcon,
                    businessname: item.companyName,
                    timetick: get_unix_time_stamp(item.newsTime, 2),
                    slug: [NewsContentTypeArray[item.newsContentType]]
                })
            })


            length = firstNews.length
            let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: firstNewsList } })

            if (datas.code === 0) {
                html += datas.bodyMessage
            }
        }

        return { html, length }
    }

})()
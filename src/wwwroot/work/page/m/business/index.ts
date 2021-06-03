import { navigationbar } from '../../../components/navigationbar'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import { on } from '@stl/tool-ts/src/common/event/on'
import window from '../../../common/win/windows'
import { GetCompanyProductByTypeId } from '../../../common/service/product.services'
import { getcomponent } from '../../../common/service/ComponentService/ComponentService'
import { bodyModel } from '../../../../../model/resModel'
import { NewsContentTypeArray, subCodeEnums } from '../../../../../enums/enums'
import { GetReputationByCompanyFilter } from '../../../common/service/Reputation.services'
import { GetNewsByCompanyId } from '../../../common/service/news.services'
import { get_unix_time_stamp, ge_time_format } from '../../../../../common/utils/util'
declare const $: JQueryStatic
declare const companyId: any
declare const mui: any

let company_list_box = document.getElementById('company_list_box');


//关闭弹窗
(function () {
    mui('#introductory').on('tap', '.popoverhide', function () {
        mui('#introductory').popover('toggle')//这是可以用来关闭底部弹窗的事件
    })
    mui('#consultingSales').on('tap', '.saleshide', function () {
        mui('#consultingSales').popover('toggle')//这是可以用来关闭底部弹窗的事件
    })
    mui('.introductorywrapper').scroll()  
    mui('.consultingSaleswrapper').scroll()  
})();

// 产品、口碑、新闻切换
(function () {
    //点击排序类型触发
    navigationbar(company_list_box, async (dom: HTMLElement) => {
        let id = parseInt(dom.getAttribute('data-id'))
        $(company_list_box).find('.list_content > div').eq(id - 1).siblings().hide()
        $(company_list_box).find('.list_content > div').eq(id - 1).show()
    }, 'tap')
})();

//产品
(function () {
    let pageSize = 10
    let pageIndex = 1
    let product = company_list_box.querySelector('.product')
    let list_box = product.querySelector('.list_box')
    let isloaded = false
    //点击二级分类
    on({
        agent: $(product).find('.mui-scroll'),
        events: 'tap',
        ele: 'span',
        fn: async function (dom: HTMLElement) {
            $(dom).siblings().removeClass('select')
            $(dom).addClass('select')

            let productTypeId = parseInt(dom.getAttribute('data-id'))
            let option = {
                companyId,
                productTypeId,
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
        if ($(product).is(':hidden')) {
            return
        }
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true
            let productTypeId = $(product).find('.select').data('id')

            let option = {
                companyId,
                productTypeId,
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
        let GetCompanyProduct = await GetCompanyProductByTypeId(option)
        if (GetCompanyProduct.code === 0 && GetCompanyProduct.subCode === subCodeEnums.success) {
            length = GetCompanyProduct.bodyMessage.items.length
            let datas: bodyModel<string> = await getcomponent({ path: 'components/m/list.njk', name: 'productlist', data: { args: GetCompanyProduct.bodyMessage.items } })

            if (datas.code === 0) {
                html += datas.bodyMessage
                pageIndex = pageIndex + 1
            }
        }

        return { html, length }
    }

})();


//口碑
(function () {
    let pageSize = 10
    let pageIndex = 1
    let reputation = company_list_box.querySelector('.reputation')
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
                companyId,
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
                companyId,
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
        let { companyId, pageIndex: pageIndexs, pageSize, reputationType } = option
        let ReputationData = await GetReputationByCompanyFilter(companyId, pageIndexs, pageSize, reputationType)

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
    let news = company_list_box.querySelector('.news')
    let list_box = news.querySelector('.list_box')
    let isloaded = false
    //点击二级分类
    on({
        agent: $(news).find('.mui-scroll'),
        events: 'tap',
        ele: 'span',
        fn: async function (dom: HTMLElement) {
            $(dom).siblings().removeClass('select')
            $(dom).addClass('select')

            let newsType = parseInt(dom.getAttribute('data-id'))
            let option = {
                companyId,
                newsType,
                timeTicks: 0,
                pageSize
            }

            let { html, length } = await getHtml(option)
            list_box.innerHTML = html
            isloaded = length < pageSize ? true : false
            window.imgload()
        }
    })


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
                companyId,
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
        let { companyId, newsType, timetick } = option
        // let ReputationData = await GetReputationByCompanyFilter(companyId, timeTicks, pageSize, reputationType)
        //companyId?: number, newsType?: number, timetick?: number,

        let firstNewsdata = await GetNewsByCompanyId(companyId, newsType, timetick)


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
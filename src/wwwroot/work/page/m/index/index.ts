import swiper from 'swiper'
import { get_unix_time_stamp, ge_time_format } from '../../../../../common/utils/util'
import { HotCompanyDefineItems, NewsContentTypeArray, subCodeEnums } from '../../../../../enums/enums'
import { bodyModel } from '../../../../../model/resModel'
import { getcomponent } from '../../../common/service/ComponentService/ComponentService'
import { GetNewsList } from '../../../common/service/news.services'
import { navigationbar } from '../../../components/navigationbar'
import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import { GetCompanyBrand } from '../../../common/service/product.services'
import { CompanyBrand } from '../../../../../controller/product.controller'
import { on } from '@stl/tool-ts/src/common/event/on'
import { ResCompanyBrandModel } from '../../../../../model/company/resCompany'
declare const mui: any
declare const listpageSize: any
declare const $: JQueryStatic
// mui.previewImage()
//图片轮播
new swiper('#index .swiper-container', {
    watchSlidesProgress: true,
    direction: 'horizontal',
    slidesPerView: 'auto',
    loop: true,
    //  autoplay: true, //可选选项，自动滑动
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    on: {
        progress: function (t) {

        },
        setTransition: function (t) {
            // console.log('setTransition' + t)
            // for (let e = 0; e < this.slides.length; e++) { this.slides.eq(e).transition(t) }
        }
    }
});


(function () {
    //用户id
    let userId = window.getuserid()
    $('.usercenter').on('tap', function () {
        if (userId === 0) {
            window.loginshow()
            return false
        }
        return
    })

})();

(function () {
    let index = document.getElementById('index')
    on({
        agent: index,
        events: 'tap',
        ele: '.hreadlogo',
        fn: function () {
            tapTab(2)
        }
    })

    on({
        agent: index,
        events: 'tap',
        ele: '.input',
        fn: function () {
            window.location.href = '/m/search/1'
        }
    })

})();

//热门新闻
(function () {
    let isloaded = false
    let nownew = $('#index .news')
    let windowscroll: any = document.onscroll
    document.onscroll = async function (ev: Event) {
        windowscroll && windowscroll(ev)
        if (!$('#index').hasClass('mui-active')) {
            return
        }
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true

            let id = $('#index').find('.news .list .select').parent().data('id')
            let child = $('#index').find('.news .listbox .list1').find('.child')
            let timetick = $(child[child.length - 1]).data('timetick')
            let newsList = await GetNewsList(parseInt(id), parseInt(timetick))
            let NewsList: any[] = []
            if (newsList && newsList.code === 0 && newsList.subCode === subCodeEnums.success && newsList.bodyMessage) {
                newsList.bodyMessage.forEach((item) => {
                    let link = '/m/news/' + item.newsId
                    if (item.reputationId !== 0) {
                        link = '/m/news/reputation/' + item.newsId
                    }
                    NewsList.push({
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
                        slug: [NewsContentTypeArray[item.newsContentType]],
                        newsSourceType: item.newsContentType
                    })
                })
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: NewsList } })

                if (datas.code === 0) {
                    nownew.find('.listbox').append(datas.bodyMessage)
                    isloaded = newsList.bodyMessage.length < 10 ? true : false

                    window.imgload()
                }
            }



        }
    }

    navigationbar(nownew[0], async (dom: HTMLElement) => {
        let id = dom.getAttribute('data-id')
        console.log(id)
        let newsList = await GetNewsList(parseInt(id))
        // console.log(newsList)
        let NewsList: any[] = []
        if (newsList.code === 0 && newsList.subCode === subCodeEnums.success && newsList.bodyMessage) {

            newsList.bodyMessage.forEach((item) => {
                let link = '/m/news/' + item.newsId
                if (item.reputationId !== 0) {
                    link = '/m/news/reputation/' + item.newsId
                }
                NewsList.push({
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
            let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: NewsList } })

            if (datas.code === 0) {
                nownew.find('.listbox').html(datas.bodyMessage)
                isloaded = false
                window.imgload()
            }
            isloaded = false
        }
    })



})();



//触发tab事件
(function () {
    let tab_list_2 = document.querySelectorAll('.tab_list_2')
    tab_list_2.forEach(item => {
        item.addEventListener('tap', () => {
            tapTab(1)
        })
    })

    //grup的点击时候
    let group = document.querySelector('#index .group').querySelectorAll('.child')
    group.forEach(item => {
        let list = $('#list')
        let category = list.find('.category')
        item.addEventListener('tap', () => {
            let tab = 0
            if ($(item).hasClass('synthesize')) {
                tab = 0
            } else if ($(item).hasClass('reputation')) {
                tab = 1
            } else if ($(item).hasClass('hot')) {
                tab = 2
            } else {
                return
            }
            mui.trigger(category.find('a')[tab], 'tap')
            tapTab(1)
        })
    })


})();

//个人中心头部
(function () {

    let usercenter = document.querySelector('#usercenter')

    on({
        agent: usercenter,
        events: 'tap',
        ele: '.tohome',
        fn: function () {
            mui.trigger(category.find('a')[0], 'tap')
            tapTab(1)
        }
    })

})()

//主动触发tab事件 index传触发的下标
function tapTab(index: number) {
    let items = mui('.footer .mui-tab-item')
    mui.trigger(items[index], 'touchstart')
    mui.trigger(items[index], 'tap')
}



//------------------------  list -------------------------------------------------
let pageIndex = 1
let list = $('#list')
let category = list.find('.category')
let sCategories = list.find('.sCategories')
let list_box = list.find('.list_box');
(function () {
    let isloaded = false
    //点击排序类型触发
    navigationbar(category[0], async (dom: HTMLElement) => {
        let tabIndex = dom.getAttribute('data-id')
        let productType = sCategories.find('.select').data('id')
        let option = {
            productType,
            classifyType: 0,
            pageIndex: 1,
            pageSize: listpageSize,
            queryType: parseInt(tabIndex)
        }
        let { html } = await getlistHTML(option)
        list_box.html(html)
        pageIndex = 1
        isloaded = false
        window.imgload()
    }, 'tap')

    //点击二级分类
    on({
        agent: sCategories.find('.mui-scroll'),
        events: 'tap',
        ele: 'span',
        fn: async function (dom: HTMLElement, ev: Event) {
            $(dom).siblings().removeClass('select')
            $(dom).addClass('select')

            let tabIndex = category.find('.navigationbar .select').parent().data('id')
            let productType = dom.getAttribute('data-id')
            let option = {
                productType: parseInt(productType),
                classifyType: 0,
                pageIndex: 1,
                pageSize: listpageSize,
                queryType: parseInt(tabIndex)
            }
            let { html } = await getlistHTML(option)
            list_box.html(html)
            pageIndex = 1
            isloaded = false
            window.imgload()

        }
    })


    let windowscroll: any = document.onscroll
    document.onscroll = async function (ev: Event) {
        windowscroll && windowscroll(ev)
        if (!$('#list').hasClass('mui-active')) {
            return
        }
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true

            let tabIndex = category.find('.navigationbar .select').parent().data('id')
            let productType = sCategories.find('.select').data('id')

            let option = {
                productType: parseInt(productType),
                classifyType: 0,
                pageIndex: pageIndex + 1,
                pageSize: listpageSize,
                queryType: parseInt(tabIndex)
            }
            let { html, length } = await getlistHTML(option)
            list_box.append(html)
            isloaded = length < parseInt(listpageSize) ? true : false
            pageIndex = pageIndex + 1
            window.imgload()
        }
    }

})()


async function getlistHTML(obj: CompanyBrand) {
    let html = ``
    let data = await GetCompanyBrand(obj)
    let GetCompanyJson: any
    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        GetCompanyJson = data.bodyMessage
        let companylistJson: any[] = []
        if (GetCompanyJson?.items) {
            GetCompanyJson.items.forEach((item: ResCompanyBrandModel) => {
                if (item.company) {
                    companylistJson.push({
                        pagetype: 'moblie',
                        logo: item.company.logo,
                        link: '/m/business/' + item.company.companyId,
                        name: item.company.abbrName,
                        kbscore: item.company.reputation.score,
                        classify: item.productTypes,
                        kbcount: item.totalReputationCount,
                        favorablerate: item.favorableRate * 100,
                        kbgood: item.highReputationCount,
                        label: item.company.companyLabels,
                        brandtype: HotCompanyDefineItems[item.company.hotType]
                    })
                }

            })
        }
        let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list2', data: { args: companylistJson } })
        if (dataobj.code === 0) {
            html = dataobj.bodyMessage
        }
    }
    return { html, length: GetCompanyJson.items.length || 0 }
}

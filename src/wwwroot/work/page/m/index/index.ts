import swiper from 'swiper'
import { get_unix_time_stamp, ge_time_format } from '../../../../../common/utils/util'
import { NewsContentTypeArray, subCodeEnums } from '../../../../../enums/enums'
import { bodyModel } from '../../../../../model/resModel'
import { getcomponent } from '../../../common/service/ComponentService/ComponentService'
import { GetNewsList } from '../../../common/service/news.services'
import { navigationbar } from '../../../components/navigationbar'
import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
declare const mui: any
declare const $: JQueryStatic
// mui.previewImage()


//图片轮播
new swiper('#index .swiper-container', {
    watchSlidesProgress: !0,
    direction: 'horizontal',
    //  autoplay: true, //可选选项，自动滑动
    centeredSlides: !0,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    loop: true,
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

//热门新闻
(function () {
    let isloaded = false
    let nownew = $('#index .news')
    document.onscroll = async function () {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true

            let id = $('#index').find('.news .list .select').parent().data('id')
            console.log(id)
            let child = $('#index').find('.news .listbox .list1').find('.child')
            let timetick = $(child[child.length - 1]).data('timetick')
            let newsList = await GetNewsList(parseInt(id), parseInt(timetick))
            let NewsList: any[] = []
            if (newsList.code === 0 && newsList.subCode === subCodeEnums.success && newsList.bodyMessage) {
                newsList.bodyMessage.forEach((item) => {
                    let link = '/news/' + item.newsId
                    if (item.reputationId !== 0) {
                        link = '/news/reputation/' + item.newsId
                    }
                    NewsList.push({
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
                    nownew.find('.listbox').append(datas.bodyMessage)
                    isloaded = false

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
                let link = '/news/' + item.newsId
                if (item.reputationId !== 0) {
                    link = '/news/reputation/' + item.newsId
                }
                NewsList.push({
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



})()

//主动触发tab事件 index传触发的下标
function tapTab(index: number) {
    let items = mui('.footer .mui-tab-item')
    mui.trigger(items[index], 'touchstart')
    mui.trigger(items[index], 'tap')
}
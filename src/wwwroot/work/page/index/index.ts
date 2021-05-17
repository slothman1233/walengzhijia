/// <refrence path="../../assets/plugin/jquery/index.d.ts" />;

import { imageSlider } from '@stl/image-slider'
import { index } from '@stl/tool-ts/src/common/compatible'
import { addClass, hide, removeClass, show } from '@stl/tool-ts/src/common/dom'
import { on } from '@stl/tool-ts/src/common/event'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { GetHighQualityReputationRm } from '../../common/service/Reputation.services'
import { Charts } from '../../components/chart/chart'
import { ResReputationModel, ResReputationScoreStatisticsModel } from '../../../../model/reputation/resreputation'
import { NewsContentTypeArray, subCodeEnums } from '../../../../enums/enums'
import { GetNewsList } from '../../common/service/news.services'
import { get_unix_time_stamp, ge_time_format } from '../../../../common/utils/util'
import { navigationbar } from '../../components/navigationbar'
import window from '../../common/win/windows'
declare const $: JQueryStatic
declare const reshighKbChart: any[]

// eslint-disable-next-line no-undef
declare const document: Document




(function () {
    try {
        let imgSliders = new imageSlider({
            sliderWindowId: 'slider_parents',
            intervals: 3000,
            time: 500,
            hover: false,
            switchType: 'hover',
            sliderDomId: 'slider_doms',
            sliderListName: '.slider_list',
            switch: false
        })
    } catch (e) { }
})();

(function () {
    let brand = document.querySelector('.brand')

    let list = brand.querySelector('.list')

    let list_box = brand.querySelector('.list_box')



    //热门品牌
    on({
        agent: list,
        events: 'mouseover',
        ele: 'a',
        fn: function (dom: any) {
            let ins = index(dom)

            for (let i = 0; i < list.querySelectorAll('a').length; i++) {
                let dom = list.querySelectorAll('a')[i]
                if (i === ins) {
                    addClass(dom.querySelector('span'), 'select')
                    continue
                }
                removeClass(dom.querySelector('span'), 'select')
            }

            hide(list_box.querySelectorAll('.list_item'))

            show(list_box.querySelectorAll('.list_item')[ins])
        }
    })


})();


// 优质口碑 
(function () {
    //优质口碑首次加载
    reshighKbChart.forEach((item: any, index: number) => {
        Charts(document.getElementById(`ecahr${index}`), item)
    })

    //换一批
    let kbsuperior: any = document.querySelector('.kbsuperior')
    let sub: any = kbsuperior.querySelector(' .row a')
    sub.onclick = async function () {
        let kblist1 = kbsuperior.querySelector('.kblist1')
        let highKb = await GetHighQualityReputationRm()
        let reshighKb: any[] = []
        let reshighKbChart: any[] = []

        if (highKb === null || highKb.code === -1) { return }


        highKb.bodyMessage.forEach((item: ResReputationModel) => {
            reshighKb.push({
                hread: item.userIcon,
                img: item.productCover,
                name: item.userName,
                kbscore: item.statisticsModel.score,
                link: `/business/product/${item.companyId}/${item.productId}`,
                title: item.productName,
                description: item.summary
            })

            let name: any[] = []
            let value: any[] = []
            item.statisticsModel.reputationScore.forEach((kbitem: ResReputationScoreStatisticsModel) => {
                name.push(kbitem.reputationTypeName)
                value.push(kbitem.reputationScore)
            })
            reshighKbChart.push({
                name,
                value
            })
        })



        let data: bodyModel<String> = await getcomponent({ path: 'components/list.njk', name: 'kblist1', data: { args: reshighKb } })
        if (data.code === 0) {
            kblist1.outerHTML = data.bodyMessage

            reshighKbChart.forEach((item: any, index: number) => {
                Charts(document.getElementById(`ecahr${index}`), item)
            })

        }

    }
})();


//热门口碑
(function () {
    let isloaded = false
    let nownew = $('.information .nownew')
    document.onscroll = async function () {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true

            let id = $('#main').find('.nownew .list .select').parent().data('id')
            let child = $('#main').find('.nownew .list_box .list1').find('.child')
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
                        author: item.createUser,
                        time: ge_time_format(item.newsTime, '2'),
                        businesslogo: item.companyIcon,
                        businessname: item.userName,
                        timetick: get_unix_time_stamp(item.newsTime, 2),
                        slug: [NewsContentTypeArray[item.newsContentType]]
                    })
                })
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: NewsList } })

                if (datas.code === 0) {
                    nownew.find('.list_box').append(datas.bodyMessage)
                    isloaded = false

                    window.imgload()
                }
            }



        }
    }

    navigationbar(nownew[0], async (dom: HTMLElement) => {
        let id = dom.getAttribute('data-id')
        let newsList = await GetNewsList(parseInt(id))
        console.log(newsList)
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
                    author: item.createUser,
                    time: ge_time_format(item.newsTime, '2'),
                    businesslogo: item.companyIcon,
                    businessname: item.userName,
                    timetick: get_unix_time_stamp(item.newsTime, 2),
                    slug: [NewsContentTypeArray[item.newsContentType]]
                })
            })
            let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: NewsList } })

            if (datas.code === 0) {
                nownew.find('.list_box').html(datas.bodyMessage)
                isloaded = false
                window.imgload()
            }
            isloaded = false
        }
    })



})()


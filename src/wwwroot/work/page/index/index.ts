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
declare const highKb: any[]
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

    let row: HTMLElement = brand.querySelector('.row')

    let list: HTMLElement = brand.querySelector('.list')

    let list_box = brand.querySelector('.list_box')

    // 导航条点击滚动
    let ulWidth = 0 // 计算ul总宽度
    let innerWidth = list.offsetWidth

    //自动滚动居中的效果
    function activefun(dom:any) {
        ulWidth = 0
        // 设置class
        $(list).find('a').each(function () {
            ulWidth += this.offsetWidth + 24 // 累加宽度
        })

        // 判断点击元素是否超过一半
        let width = innerWidth / 2 //一半屏幕宽度
        let leftw = (dom.offsetWidth / 2) + dom.offsetLeft // 点击元素中点距离屏幕左侧
        let rightw = ulWidth - leftw // 点击元素中点距离屏幕右侧
        if (leftw > width) {
            // 使用animate设置scrollLeft，
            $(list).animate({ scrollLeft: leftw - width }) // 滚动到中间
        } else if (rightw < width) {
            $(list).animate({ scrollLeft: (window.devicePixelRatio * innerWidth) - ulWidth }) // 滚动到末尾
        } else {
            $(list).animate({ scrollLeft: 0 }) //滚动到最前
        }
    }

    navigationbar(row, function (dom: any) {
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


        activefun(dom)
    })
  
})();


// 优质口碑 
(function () {
    //换一批
    let kbindex = 0
    let highKbArg: ResReputationModel[][] = []
    let arg: ResReputationModel[] = []
    if (highKb !== null || highKb.length > 0) {
        highKb.forEach((item, index) => {
            if (index !== 0 && index % 3 === 0) {
                highKbArg.push(arg)
                arg = []
            }
            arg.push(item)
        })
    }
    if (arg.length > 0) {
        highKbArg.push(arg)
        arg = []
    }


    //优质口碑首次加载
    reshighKbChart.forEach((item: any, index: number) => {
        Charts(document.getElementById(`ecahr${index}`), item)
    })


    let kbsuperior: any = document.querySelector('.kbsuperior')
    let sub: any = kbsuperior.querySelector(' .row a')
    sub.onclick = async function () {
        if (kbindex >= 2) {
            kbindex = -1
        }
        let kblist1 = kbsuperior.querySelector('.kblist1')
        // let highKb = await GetHighQualityReputationRm()
        let reshighKb: any[] = []
        let reshighKbAll: any[] = []
        let reshighKbChart: any[] = []

        if (highKb === null || highKb.length <= 0) { return }


        if (highKbArg.length > kbindex + 1) {
            kbindex = kbindex + 1
        }

        highKbArg[kbindex].forEach((item: ResReputationModel) => {
            reshighKb.push({
                hread: item.userIcon,
                img: item.productCover,
                name: item.userName,
                kbscore: item.statisticsModel.score,
                link: `/business/product/${item.companyId}/${item.productId}`,
                title: item.productName,
                description: item.summary,
                newsId: item.newsId
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

        window.imgload()

    }
})();


//热门新闻
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
                nownew.find('.list_box').html(datas.bodyMessage)
                isloaded = false
                window.imgload()
            }
            isloaded = false
        }
    })



})()



function scrollTabX() {


    let brand = document.querySelector('.brand')

    let row: HTMLElement = brand.querySelector('.row')

    let list: HTMLElement = brand.querySelector('.list')

    let list_box = brand.querySelector('.list_box')

    // 导航条点击滚动
    let ulWidth = 0 // 计算ul总宽度
    let innerWidth = 1184
    function activefun(event:any) {
        let { target } = event
        ulWidth = 0
        // 设置class
        $(list).find('a').each(function () {
            ulWidth += (<any>$(this)).offsetWidth // 累加宽度
        })

        // 判断点击元素是否超过一半
        let width = innerWidth / 2 //一半屏幕宽度
        let leftw = (target.offsetWidth / 2) + target.offsetLeft // 点击元素中点距离屏幕左侧
        let rightw = ulWidth - leftw // 点击元素中点距离屏幕右侧
        if (leftw > width) {
            // 使用animate设置scrollLeft，
            $(list).animate({ scrollLeft: leftw - width }) // 滚动到中间
        } else if (rightw < width) {
            $(list).animate({ scrollLeft: (window.devicePixelRatio * innerWidth) - ulWidth }) // 滚动到末尾
        } else {
            $(list).animate({ scrollLeft: 0 }) //滚动到最前
        }
    }
}

// <div id="nav">
// <ul>
//   <li onclick="activefun(event)"><a href="#" class="active" >首页</a></li>
//   <li onclick="activefun(event)"><a href="#">二级页面1</a></li>
//   <li onclick="activefun(event)"><a href="#">二级页面2</a></li>
//   <li onclick="activefun(event)"><a href="#">二级页面3</a></li>
//   <li onclick="activefun(event)"><a href="#">二级页面4</a></li>
//   <li onclick="activefun(event)"><a href="#">二级页面5</a></li>
// </ul>
// </div>
// ————————————————
// 版权声明：本文为CSDN博主「weixin_43957510」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/weixin_43957510/article/details/117463420
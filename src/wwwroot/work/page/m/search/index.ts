import { bodyModel } from '../../../../../model/resModel'
import { getcomponent } from '../../../common/service/ComponentService/ComponentService'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import window from '../../../common/win/windows'
import { search } from '../../../common/service/search.services'
import { QueryCompanyModel, QueryNewsModel } from '../../../../../model/search/search'
import { HotCompanyDefineItems, NewsContentTypeArray, QueryResultType, searchqueryType, subCodeEnums } from '../../../../../enums/enums'
import { get_unix_time_stamp, ge_time_format } from '../../../../../common/utils/util'
import { navigationbar } from '../../../components/navigationbar'
import { on } from '@stl/tool-ts/src/common/event'
declare const $: JQueryStatic
declare let type: any
declare let keyword: string
declare let newsTimeTicks: any
declare let companyTimeTicks: any
let localStorageSearch = 'localStorageSearch';
// (function () {
//     let search = document.querySelector('#main .search')
//     let btn = search.querySelector('a')
//     let input = search.querySelector('input')
//     btn.onclick = function () {
//         if (input.value.length <= 0) {
//             alert('清输入搜索内容')
//         }

//         document.location.href = `/search/1/${encodeURI(input.value)}`

//     }

// })()



(function () {
    let searchheader: HTMLElement = document.querySelector('.searchheader')
    let searchfilter: HTMLElement = document.querySelector('.searchfilter')
    let searchresult: HTMLElement = document.querySelector('.searchresult')
    let search: HTMLInputElement = searchfilter.querySelector('.searchheader input')



    if (keyword.length <= 0) {
        setTimeout(() => {
            search.focus()
        }, 100)
        searchfilter.style.display = 'block'
    } else {
        searchresult.style.display = 'block'
    }

    $('body').on('touchend', function (el: any) {
        let dom = el.target
        if (el.target.tagName !== 'INPUT' || !$(dom).hasClass('sr')) {
            search.blur()
        }
    })

    on({
        agent: searchheader,
        events: 'tap',
        ele: 'input',
        fn: function () {
            searchfilter.style.display = 'block'
            searchresult.style.display = 'none'

        }
    })

})();

//tab 切换
(function () {
    let container: HTMLElement = document.querySelector('.searchresult .container')
    navigationbar(container, (dom: HTMLElement) => {
        type = dom.getAttribute('data-id')
        let child_parent = document.querySelectorAll('.searchresult .container .container_box > div')[parseInt(type) - 1]
        $(child_parent).siblings().hide()
        $(child_parent).show()

    }, 'tap')
})()

//txtvalue 检索的内容替换 
function pat(txtvalue: string) {
    txtvalue = (<any>txtvalue.replace)(eval('/(' + keyword + ')/ig'), `<em>$1</em>`)
    return txtvalue
}


let newsTimeTicksAry = [0, 0]
let companyTimeTicksAry = [0, 0]
async function getHtml(timeTicks: number) {
    //type 的范围只能是1 或者 2
    if ((parseInt(type) !== 1 && parseInt(type) !== 2)) {
        type = 1
    }

    //搜索结果
    let data = await search({
        searchContent: keyword,
        newsTimeTicks: newsTimeTicksAry[type - 1],
        companyTimeTicks: companyTimeTicksAry[type - 1],
        queryType: type
    })
    let bsuinessAry: any[] = []
    let newsAry: any[] = []
    if (data && data.code === 0 && data.subCode === subCodeEnums.success) {

        data.bodyMessage.forEach((item: QueryCompanyModel | QueryNewsModel) => {

            switch (item.queryResultType) {
                case searchqueryType.all:
                    let d = <QueryCompanyModel>item
                    bsuinessAry.push({
                        logo: d.company.logo,
                        link: '/m/business/' + d.company.companyId,
                        name: pat(d.company.abbrName),
                        kbscore: d.reputationScore,
                        classify: d.productTypes,
                        kbcount: d.totalReputationCount,
                        favorablerate: d.favorableRate * 100,
                        kbgood: d.highReputationCount,
                        label: d.company.companyLabels,
                        brandtype: HotCompanyDefineItems[d.company.hotType],
                        timetick: get_unix_time_stamp(d.company.createTime, 2)
                    })
                    break
                case searchqueryType.company:
                    let newsd = <QueryNewsModel>item
                    let link = '/m/news/' + newsd.newsId
                    if (newsd.reputationId !== 0) {
                        link = '/m/news/reputation/' + newsd.newsId
                    }
                    newsAry.push({
                        link,
                        img: newsd.newsIcon,
                        title: pat(newsd.newsTitle),
                        content: newsd.newsContent.replace(/<[^>]*>|/g, ''),
                        author: newsd.userName,
                        time: ge_time_format(newsd.newsTime, '2'),
                        businesslogo: newsd.companyIcon,
                        businessname: newsd.companyName,
                        timetick: get_unix_time_stamp(newsd.newsTime, 2),
                        slug: [NewsContentTypeArray[newsd.newsContentType]]
                    })
                    break
                default:
                    break
            }

        })
        //搜索的时候
        if (timeTicks === 0) {
            newsTimeTicksAry[0] = newsTimeTicksAry[1] = newsAry[newsAry.length - 1]?.timetick || newsTimeTicks
            companyTimeTicksAry[0] = companyTimeTicksAry[1] = bsuinessAry[bsuinessAry.length - 1]?.timetick || companyTimeTicks
        } else {
            newsTimeTicksAry[type - 1] = newsAry[newsAry.length - 1]?.timetick || newsTimeTicksAry[type - 1]
            companyTimeTicksAry[type - 1] = bsuinessAry[bsuinessAry.length - 1]?.timetick || companyTimeTicksAry[type - 1]
        }

    }


    let html = ``
    let bsuinesshtml = ``
    if (bsuinessAry.length > 0) {
        let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list2', data: { args: bsuinessAry } })
        if (dataobj.code === 0) {
            html += dataobj.bodyMessage
            bsuinesshtml = dataobj.bodyMessage
        }
    }

    if (newsAry.length > 0) {
        let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: newsAry } })
        if (dataobj.code === 0) {
            html += dataobj.bodyMessage
        }
    }

    return { html, bsuinesshtml, bsuinesslength: bsuinessAry.length, length: bsuinessAry.length + newsAry.length }
}
let isloaded = [false, false];
//滚动加载更多
(function () {

    document.onscroll = async function (e) {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 300) {
            if (isloaded[parseInt(type) - 1]) { return }
            isloaded[parseInt(type) - 1] = true

            let child_parent = document.querySelectorAll('.searchresult .container .container_box > div')[parseInt(type) - 1]

            let child = child_parent.querySelectorAll('.child')

            let { html, length } = await getHtml(parseInt(child[child.length - 1].getAttribute('data-timetick')))

            $(child_parent).append(html)

            isloaded[parseInt(type) - 1] = length >= 10 ? false : true

            window.imgload()
        }
    }

})();

//历史记录初始化
(function () {
    let searchfilter = document.querySelector('.searchfilter')
    let container = $(searchfilter.querySelector('.container'))
    let cacheAry = getCache()
    let html = ``
    cacheAry.forEach((value: string) => {
        html += `<div>
                    <i class="iconfont_wlzj">&#xE039;</i>
                    <span>${value}</span>
                </div>`
    })
    container.append(html)


    on({
        agent: container[0],
        events: 'tap',
        ele: 'i',
        fn: function (dom: HTMLElement) {
            $(dom).parent().remove()
            let value = $(dom).siblings().text()
            let cacheAry = getCache()

            let index = cacheAry.indexOf(value)

            cacheAry.splice(index, 1)
            localStorage.setItem(localStorageSearch, JSON.stringify(cacheAry))
        }
    })

    on({
        agent: container[0],
        events: 'tap',
        ele: 'span',
        fn: function (dom: HTMLElement) {
            setHtml(dom.innerText)
            setTimeout(() => {
                let searchfilter: HTMLElement = document.querySelector('.searchfilter')
                let searchresult: HTMLElement = document.querySelector('.searchresult')
                let resultinput: HTMLInputElement = searchresult.querySelector('.searchheader input')
                let search: HTMLInputElement = searchfilter.querySelector('.searchheader input')
                searchfilter.style.display = 'none'
                searchresult.style.display = 'block'
                search.value = dom.innerText
                resultinput.value = dom.innerText
            }, 50)

        }
    })


})();

//删除搜索内容
(function () {
    let searchfilter = document.querySelector('.searchfilter')
    let searchheader = searchfilter.querySelector('.searchheader')
    let input: HTMLInputElement = searchheader.querySelector('input')
    on({
        agent: searchheader,
        events: 'tap',
        ele: '.close',
        fn: function () {
            input.value = ''
        }
    })

})();

//点击取消
(function () {
    let searchfilter: HTMLElement = document.querySelector('.searchfilter')
    let searchresult: HTMLElement = document.querySelector('.searchresult')
    let cancel = searchfilter.querySelector('.cancel')
    on({
        agent: searchfilter,
        events: 'tap',
        ele: '.cancel',
        fn: function () {
            searchfilter.style.display = 'none'
            searchresult.style.display = 'block'
        }
    })
})()



window.search = async function () {
    let searchfilter: HTMLElement = document.querySelector('.searchfilter')
    let searchresult: HTMLElement = document.querySelector('.searchresult')
    let search: HTMLInputElement = searchfilter.querySelector('.searchheader input')

    if (search.value.length <= 0) {
        return
    }

    let cacheAry = getCache()

    setHtml(search.value)

    search.blur();

    (<HTMLInputElement>searchresult.querySelector('.searchheader input')).value = search.value

    searchfilter.style.display = 'none'
    searchresult.style.display = 'block'



    if (cacheAry.indexOf(search.value) <= -1) {

        let searchhtml = `<div>
                    <i class="iconfont_wlzj">&#xE039;</i>
                    <span>${search.value}</span>
                </div>`
        $(searchfilter.querySelector('.container')).append(searchhtml)

        setCache(search.value)
    }

}

async function setHtml(value: string) {
    let searchresult = document.querySelector('.searchresult')
    let container_box = searchresult.querySelector('.container_box')
    let oldType = type

    keyword = value
    newsTimeTicks = 0
    companyTimeTicks = 0
    type = 1
    let searchresultData = await getHtml(0)
    if (searchresultData.length <= 0) {
        $(container_box.querySelector('.synthesize')).html(` <div class="nocontent">
        <img _src_="/assets/images/empty.png"/>
      </div>`)
        isloaded[0] = true
    } else {
        $(container_box.querySelector('.synthesize')).html(searchresultData.html)
        isloaded[0] = false
    }


    if (searchresultData.bsuinesslength <= 0) {
        $(container_box.querySelector('.business')).html(` <div class="nocontent">
        <img _src_="/assets/images/empty.png"/>
      </div>`)
        isloaded[1] = true
    } else {
        $(container_box.querySelector('.business')).html(searchresultData.bsuinesshtml)
        isloaded[1] = false
    }


    window.imgload()

    type = oldType
}

//读取cache
function getCache() {
    let cache = localStorage.getItem(localStorageSearch)
    if (!cache) { cache = '[]' }
    let cacheAry = JSON.parse(cache)
    return cacheAry
}


//写入cache
function setCache(value: string) {
    let cacheAry = getCache()
    if (cacheAry.indexOf(value) <= -1) {
        cacheAry.push(value)
        localStorage.setItem(localStorageSearch, JSON.stringify(cacheAry))
    }
}
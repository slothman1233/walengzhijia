import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import window from '../../common/win/windows'
import { search } from '../../common/service/search.services'
import { QueryCompanyModel, QueryNewsModel } from '../../../../model/search/search'
import { HotCompanyDefineItems, NewsContentTypeArray, QueryResultType, searchqueryType, subCodeEnums } from '../../../../enums/enums'
import { get_unix_time_stamp, ge_time_format } from '../../../../common/utils/util'
declare const $: JQueryStatic
declare let type: any
declare let keyword: string
declare let newsTimeTicks: any
declare let companyTimeTicks: any
(function () {
    let search = document.querySelector('#main .search')
    let btn = search.querySelector('a')
    let input = search.querySelector('input')
    btn.onclick = function () {
        if (input.value.length <= 0) {
            alert('清输入搜索内容')
        }

        document.location.href = `/search/1/${encodeURI(input.value)}`

    }

    let isfocus = false
    input.onfocus = function () {
        isfocus = true
    }
    input.onblur = function () {
        isfocus = false
    }

    document.onkeypress = function (e) {
        let keycode = document.all ? e.keyCode : e.which
        if (keycode === 13 && isfocus) {
            document.location.href = `/search/1/${encodeURI(input.value)}`
            return false
        }
    }

})()





//txtvalue 检索的内容替换 
function pat(txtvalue: string) {
    txtvalue = (<any>txtvalue.replace)(eval('/(' + keyword + ')/ig'), `<em>$1</em>`)
    return txtvalue
}

async function getHtml(timeTicks: number) {
    //type 的范围只能是1 或者 2
    if ((parseInt(type) !== 1 && parseInt(type) !== 2)) {
        type = 1
    }

    //搜索结果
    let data = await search({
        searchContent: keyword,
        newsTimeTicks: newsTimeTicks,
        companyTimeTicks: companyTimeTicks,
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
                        link: '/business/' + d.company.companyId,
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
                    let link = '/news/' + newsd.newsId
                    if (newsd.reputationId !== 0) {
                        link = '/news/reputation/' + newsd.newsId
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

        newsTimeTicks = newsAry[newsAry.length - 1]?.timetick || newsTimeTicks
        companyTimeTicks = bsuinessAry[bsuinessAry.length - 1]?.timetick || companyTimeTicks
    }

    let html = ``
    if (bsuinessAry.length > 0) {
        let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list2', data: { args: bsuinessAry } })
        if (dataobj.code === 0) {
            html += dataobj.bodyMessage
        }
    }

    if (newsAry.length > 0) {
        let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: { args: newsAry } })
        if (dataobj.code === 0) {
            html += dataobj.bodyMessage
        }
    }



    return { html, length: bsuinessAry.length + newsAry.length }
}
let isloaded = false;
(function () {

    document.onscroll = async function (e) {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 300) {
            if (isloaded) { return }
            isloaded = true

            let child = document.getElementById('main').querySelector('.list_box').querySelectorAll('.child')

            let { html, length } = await getHtml(parseInt(child[child.length - 1].getAttribute('data-timetick')))

            $(document.getElementById('main').querySelector('.list_box')).append(html)
            isloaded = length >= 10 ? false : true


            window.imgload()
        }
    }

})()
import { kkpager } from '@stl/kkpager'
import { addClass } from '@stl/tool-ts/src/common/dom/addClass'
import { removeClass } from '@stl/tool-ts/src/common/dom/removeClass'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import { on } from '@stl/tool-ts/src/common/event'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { navigationbar2 } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { GetCompanyProductByTypeId } from '../../common/service/product.services'
import { NewsContentTypeArray, subCodeEnums } from '../../../../enums/enums'
import { productTypeListModel } from '../../../../model/reputation/reputation'
import { ResCompanyProductInfoModel, ResReputationModel, ResReputationScoreStatisticsModel } from '../../../../model/reputation/resreputation'
import { Charts } from '../../components/chart/chart'
import { GetReputationByCompany } from '../../common/service/Reputation.services'
import { GetNewsByCompanyId } from '../../common/service/news.services'
import { get_unix_time_stamp, ge_time_format } from '../../../../common/utils/util'
import imgPreview from '../../common/utils/imgPreview/imgPreview'
import window from '../../common/win/windows'
declare const $: JQueryStatic
// eslint-disable-next-line no-undef
declare const document: Document
declare const echarts: any
declare const companyId: any
declare const reshighKbChart: any[]
declare const pageIndex: any
declare const totalPages: any
declare const pageSize: any
//公司介绍视频
(function () {

    imgPreview({
        parentEle: document.querySelector('#main .row1 .left span'),
        key: 'video',
        IsBox: true,
        clickCallback: function (dom, ev) {
            // console.log(dom, ev)
            return true
        }
    })
})();

(function () {
    if (totalPages > 1) {
        let row2 = document.querySelector('.row2')
        let productTypeId = parseInt(document.getElementById('product').querySelector('.select').getAttribute('data-id'))
        let container_box = row2.querySelector('.container_box')
        kkpager({
            pagerid: 'kkpage',
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
                let { datajson, html } = await GetCompanyProduct({ companyId, productTypeId, pageIndex: i, pageSize })
                container_box.innerHTML = html
                window.imgload()
            }
        })
    }

})();


//全部产品
(async function () {
    let row2 = document.querySelector('.row2')

    navigationbar2('product', async (dom: HTMLElement) => {
        let productTypeId = parseInt(dom.getAttribute('data-id'))

        let { datajson, html } = await GetCompanyProduct({ companyId, productTypeId, pageIndex, pageSize })

        if (datajson.code === 0 && datajson.subCode === subCodeEnums.success) {
            let container_box = row2.querySelector('.container_box')
            container_box.innerHTML = html
            window.imgload()
            let kkpage = row2.querySelector('#kkpage')
            kkpage.innerHTML = ''
            kkpager({
                pagerid: 'kkpage',
                total: datajson.bodyMessage.totalPages,
                pno: datajson.bodyMessage.pageIndex,
                mode: 'click',
                isShowFirstPageBtn: false,
                isShowLastPageBtn: false,
                isShowLastPage: false,
                lang: {
                    prePageText: '上一页',
                    nextPageText: '下一页',
                },
                click: async function (i: number) {
                    let { datajson, html } = await GetCompanyProduct({ companyId, productTypeId, pageIndex: i, pageSize })
                    container_box.innerHTML = html
                    window.imgload()
                }
            })
        }
    })

})()

async function GetCompanyProduct({ companyId,
    productTypeId,
    pageIndex,
    pageSize }: any) {


    let html = ''
    //
    let datajson = await GetCompanyProductByTypeId({
        companyId,
        productTypeId,
        pageIndex,
        pageSize
    })

    if (datajson.code === 0 && datajson.subCode === subCodeEnums.success) {
        let data: ResCompanyProductInfoModel[] = datajson.bodyMessage.items
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let star: bodyModel<string> = await getcomponent({ path: 'components/star/star.njk', name: 'star', data: { score: item.statisticsModel && item.statisticsModel.score || 0 } })

            let productArgshtml = ``
            item.productArgs.forEach(item => {
                productArgshtml += ` <p>${item.productKey}：${item.productValue}</p>`
            })

            let score = item.statisticsModel && item.statisticsModel.score || 0

            html += `<div class="child">
                <a class="logo" href="/business/product/${companyId}/${item.productId}" target="_blank">
                  <img _src_="${item.productCover || ''}"/>
                </a>
                <a href="/business/product/${companyId}/${item.productId}" target="_blank">
                  <h1>${item.productName}</h1>
                </a>
                <div class="kb clearfix">
                  <i class="${score === 0 ? 'noscore' : ''}">${score === 0 ? '暂无口碑分' : 'score'}</i>
                  ${star.bodyMessage}
                  <span>${item.statisticsModel && item.statisticsModel.reputationCount || 0}条口碑</span>
                </div>
                <div class="productArgs clearfix">
                  ${productArgshtml}
                  </div>
    
                <a class="enquiry" href="/enquiry/${companyId}/0" target="_blank">立即询价</a>
              </div>`
        }
    }

    return { datajson, html }
}

// 优质口碑
(function () {
    try {

        if (reshighKbChart.length > 0) {
            reshighKbChart.forEach((item: any, index: number) => {
                if (item.name.length > 0 && item.value.length > 0) {
                    Charts(document.getElementById(`ecahr${index}`), item)
                }

            })
        }

    } catch (e) { }



    let navigationbar: any = document.querySelector('.navigationbar')
    let sub: any = document.querySelector('.navigationbar > a')
    if (sub) {
        sub.onclick = async function () {
            let kblist1: any = document.querySelector('.row3 .kblist1')

            let highKb = await GetReputationByCompany(companyId)
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
                window.imgload()
                if (reshighKbChart.length > 0) {
                    reshighKbChart.forEach((item: any, index: number) => {
                        if (item.name.length > 0 && item.value.length > 0) {
                            Charts(document.getElementById(`ecahr${index}`), item)
                        }

                    })
                }

            }

        }
    }
})();



//相关资讯
(function () {

    let isloaded = false
    let container = $('.row5 .container')
    document.onscroll = async function (e) {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }
            isloaded = true
            let id = $('#main').find('.row5 .list .tab .select').data('id')
            let child = $('#main').find('.row5 .list .container .list1').find('.child')
            let timetick = $(child[child.length - 1]).data('timetick')
            let newsList = await GetNewsByCompanyId(companyId, parseInt(id), parseInt(timetick))
            let NewsList: any[] = []
            if (newsList && newsList.code === 0 && newsList.subCode === subCodeEnums.success && newsList.bodyMessage) {
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
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: newsList })

                if (datas.code === 0) {
                    container.append(datas.bodyMessage)
                    isloaded = newsList.bodyMessage.length > 10 ? false : true
                    window.imgload()
                }
            }



        }
    }

    navigationbar2('consult', async (dom: HTMLElement) => {
        let id = dom.getAttribute('data-id')

        let newsList = await GetNewsByCompanyId(companyId, parseInt(id))
        let NewsList: any[] = []
        let container: HTMLElement = document.querySelector('.row5 .container')
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

                container.innerHTML = datas.bodyMessage
                window.imgload()
                isloaded = false
            }
            isloaded = false
        } else {
            container.innerHTML = ''
        }
        isloaded = false
    })

})()
import { kkpager } from '@stl/kkpager'
import { addClass } from '@stl/tool-ts/src/common/dom/addClass'
import { removeClass } from '@stl/tool-ts/src/common/dom/removeClass'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import { on } from '@stl/tool-ts/src/common/event'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { navigationbar2 } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { imgPreview } from '@stl/image-preview'
import { GetCompanyProductByTypeId } from '../../common/service/product.services'
import { subCodeEnums } from '../../../../enums/enums'
import { productTypeListModel } from '../../../../model/reputation/reputation'
import { ResCompanyProductInfoModel, ResReputationModel, ResReputationScoreStatisticsModel } from '../../../../model/reputation/resreputation'
import { Charts } from '../../components/chart/chart'
import { GetReputationByCompany } from '../../common/service/Reputation.services'
declare const $: JQueryStatic
// eslint-disable-next-line no-undef
declare const document: Document
declare const echarts: any
declare const companyId: any
declare const reshighKbChart: any[]

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
    kkpager({
        pagerid: 'kkpage',
        total: 20,
        pno: 1,
        mode: 'click',
        isShowFirstPageBtn: false,
        isShowLastPageBtn: false,
        isShowLastPage: false,
        lang: {
            prePageText: '上一页',
            nextPageText: '下一页',
        },
        click: function (i: number) {
            // console.log(i)
        }
    })
})();


//全部产品
(function () {
    let row2 = document.querySelector('.row2')
    //let navigationbar2 = row2.querySelector('.navigationbar2')

    navigationbar2('product', async (dom: HTMLElement) => {
        let productTypeId = parseInt(dom.getAttribute('data-id'))
        let html = ''
        //
        let datajson = await GetCompanyProductByTypeId({
            companyId,
            productTypeId
        })

        if (datajson.code === 0 && datajson.subCode === subCodeEnums.success) {
            let data: ResCompanyProductInfoModel[] = datajson.bodyMessage
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                let star: bodyModel<string> = await getcomponent({ path: 'components/star/star.njk', name: 'star', data: { score: item.statisticsModel && item.statisticsModel.score || 0 } })

                let productArgshtml = ``
                item.productArgs.forEach(item => {
                    productArgshtml += ` <p>${item.productKey}：${item.productValue}</p>`
                })

                html += `<div class="child">
                <a class="logo" href="/business/product/${companyId}/${item.productId}" target="_blank">
                  <img src="${item.productCover || ''}"/>
                </a>
                <a href="/business/product/${companyId}/${item.productId}" target="_blank">
                  <h1>${item.productName}</h1>
                </a>
                <div class="kb clearfix">
                  <i>${item.statisticsModel && item.statisticsModel.score || 0}</i>
                  ${star.bodyMessage}
                  <span>${item.statisticsModel && item.statisticsModel.reputationCount || 0}条口碑</span>
                </div>
                <div class="productArgs clearfix">
                  ${productArgshtml}
                  </div>
    
                <a class="enquiry" href="/enquiry/${companyId}/0" target="_blank">立即询价</a>
              </div>`
            }



            let container_box = row2.querySelector('.container_box')
            container_box.innerHTML = html

            let kkpage = row2.querySelector('#kkpage')
            kkpage.innerHTML = ''
            kkpager({
                pagerid: 'kkpage',
                total: 20,
                pno: 2,
                mode: 'click',
                isShowFirstPageBtn: false,
                isShowLastPageBtn: false,
                isShowLastPage: false,
                lang: {
                    prePageText: '上一页',
                    nextPageText: '下一页',
                },
                click: function (i: number) {
                    // console.log(i)
                }
            })

        }



    })

})();

// 优质口碑
(function () {

    reshighKbChart.forEach((item: any, index: number) => {
        Charts(document.getElementById(`ecahr${index}`), item)
    })




    let navigationbar: any = document.querySelector('.navigationbar')
    let sub: any = document.querySelector('.navigationbar > a')

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

        let data: bodyModel<String> = await getcomponent({ path: 'components/list.njk', name: 'kblist1', data: {args: reshighKb} })



        if (data.code === 0) {
            kblist1.outerHTML = data.bodyMessage

            reshighKbChart.forEach((item: any, index: number) => {
                Charts(document.getElementById(`ecahr${index}`), item)
            })
        }

    }
})();



//相关咨询
(function () {
    let data = {
        args: [
            {
                link: '/news/123',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短2323缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11',
                businesslogo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                businessname: '万联',
                slug: ['视频', '音频']
            }, {
                link: '/news/123',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }, {
                link: '/news/123',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }, {
                link: '/news/123',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }
        ]
    }

    navigationbar2('consult', async (dom: HTMLElement) => {
        let id = dom.attributes['data-id']

        let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: data })


        let container: HTMLElement = document.querySelector('.row5 .container')
        container.innerHTML = datas.bodyMessage

    })

    let isloaded = false
    let container = $('.row5 .container')
    document.onscroll = async function (e) {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }


            isloaded = true
            setTimeout(async () => {
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: data })

                if (datas.code === 0) {
                    container.append(datas.bodyMessage)
                    isloaded = false
                }
            }, 500)


        }
    }

})()
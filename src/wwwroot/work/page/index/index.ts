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
declare const $: JQueryStatic
declare const reshighKbChart: any[]

// eslint-disable-next-line no-undef
declare const document: Document



(function () {
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


        highKb.bodyMessage.forEach((item) => {
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
            item.statisticsModel.reputationScore.forEach((kbitem) => {
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


//热门口碑
(function () {
    let data = {
        args: [
            {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11',
                businesslogo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                businessname: '万联',
                slug: ['视频', '音频']
            }, {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }, {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }, {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }
        ]
    }
    let isloaded = false
    let nownew = $('.information .nownew')
    document.onscroll = async function () {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
            if (isloaded) { return }


            isloaded = true
            setTimeout(async () => {
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: data })

                if (datas.code === 0) {
                    nownew.find('.list_box').append(datas.bodyMessage)
                    isloaded = false
                }
            }, 500)


        }
    }

    let navigationbar = nownew.find('.list a')
    navigationbar.click(function () {
        let i = $(this).index()
        console.log(i)

        setTimeout(async () => {
            let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: data })

            if (datas.code === 0) {
                nownew.find('.list_box').html(datas.bodyMessage)
                isloaded = false
            }
        }, 500)
    })

})()


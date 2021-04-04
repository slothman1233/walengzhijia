import { imageSlider } from '@stl/image-slider'
import { compatible } from '@stl/tool-ts/src'
import { index } from '@stl/tool-ts/src/common/compatible'
import { addClass, hide, removeClass, show } from '@stl/tool-ts/src/common/dom'
import { on } from '@stl/tool-ts/src/common/event'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'

// eslint-disable-next-line no-undef
declare const document: Document
declare const echarts: any;


(function () {
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
        fn: function (dom: any, event: any) {
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
(function () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('ecahr0'))
    let myChart1 = echarts.init(document.getElementById('ecahr1'))
    let myChart2 = echarts.init(document.getElementById('ecahr2'))

    // 指定图表的配置项和数据
    let option = {
        title: {
            text: ''
        },
        // tooltip: {},

        radar: {
            shape: 'circle',
            name: {
                formatter: '{value}',
                textStyle: {
                    color: 'rgba(42, 43, 46, 1)',
                    fontSize: 10,
                    textShadowBlur: 100,
                }
            },
            radius: 35,
            nameGap: 5,
            splitNumber: 3,
            indicator: [
                { text: '性能' },
                { text: '配置' },
                { text: '外观' },
                { text: '质量' },
                { text: '售后' },
                { text: '能耗' },
                { text: '自动化' }
            ],
            splitArea: {
                areaStyle: {
                    color: 'rgba(240, 241, 244, 0.3)',

                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(240, 241, 244, 1)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(240, 241, 244, 1)'
                }
            }

        },
        series: [{
            name: 'dfdf',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: [60, 5, 0.30, -100, 1500, -100, 1500],

                    areaStyle: {
                        color: 'rgba(248, 215, 132, 0.5)'
                    },

                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(248, 215, 132, 0.5)',
                        width: 2,
                    },
                    itemStyle: {
                        borderType: 'solid',
                        color: 'rgba(248, 215, 132, 0.5)',
                        opacity: 0,
                    }
                }
            ]
        }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
    myChart1.setOption(option)
    myChart2.setOption(option)

})()

let data = {
    args: [
        {
            link: '#',
            img: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
            content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
            author: '作者大大',
            time: '2021-11-11',
            businesslogo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            businessname: '万联',
            slug: ['视频', '音频']
        }, {
            link: '#',
            img: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
            content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
            author: '作者大大',
            time: '2021-11-11'
        }, {
            link: '#',
            img: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
            content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
            author: '作者大大',
            time: '2021-11-11'
        }, {
            link: '#',
            img: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
            content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
            author: '作者大大',
            time: '2021-11-11'
        }
    ]
}

let data1 = {
    args: [
        {
            logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            link: '#',
            name: '广东万联',
            kbscore: '5.00',
            description: '纸板生产单机纸板生产单机纸板生产单机纸板生产单机',
            kbcount: 56,
            favorablerate: '100',
            kbgood: 18,
            label: [
                '上市公司', '优质品牌商', '权威品牌'
            ],
            brandtype: '优质品牌商'

        }, {
            logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            link: '#',
            name: '广东万联',
            kbscore: '5.00',
            description: '纸板生产单机纸板生产单机纸板生产单机纸板生产单机',
            kbcount: 56,
            favorablerate: '100',
            kbgood: 18,
            label: [
                '上市公司', '优质品牌商', '权威品牌'
            ],
            brandtype: '优质品牌商'

        }, {
            logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            link: '#',
            name: '广东万联',
            kbscore: '5.00',
            description: '纸板生产单机纸板生产单机纸板生产单机纸板生产单机',
            kbcount: 56,
            favorablerate: '100',
            kbgood: 18,
            label: [
                '上市公司', '优质品牌商', '权威品牌'
            ],
            brandtype: '优质品牌商'

        }, {
            logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            link: '#',
            name: '广东万联',
            kbscore: '5.00',
            description: '纸板生产单机纸板生产单机纸板生产单机纸板生产单机',
            kbcount: 56,
            favorablerate: '100',
            kbgood: 18,
            label: [
                '上市公司', '优质品牌商', '权威品牌'
            ],
            brandtype: '优质品牌商'

        }
    ]
}


setTimeout(async function(){ 
    let a = await getcomponent({path: 'components/list.njk', name: 'list2', data: data1})
    console.log(a)
}, 2000)
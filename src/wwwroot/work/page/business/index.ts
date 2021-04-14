import { kkpager } from '@stl/kkpager'
import { addClass } from '@stl/tool-ts/src/common/dom/addClass'
import { removeClass } from '@stl/tool-ts/src/common/dom/removeClass'
import { siblings } from '@stl/tool-ts/src/common/dom/siblings'
import { on } from '@stl/tool-ts/src/common/event'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { navigationbar2 } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic
// eslint-disable-next-line no-undef
declare const document: Document
declare const echarts: any
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
            console.log(i)
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

})();

//全部产品
(function () {
    let row2 = document.querySelector('.row2')
    //let navigationbar2 = row2.querySelector('.navigationbar2')
    let row2Data =
        [
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            },
            {
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                id: '1',
                title: 'YWZJ-C型液压无轴纸架',
                producttype: '原纸架',
                wideinwidth: '1400、1600、1080、1080、2000、2200',
                weight: '单侧最大4T',
                diameter: '300mm-1580mm', kbscore: '5.00', kbcount: 12
            }



        ]
    navigationbar2('product', async (dom: HTMLElement) => {
        let id = dom.attributes['data-id']
        let html = ''
      
        for (let i = 0; i < row2Data.length; i++) {
            let star: bodyModel<string> = await getcomponent({ path: 'components/star/star.njk', name: 'star', data: {} })
            html += `<div class="child">
            <a class="logo" href="/business/product/${row2Data[i].id}" target="_blank">
              <img src="${row2Data[i].img}"/>
            </a>
            <a href="/business/product/${row2Data[i].id}" target="_blank">
              <h1>${row2Data[i].title}</h1>
            </a>
            <div class="kb clearfix">
              <i>${row2Data[i].kbscore}</i>
              ${star.bodyMessage}
              <span>${row2Data[i].kbcount}333条口碑</span>
            </div>
            <p>产品类型：${row2Data[i].producttype}</p>
            <p>宽幅：${row2Data[i].wideinwidth}</p>
            <p>纸卷重量：${row2Data[i].weight}</p>
            <p>纸卷直径：${row2Data[i].diameter}</p>

            <a class="enquiry" href="/enquiry/0" target="_blank">立即询价</a>
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
                console.log(i)
            }
        })

    })

})();

// 优质口碑
(function () {
    let kblist1data = {
        args: [
            {
                hread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                name: '李女士111',
                kbscore: '5.00',
                link: '#',
                title: '阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬',
                description: 'a阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发斯蒂芬阿萨德发斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德'
            }, {
                hread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                name: '李女士',
                kbscore: '5.00',
                link: '#',
                title: '阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬',
                description: 'a阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发斯蒂芬阿萨德发斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德'
            }, {
                hread: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                name: '李女士',
                kbscore: '5.00',
                link: '#',
                title: '阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬',
                description: 'a阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发斯蒂芬阿萨德发斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德'
            }
        ]
    }

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

    let navigationbar: any = document.querySelector('.navigationbar')
    let sub: any = document.querySelector('.navigationbar > a')
    sub.onclick = async function () {
        let kblist1: any = document.querySelector('.row3 .kblist1')
        let data: bodyModel<String> = await getcomponent({ path: 'components/list.njk', name: 'kblist1', data: kblist1data })
        if (data.code === 0) {
            kblist1.outerHTML = data.bodyMessage

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('ecahr0'))
            let myChart1 = echarts.init(document.getElementById('ecahr1'))
            let myChart2 = echarts.init(document.getElementById('ecahr2'))

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option)
            myChart1.setOption(option)
            myChart2.setOption(option)
        }

    }
})();



//相关咨询
(function () {
    let data = {args: [
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
    ]}
    
    navigationbar2('consult', async (dom: HTMLElement) => {
        let id = dom.attributes['data-id']
      
        let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: data })
       

        let container:HTMLElement = document.querySelector('.row5 .container')
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
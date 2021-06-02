import { extend } from '@stl/tool-ts/src/common/compatible/extend'


declare const echarts: any
/**
 * 图表
 * 页面需要引入  <script type="text/javascript" src="/assets/plugin/echarts/echarts.min.js"></script>
 * @param {HTMLElement} dom 容器元素
 * @param {object} data {name:['b','a'],value[60, 5]} 
 */
export function Charts(dom: HTMLElement, data: any, object: any = {}) {
    if (!dom) { return }

    let myChart = echarts.init(dom)
    let indicator: any[] = []

    data.name.forEach((name: string) => {
        indicator.push({ text: name })
    })


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
            indicator: indicator,
            //  [
            //     { text: '性能' },
            //     { text: '配置' },
            //     { text: '外观' },
            //     { text: '质量' },
            //     { text: '售后' },
            //     { text: '能耗' },
            //     { text: '自动化' }
            // ],
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
            // name: 'dfdf',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: data.value, //[60, 5, 0.30, -100, 1500, -100, 1500],

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
    option = extend(option, object)
    myChart.setOption(option)
}

/**
 * 图表 文字加分数
 * 页面需要引入  <script type="text/javascript" src="/assets/plugin/echarts/echarts.min.js"></script>
 * @param {HTMLElement} dom 容器元素
 * @param {object} data {name:['b','a'],value[60, 5]} 
 */
export function ChartstoKV(dom: HTMLElement, data: any, object: any = {}) {
    if (!dom) { return }

    let myChart = echarts.init(dom)
    let indicator: any[] = []

    data.name.forEach((name: string, i: number) => {
        indicator.push({ text: `${name}\n${data.value[i]}` })
    })


    let option = {
        title: {
            text: ''
        },
        // tooltip: {},

        radar: {
            center: ['50%', '55%'],
            // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
            radius: 40,
            // 圆的半径，数组的第一项是内半径，第二项是外半径。

            shape: 'circle',
            name: {
                formatter: '{value}',
                textStyle: {
                    color: 'rgba(42, 43, 46, 1)',
                    fontSize: 10,
                    textShadowBlur: 100,
                    align: 'center'
                }
            },
            nameGap: 9,
            splitNumber: 3,
            indicator: indicator,
            //  [
            //     { text: '性能' },
            //     { text: '配置' },
            //     { text: '外观' },
            //     { text: '质量' },
            //     { text: '售后' },
            //     { text: '能耗' },
            //     { text: '自动化' }
            // ],
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
            // name: 'dfdf',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: data.value, //[60, 5, 0.30, -100, 1500, -100, 1500],

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

    option = extend(option, object)
    myChart.setOption(option)
}
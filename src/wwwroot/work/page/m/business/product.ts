import { ChartstoKV } from '../../../components/chart/chart'


//图表
(function () {
    let reshighKbChart = {
        'name': ['性能', '配置', '外观', '质量', '售后', '能耗', '自动化'],
        'value': [3, 2.5, 3.5, 3, 3, 2.5, 3.5]
    }
    ChartstoKV(document.getElementById(`ecahr0`), reshighKbChart)
})()
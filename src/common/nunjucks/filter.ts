import { HotCompanyDefineItems, priceShowStatusEnums } from '../../enums/enums'
import { get_time_timestamp, ge_time_format } from '../utils/util'


/**
 * 添加 nunjucks 过滤器
 */
export default {
    // 为nkj加入一个过滤器
    'shorten': function (str: string, count: number) {
        return str.slice(0, count || 5)
    },
    //三元表达式
    'ternary': function (a: any, b: any, c: any) {
        return a ? b : c
    },
    //format
    'format': function (a: any, ...arg: any[]) {
        return a.replace(/%s/g, function () {
            return arg.shift()
        })
    },
    //去掉所有的html标记
    'delHtmlTag': function (str: string) {
        return str.replace(/<[^>]+>/g, '')//去掉所有的html标记
    },
    //slice
    'slice': function (str: string, start?: number, end?: number) {

        if (start && end) {
            return str.slice(start, end)
        } else if (start) {
            return str.slice(start)
        } else {
            return str
        }
    },
    //split
    'split': function (str: string, decollator: string) {
        try {
            return str.split(decollator)
        } catch (e) {
            return str
        }
    },
    //ge_time_format 时间格式化
    'ge_time_format': function (str: string, type?: string) {
        return ge_time_format(str, type)
    },
    //get_time_timestamp  时间转时间戳
    'get_time_timestamp': function(str: string){
        return get_time_timestamp(str)
    },
    //获取品牌商的类型标记
    //HotCompanyDefine
    'get_companyHotType': function (type: string) {
        try {
            return HotCompanyDefineItems[parseInt(type)]
        } catch (e) {
            return HotCompanyDefineItems[0]
        }
    },
    //口碑购买价格显示的方法
    'getPurchasePrice': function (str: string, type: priceShowStatusEnums) {
        switch (type) {
            case priceShowStatusEnums.showAll:
                return str
            case priceShowStatusEnums.showPart:
                let s = ''
                for (let i = 0; i < str.length; i++) {
                    if (i === 0 || str[i] === '.') {
                        s += str[i]
                    } else {
                        s += '*'
                    }
                }
                return s
            case priceShowStatusEnums.blank:
                return '***'
            default:
                return str
        }
    }

}



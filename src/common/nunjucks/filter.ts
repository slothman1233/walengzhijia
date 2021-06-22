import { HotCompanyDefineItems, priceShowStatusEnums, sexEnum } from '../../enums/enums'
import { isNumber } from '../utils/type_check'
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
    'get_time_timestamp': function (str: string) {
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
                for (let i = 0; i < str.toString().length; i++) {
                    if (i === 0 || str.toString()[i] === '.') {
                        s += str.toString()[i]
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
    },

    // 用户性别转化
    'user_sex': function (type: string) {
        switch (parseInt(type)) {
            case sexEnum.man:
                return '男'
            case sexEnum.woman:
                return '女'
            default:
                return '男'
        }
    },

    /**
     * 用户的手机号码显示
     * @param {string} str 手机号码 
     * @param {string} digit 隐藏的位数
     */
    'user_iphone': function (str: string, digit: string = '4') {
        let dt = Math.max(parseInt(digit), 0)
        dt = Math.min(parseInt(digit), 8)
        let reg = RegExp('(\\d{3})\\d{' + dt + '}(.*)')
        let s = ''
        for (let i = 0; i < dt; i++) {
            s += '*'
        }
        try {
            return str.replace(reg, `$1${s}$2`)
        } catch (e) {
            return str
        }

    },
    /**
     * 只保留图片
     * @param str 
     * @param count 需要最大图片数量
     */
    'onlyimg': function (str: string, count?: string) {
        let imgAry: any[] = [];
        (<any>str.replace)(/<img .*?src=["|'](.*?)["|'].*?>/ig, function ($1: any, $2: any, $3: any): any {
            if (count && isNumber(count) && imgAry.length >= parseInt(count)) {
                return imgAry
            }
            imgAry.push($2)
        })
        return imgAry
    }



}



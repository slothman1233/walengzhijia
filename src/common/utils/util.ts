/**
 * deep copy
 * @param {Object} p 
 * @param {Object} c 
 */
function deepCopy(p: object, c: object = {}): object {
    for (let i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {}
            deepCopy(p[i], c[i])
        } else if (typeof p[i] === 'function') {
            c[i] = p[i].prototype.constructor
        } else { c[i] = p[i] }
    }
    return c
}

/**
 * stringFormat('xx$1x $3 xxx$2', 11,22,33)
 * @param {String} str 
 * @param  {...any} args 
 */
function stringFormat(str: string, ...args: any[]): string {
    // args = args.flat();// Array can be Array, because flat function
    return str.replace(/\$(\d+)/g, function (match, num) {
        let m = args[parseInt(num, 10) - 1]
        return m ? ('' + m) : match
    })
}

export const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    )
}

const formatNumber = (n: number) => {
    const s = n.toString()
    return s[1] ? s : '0' + s
}

/**
 * 格式化日期
 * @param str 日期格式字符串
 */
function formatTime(str: string): string {
    const d = new Date(str)
    const n = new Date()
    const r = n.getTime() - d.getTime()
    const dateStr = [d.getFullYear, d.getMonth() + 1, d.getDate()].map(formatNumber).join('/')
    const timeStr = [d.getHours(), d.getMinutes(), d.getSeconds()].map(formatNumber).join(':')
    const just = 1000 * 10
    const min = 1000 * 60
    const hour = 1000 * 60 * 60
    const day = hour * 24
    const month = day * 30
    let i = timeStr

    if (r < day && n.getDate() - d.getDate() === 0) {
        if (r < just) {
            i = '刚刚'
        } else if (r < min) {
            i = Math.floor(r / 1000) + '秒前'
        } else if (r < hour) {
            i = Math.floor(r / min) + '分钟前'
        } else if (r < hour * 24) {
            i = Math.floor(r / hour) + '小时前'
        }
    } else if (r < day * 2 && new Date(n.getTime() - day).getDate() - d.getDate() === 0) {
        i = `昨天 ${timeStr}`
    } else if (r < day * 3 && new Date(n.getTime() - day * 2).getDate() - d.getDate() === 0) {
        i = `前天 ${timeStr}`
    } else if (r < day * 8) {
        i = Math.floor(r / day) + '天前'
    } else if (r < day * 30) {
        i = dateStr
    } else if (r < month * 12) {
        i = Math.floor(r / month) + '个月前'
    } else if (r < day * 365 * 5) {
        i = Math.floor(r / (day * 365)) + '年前'
    } else {
        i = `${dateStr} ${timeStr}`
    }
    return i
}


/**
 * 获取当前的日期函数
 * 传入一个时间戳,如果不传则为当前时间
 * 注意：如果是uinx时间戳记得乘于1000, 比如php函数time()获得的时间戳就要乘于1000
 * @type String timestamp 要转换的时间戳格式 1469504554276
 * @returns {String} 日期格式: 2016-07-26 10:55:38
 */
export function ge_time_format(timestamp: string, type: string = '1') {
    let date: Date
    let types: string = (type === undefined) ? '1' : type, t
    if (timestamp) {
        date = new Date(parseInt(timestamp))
    } else {
        date = new Date()
    }
    let mstring, dstring, Hstring, istring, sstring
    let Y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds()

    mstring = m < 10 ? '0' + m : m.toString()
    dstring = d < 10 ? '0' + d : d.toString()
    Hstring = H < 10 ? '0' + H : H.toString()
    istring = i < 10 ? '0' + i : i.toString()
    sstring = s < 10 ? '0' + s : s.toString()
    switch (parseInt(types)) {
        case 1:
            t = Y + '-' + mstring + '-' + dstring + ' ' + Hstring + ':' + istring + ':' + sstring
            break
        case 2:
            t = Y + '-' + mstring + '-' + dstring
            break
        case 3:
            t = Y + '-' + mstring
            break
        case 4:
            t = H + ':' + istring + ':' + sstring
            break
        default: break
    }

    return t
}

/**
 * 时间传时间戳
 * 2021-05-11T09:15:49+08:00
 * 2021-05-11T09:15:49
 * 2021-05-11
 * @param {string} time 时间
 */
export function get_time_timestamp(time: string) {
    try {
        return new Date(time).getTime()
    } catch (e) {
        return time
    }
}

/**
 * html encode
 * html转码
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function htmlEncode(str: string): string {
    if (!str) { return '' }
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
}

/**
      * 日期函数转为时间戳格式
      * 传入一个日期时间格式,如果不传入就是获取现在的时间了
      * @param {string} strtime 要转换的日期时间格式 2016-07-26 10:55:38
      * @param {number} type 类型 1 10位时间戳  2 13位时间戳
      * @return {string} 时间戳格式: 1469504554276
      */
export function get_unix_time_stamp(strtime: string, type: number) {
    let date: Date
    if (strtime) {
        date = new Date(strtime)
    } else {
        date = new Date()
    }
    let time1 = date.getTime()   //会精确到毫秒---长度为13位
    //time2 = date.valueOf(); //会精确到毫秒---长度为13位
    //time3 = Date.parse(date); //只能精确到秒，毫秒将用0来代替---长度为10位
    if (type === 2) {
        time1 = parseInt((time1 / 1000).toString())
    }
    return time1
}

/**
 * html decode
 * html解码
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function htmlDecode(str: string = ''): string {
    if (!str) { return '' }
    return str.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;/g, '\'')
        .replace(/&quot;/g, '"')
}

/**
 * Intercept the first n strings
 * @param {String} str 
 * @param {Number} n 
 */
function getContentSummary(str: string, n: number): string {
    const replaceHtmlTags = (str: string) => str.replace(/<\s*\/?\s*\w+[\S\s]*?>/g, '')
    const pattern = /^[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+/
    let ret = '', count = 0, m
    str = replaceHtmlTags(htmlDecode(str))

    while (str.length) {
        if ((m = str.match(pattern))) {//拉丁文字
            count++
            ret += m[0]
            str = str.substr(m[0].length)
        } else {
            if (str.charCodeAt(0) >= 0x4E00) {//中日韩文字
                count++
            }
            ret += str.charAt(0)
            str = str.substr(1)
        }
        if (count > n) {
            ret += '...'
            break
        }
    }
    return ret
}

/**
 * Count the number of string
 * 计算字符串文字数量(拉丁中日韩字符)
 * @param  {String} str
 * @return {Number} string number
 */
function wordCount(str: string): number {
    const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    const m = str.match(pattern)
    let count = 0
    if (m === null) { return count }
    for (let i = 0; i < m.length; i++) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
        } else {
            count += 1
        }
    }
    return count
}

/**
 * 计算包含双字节字符和emoji的准确长度
 * @param str 字符串
 */
function charCount(str: string): number {
    const reg = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    return str.replace(reg, 'a').length
}

/**
 * 写入cookie
 * @param {String} name  cookie名
 * @param {String} value cookie值
 * @param {String} time  存储时间 收一个字符是代表的时间名词
                        s20是代表20秒
                        h是指小时，如12小时则是：h12
                        d是天数，30天则：d30
 */
function setCookie(name: string, value: string, time: string, domain?: string) {
    let strsec = getsec(time)
    let exp: any = new Date()
    let domainStr = domain ? ';domain=' + domain : ''
    exp.setTime(exp.getTime() + strsec * 1)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + ';path=/' + domainStr
}
function getsec(str: string) {
    let str1: number = parseFloat(str.substring(1, str.length))
    let str2: string = str.substring(0, 1)
    switch (str2) {
        case 's': return str1 * 1000
        case 'm': return str1 * 60 * 1000
        case 'h': return str1 * 60 * 60 * 1000
        default: return str1 * 24 * 60 * 60 * 1000
    }
}


export {
    deepCopy,
    stringFormat,
    formatTime,
    htmlEncode,
    htmlDecode,
    getContentSummary,
    charCount,
    wordCount,
    setCookie

}
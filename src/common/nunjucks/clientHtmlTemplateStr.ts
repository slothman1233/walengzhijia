
// import { nunjucksEVN } from '../utils/nunjucks'
import htmlMinifier from 'html-minifier'

const nunjucks = require('nunjucks')
// const path = require('path')
// 如何渲染模版文件
let data = { name: 'blued' }
// 配置模版文件的所在目录
nunjucks.configure('/views/shared/sharedView/macro', {
    autoescape: true
})
/**
 * 通过nunjucks字符串文本跟参数获取编译后的html代码
 * @param {string} str 模板字符串
 * @param {any} options 渲染的参数
 */
export const nunRenderString = (str: string, options: any) => {
    // if (!str) { return null }
    // let html = htmlMinifier.minify(

    //     nunjucksEVN.renderString(str, Object.assign({}, options)),
    //     {
    //         collapseWhitespace: true
    //     }
    // )
    let html = nunjucks.render('user.html', data)

    return html
}


/**
 *通过文件地址跟参数获取编译后的html代码
 * @param {string} filepath 文件名地址 相对于 views文件夹
 * @param {any} options 渲染的参数
 */
export const nunRender = (filepath: string, options: any) => {
    if (!filepath) { return null }
    let html = nunjucks.render(filepath, Object.assign({}, options))

    return html
}
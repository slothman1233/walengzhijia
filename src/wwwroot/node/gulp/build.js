let path = require('path')
let paths = {
    jspages: [
        getSrc('./index/index.ts'),
        getSrc('./index/list.ts'),
        getSrc('./index/enquiry.ts'),
        getSrc('./business/index.ts'),
        getSrc('./business/product.ts'),
        getSrc('./business/answer.ts'),
        getSrc('./reputation/index.ts'),
        getSrc('./reputation/publish.ts'),
        getSrc('./news/index.ts'),
        getSrc('./search/index.ts'),
        getSrc('./home/agreement.ts'),
        getSrc('./news/reputation.ts'),
        getSrc('./user/index.ts'),
        getSrc('./user/datamanager.ts'),
        getSrc('./user/product.ts'),
        getSrc('./user/content.ts'),
        getSrc('./user/information.ts'),
        getSrc('./user/changepwd.ts'),
        getSrc('./user/news.ts'),
        getSrc('./user/sales.ts'),
        getSrc('./user/publishproduct.ts'),
        getSrc('./user/publishnews.ts'),
        getSrc('./login/login.ts'),

        //移动端
        getSrc('./m/public/script/index.ts'),
        getSrc('./m/index/index.ts'),
        getSrc('./m/business/index.ts'),
        getSrc('./m/business/product.ts'),
        getSrc('./m/news/index.ts'),
        getSrc('./m/news/reputation.ts'),
        getSrc('./m/index/enquiry.ts'),
        getSrc('./m/login/index.ts'),
        getSrc('./m/user/information.ts'),
        getSrc('./m/user/content.ts'),
        getSrc('./m/user/interactionnotification.ts'),
        getSrc('./m/user/systemnotification.ts'),
        getSrc('./m/user/setting.ts'),
        getSrc('./m/user/updatepwd.ts'),
        getSrc('./m/reputation/publish.ts'),
        getSrc('./m/search/index.ts')




    ]
}
//获取文件的绝对地址
function getSrc(src) {
    return path.resolve(__dirname, '../../work/page', src)
}

function isArrayFn(value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    } else {
        return Object.prototype.toString.call(value) === '[object Array]'
    }
}

paths.jspages.push(getSrc('../public/script/index.ts'))

exports.paths = paths
exports.getSrc = getSrc
exports.isArrayFn = isArrayFn
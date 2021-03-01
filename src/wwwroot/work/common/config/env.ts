


const DEV = {
    fxtyc: 'http://120.24.168.112:31190/',
}

const TEST = {
    fxtyc: 'http://testjyzxapi.tostar.top/',
}

const PRE = {
    fxtyc: 'https://prejyzxapi.tostar.top/',
}

const GA = {
    fxtyc: 'https://apijyzxpro.wbp5.com/',
}


const baseUrl = {
    dev: DEV,//开发
    test: TEST,//测试
    pre: PRE,//预发布
    ga: GA//正式
}

// API
export default baseUrl.dev;





const DEV = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN'
}

const TEST = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN'
}

const PRE = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN'
}

const GA = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN'
}


const baseUrl = {
    dev: DEV, //开发
    test: TEST, //测试
    pre: PRE, //预发布
    ga: GA//正式
}

// API
export default baseUrl.dev


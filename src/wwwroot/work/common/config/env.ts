


const DEV = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN',
    imgMaxSize: 5 * 1024 * 1024,
    videoMaxSize: 5 * 1024 * 1024 * 1024
}

const TEST = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN',
    imgMaxSize: 5 * 1024 * 1024,
    videoMaxSize: 5 * 1024 * 1024 * 1024
}

const PRE = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN',
    imgMaxSize: 5 * 1024 * 1024,
    videoMaxSize: 5 * 1024 * 1024 * 1024
    
}
const GA = {
    lepackapi: 'http://lepackapi.lepkg.com/',
    userlogin: 'USERLOGIN',
    imgMaxSize: 5 * 1024 * 1024,
    videoMaxSize: 5 * 1024 * 1024 * 1024
}


const baseUrl = {
    dev: DEV, //开发
    test: TEST, //测试
    pre: PRE, //预发布
    ga: GA//正式
}

// API
export default baseUrl.dev


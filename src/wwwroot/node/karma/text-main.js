var tests = [];

for (var file in window.__karma__.files) {

       // 将符合条件的测试文件转化为 requirejs 能加载的模块名
    if (/\.test\.+(js|ts)$/.test(file)) {
     
        tests.push(file);
    }
}

requirejs.config({
    // karma 将basePath 对应的静态路径设置为 /base
  // requirejs 加载文件也应当由 /base 开始
    baseUrl: '/base',
    paths: {
       // 'ind':'../../Scripts/dev/index/index.js'

    
    },

    shim: {
        // 'underscore': {
        //     exports: '_'
        // }
    },

  // 动态加载测试文件
    deps: tests,

  // deps 加载完后 执行 单元测试
    callback: window.__karma__.start
});
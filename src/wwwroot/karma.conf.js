module.exports = function(config) {
  config.set({
    // 依赖插件  
     plugins: ['karma-mocha', 'karma-chai','karma-chrome-launcher', 'karma-typescript'],
     //frameworks 需要用到的断言库，这里我们只用jsamine
      frameworks: ["mocha","chai", "karma-typescript"],
    //可以配置通配符把源代码和测试代码加载进来。
      files: [
          { pattern: "node_modules/expect.js/index.js" },
          { pattern: "script/test/2/**/*.ts" }
      ],

      //在将匹配文件提供给浏览器之前对其进行预处理
// available preprocessors：https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
       // "script/test/2/hello-service.interface.ts":["karma-typescript",'coverage'],
       // "script/test/2/hello.component.spec.ts":[ "karma-typescript",'coverage'],
          "**/*.ts": ["karma-typescript"]
      },

      //怎么显示测试结果 测试结果显示插件https://npmjs.org/browse/keyword/karma-reporter
      reporters: [ "karma-typescript"],

      // 可以启动的浏览器列表 需要去下载对应的启动插件 https://npmjs.org/browse/keyword/karma-launcher
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
      browsers: ["Chrome"],
      karmaTypescriptConfig: {
        reports: {
            "html": 'node/gulp/karma/coverage/'
        }
    },
    
        // coverageReporter : {
        //     // 可以用什么形式展示 支持以下格式：clover、cobertura、html、json-summary、json、lcov、lcovonly、none、teamcity、text-lcov、text-summary、text
        //     // 可以看连接 : https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
        //     reports: ['html', 'text-summary'],
        //     // 结果存放的位置
        //     dir: 'node/gulp/karma/coverage/',
        //     // 如果使用webpack和预加载器，可以绕过webpack打破源路径
        //     fixWebpackSourcePaths: true,
        //     // 停止输出消息，如`File [$ {filename}]忽略，没有任何东西可以映射
        //     skipFilesWithNoCoverage: true,
        //     // 大多数记录接受额外的配置选项。 你可以通过`report-config`选项传递这些
        //     'report-config': {
        //         // 配置html
        //         html: {
        //             // 输出到 dir + /html
        //             subdir: 'html'
        //         }
        //     }
        // },
   // 并发级别 可以同时启动多少浏览器 默认无限大
   concurrency: Infinity
  });
};

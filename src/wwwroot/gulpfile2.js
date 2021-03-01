var gulp = require("gulp");
var path = require("path");
var browserify = require("browserify");
var fs = require("fs");
var less = require("gulp-less"); // less 编译
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer'); //把流转成buffer
var tsify = require("tsify"); //就像gulp-typescript一样
var handleErrors = require('./node/gulp/handleError');
var cleanCss = require("gulp-clean-css"); //压缩cssr
var del = require('del'); //删除文件1
var rename = require("gulp-rename"); //  重命名
var logger = require('gulp-logger');
var rev = require('@stl/wl-gulp-rev');
var revCollector = require('@stl/wl-gulp-rev-collector');
var bom = require('gulp-bom');
var gutil = require("gulp-util");
// var uglify = require("gulp-uglify");
var uglify = require('gulp-uglify-es').default;
var watchify = require("watchify"); //实时更新ts
var ts = require('gulp-typescript');
var gulpif = require("gulp-if"); //判断
var karmaServer = require('karma').Server;
var build = require('./node/gulp/build');
var config = require("./node/gulp/config");
var paths = build.paths;
var isArrayFn = build.isArrayFn;
var babelify = require("babelify");
notify = require('gulp-notify');
plumber = require('gulp-plumber');

var minimist = require('minimist'); //命令行参数解析引擎
const gulpLess = require("gulp-less");
var compress = minimist(process.argv.slice(2)).compress ? JSON.parse(minimist(process.argv.slice(2)).compress) : false;
var iswatch = minimist(process.argv.slice(2)).watch ? JSON.parse(minimist(process.argv.slice(2)).watch) : false;

gulp.task("build",function (cb,filename) {
   return defaults(cb,filename);

    
});

var objectFileAry = [];
var index = 0;
var defaults = function (cb,filename) {
    index = 0;
    if (filename && paths.jspages.indexOf(filename) < 0) {
        return;
    }
    var file = filename ? filename : paths.jspages;
    file = isArrayFn(file) ? file : [file];

    // "tsify": "^4.0.2",
    // "typescript": "^3.9.7",
    file.forEach(i => {
        if (!objectFileAry[i]) objectFileAry[i] = {};
        objectFileAry[i].src = i.slice(0,i.replace("/",'\\').lastIndexOf("\\") + 1);
        objectFileAry[i].sourceSrc = i.slice(i.lastIndexOf('\\') + 1,i.lastIndexOf('.'));

        let b = browserify({
            basedir: './',
            debug: !compress, //允许在浏览器中直接调试TypeScript源码
            entries: [i],
            cache: {},
            extensions: ['.ts'],

        })
            //使用tsify插件调用Browserify
            //esModuleInterop 允许 import fs from 'fs'; 这种写法
            //global 编译node_modules里面的ts和es6
            .plugin(tsify,{ esModuleInterop: true,global: true })
            .transform(babelify) //注意这里，只有加上presets配置才能正常编译

        if (iswatch) {
            b = watchify(b)
        }

        objectFileAry[i].ify = b
        //.transform(babelify, { extensions: [ '.tsx', '.ts' ] })
    })



    Object.keys(objectFileAry).forEach(i => {

        bundle(objectFileAry[i],file,cb);
    })
}

function bundle(w,file,cb) {
    (function (w,file,cb) {

        var src = w.src.replace("\\work\\page\\","\\dist\\scripts\\");

        if (w.src.indexOf("\\public\\script\\") > 0 && w.sourceSrc == "index") {
            src = w.src.replace("\\work\\public\\","\\dist\\public\\");
        }
        w.ify.on('error',handleErrors)
            //转换为gulp能识别的流
            .bundle()
            //报错不跳出
            .on('error',function (error) { console.error(error.toString()); })
            .pipe(source(w.sourceSrc + '.js')) //生产出bundle.js
            .pipe(buffer())
            .pipe(rev(compress))
            .pipe(logger({ showChange: true }))
            .pipe(gulp.dest(src)) //存放在dist文件夹下面
            .pipe(rev.manifest())
            .pipe(gulp.dest("./rev_manifest/js/"))
            .on('end',() => {
                if (!file) {
                    console.log(w.src + w.sourceSrc + ".ts" + "-> 编译完成！");
                }
                jsLodingOver = true;
                try {
                    if (file.length - 1 === index) {
                        cb && cb();
                    } else {
                        index++;
                    }
                } catch (e) { }
            })
    })(w,file,cb)

}




//压缩js
gulp.task("js",function () {
    return jsmin(config.js.dist + "/**/*.js",config.js.dist,"./rev_manifest/js/");
})


function jsmin(dev,dist,rev_manifest) {
    return gulp.src(dev)
        .pipe(logger({ showChange: true }))
        .pipe(rev(compress))
        .pipe(gulpif(compress,uglify()))
        .on('error',function (err) {
            gutil.log(gutil.colors.red('[Error]'),err.toString());
        })
        .pipe(bom())
        .pipe(gulp.dest(dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(rev_manifest));
};
////////////////////////////////   public    ///////////////////////////////////////////////
//压缩public js
gulp.task("public:js:min",function () {
    return jsmin(config.public.script_dist + "/**/*.js",config.public.script_dist,"./rev_manifest/public/js");
})

//css的public的文件生成版本并输出到dist/public里面
gulp.task("publicless",function () {
    return gulpLessMin(config.public.less_dev,config.public.less_dist,"./rev_manifest/public/less/");
})

///////////////////////////////////////////////////////////////

///////////////////样式的处理///////////////////////////////

//less的压缩生成版本号
gulp.task("less",function () {
    return gulpLessMin(config.less.dev,config.less.dist,"./rev_manifest/less/");
})

function gulpLessMin(dev,dist,rev_manifest) {
    return gulpLessPipe(gulp.src(dev),dist,rev_manifest);
}

function gulpLessPipe(gulpSrc,dist,rev_manifest) {

    return gulpSrc.pipe(logger({ showChange: true }))
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(rev(compress))
        .pipe(rename({ suffix: '' }))
        .pipe(cleanCss({ compatibility: 'ie7' }))
        .pipe(bom())
        .pipe(gulp.dest(dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(rev_manifest));
}


//////////////////// 给页面添加版本号 //////////////////
gulp.task('rev',function () {
    return gulp.src(["rev_manifest/**/*.json","../**/*.cshtml","../**/*.html"])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                "dist/scripts": "dist/scripts", //不加的话，版本号添加不了
                "dist/styles": "dist/styles",
                "dist/public/script": "dist/public/script",
                "dist/public/styles": "dist/public/styles"
            }
        }))
        .pipe(bom()) //一定要在输出前引入该包
        .pipe(gulp.dest("../"))
})
/////////////////////////////////////////////////////////////

//////////////////////// 删除js和css的dist文件 //////////////////////////
gulp.task('clean',function () {
    return del([
        config.clean.dist,
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        //  'dist/mobile/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        //    "!style/dist/**/!(Public)*"
    ]);
})
//////////////////////////////////////////////////////////////
//js的chagne会触发多次
var jsLodingOver = true;
gulp.task('watchUpdate',function (cb) {

    //监听less样式的变化
    gulp.watch(config.less.dev).on('change',function (src) {
        let path = src.replace(/\\/g,'/')
        gulpLessMin(path,config.less.dist + srcReplace(path,config.root),"./rev_manifest/less/");
    });
    //监听public less 样式的变化
    gulp.watch(config.public.less_dev).on('change',function (src) {
        let path = src.replace(/\\/g,'/')
        gulpLessMin(path,config.public.less_dist,"./rev_manifest/public/less/");
    });
    //监听ts的改变触发
    gulp.watch([config.js.dev,config.public.script_dev]).on('change',function (src) {
        if (!jsLodingOver) return;
        if (!objectFileAry[src]){
            console.log(src + "-> 不能编辑，需要在node->gulp->build 进行配置！");
            return;
        }
        jsLodingOver = false;
        //完整的路径
        var src = path.resolve(__dirname,src);
        console.log(src + "-> 编译中！");
        bundle(objectFileAry[src]);
    })

})

function srcReplace(src,root) {
    let str = src.replace(root,'')
    let lastIndex = str.lastIndexOf('/')
    return str.substr(0,lastIndex)

}

gulp.task("devStart",
    gulp.series(
        //  'clean',
        'build',
        gulp.parallel('less','publicless'),
    ),
)

gulp.task("watch",
    gulp.series(
        // 'clean',
        'build',
        gulp.parallel('less','publicless'),
        'watchUpdate'
    ))

gulp.task("gaStart",
    gulp.series(
        // 'clean',
        'build',
        gulp.parallel('less','publicless','js','public:js:min'),
        'rev'
    ))



gulp.task('test',function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    },done).start();
});
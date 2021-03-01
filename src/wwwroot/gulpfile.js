var gulp = require("gulp");
var path = require("path");
// var browserify = require("browserify");
var fs = require("fs");
var less = require("gulp-less"); // less 编译
// var source = require('vinyl-source-stream');
// var buffer = require('gulp-buffer'); //把流转成buffer
// var tsify = require("tsify"); //就像gulp-typescript一样
// var handleErrors = require('./node/gulp/handleError');
var cleanCss = require("gulp-clean-css"); //压缩cssr
var del = require('del'); //删除文件1
var rename = require("gulp-rename"); //  重命名
var logger = require('gulp-logger');
var rev = require('@stl/wl-gulp-rev');
var revCollector = require('@stl/wl-gulp-rev-collector');
var bom = require('gulp-bom');
// var gutil = require("gulp-util");      // 重命名
var uglify = require("gulp-uglify");
// var uglify = require('gulp-uglify-es').default;
// var watchify = require("watchify"); //实时更新ts
// var ts = require('gulp-typescript');
var gulpif = require("gulp-if"); //判断
var karmaServer = require('karma').Server;
var build = require('./node/gulp/build');
var config = require("./node/gulp/config");
var paths = build.paths;
// var isArrayFn = build.isArrayFn;
// var babelify = require("babelify");
plumber = require('gulp-plumber');
// var babel = require('gulp-babel');

const { createGulpEsbuild } = require('./node/common/gulp_esbuild')
const gulpEsbuild = createGulpEsbuild()

var minimist = require('minimist'); //命令行参数解析引擎
var compress = minimist(process.argv.slice(2)).compress ? JSON.parse(minimist(process.argv.slice(2)).compress) : false;
var iswatch = minimist(process.argv.slice(2)).watch ? JSON.parse(minimist(process.argv.slice(2)).watch) : false;
let filepath = paths.jspages
//js的chagne会触发多次
var jsLodingOver = true;

gulp.task("build", function (cb) {
    return bundle(filepath, cb, false)
});

function bundle(src, cb, overmessge = true) {
    return gulp.src(src)
        .pipe(gulperror.call(this))
        .pipe(gulpEsbuild({
            bundle: true,
            loader: {
                '.ts': 'ts'
            },
            target: ["es6"],
        }))
        .pipe(logger({ showChange: true }))
        .pipe(rename(function (path) {
            // console.log(path, JSON.stringify(a).slice(0, 500) + JSON.stringify(a).slice(-500), arguments.length)
            //{ dirname: 'work\\page\\test', basename: 'test', extname: '.js'}
            //去掉开头的work\\
            path.dirname = path.dirname.replace(/^work\\/i, '');
            //把page\\替换成scripts
            if (path.dirname.indexOf('page\\') == 0) {
                path.dirname = path.dirname.replace(/^page\\/i, 'scripts\\');
            }
        }))

        .pipe(rev(compress))
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./rev_manifest/js/"))

        .on('end', () => {
            if (overmessge) console.log(src + " -> 编译完成！");
            jsLodingOver = true
            cb && cb();
        })
}

//压缩js
gulp.task("js", function () {
    return jsmin(config.js.dist + "/**/*.js", "dist", "./rev_manifest/js/");
})

//引入glob
var glob = require('glob')
var webpack = require('webpack-stream');
var named = require('vinyl-named');
//entries函数
var entries = function (dev) {
    var jsDir = path.resolve(dev)
    var entryFiles = glob.sync(jsDir)
    var map = {};
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf("/dist/") + 6, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }

    return map;
}

function jsmin(dev, dist, rev_manifest) {
    if (glob.sync(path.resolve(dev)).length <= 0) {
        return gulp.src(dev)
    }
    return gulp.src(dev)
        .pipe(gulperror.call(this))
        .pipe(named())
        .pipe(gulpif(compress, webpack({
            mode: "production",
            module: {
                rules: [{
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/env'],
                                plugins: ["@babel/plugin-transform-runtime"]
                            }
                        }
                    ],
                    exclude: /node_modules/
                }]
            },
            entry: entries(dev),
            output: {
                path: path.join(__dirname, "dist"),
                filename: "[name].js"
            },
        })))
        .pipe(logger({ showChange: true }))
        .pipe(rev(compress))
        // .pipe(gulpif(compress, uglify()))
        .pipe(bom())
        .pipe(gulp.dest(dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(rev_manifest));
};
////////////////////////////////   public    ///////////////////////////////////////////////
//压缩public js
gulp.task("public:js:min", function () {
    return jsmin(config.public.script_dist + "/**/*.js", "dist", "./rev_manifest/public/js");
})

//css的public的文件生成版本并输出到dist/public里面
gulp.task("publicless", function () {
    return gulpLessMin(config.public.less_dev, config.public.less_dist, "./rev_manifest/public/less/");
})

///////////////////////////////////////////////////////////////

///////////////////样式的处理///////////////////////////////

//less的压缩生成版本号
gulp.task("less", function () {
    return gulpLessMin(config.less.dev, config.less.dist, "./rev_manifest/less/");
})

function gulpLessMin(dev, dist, rev_manifest) {
    return gulpLessPipe(gulp.src(dev), dist, rev_manifest);
}

function gulpLessPipe(gulpSrc, dist, rev_manifest) {

    return gulpSrc.pipe(logger({ showChange: true }))
        .pipe(gulperror.call(this))
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
gulp.task('rev', function () {
    return gulp.src(["rev_manifest/**/*.json", "../../**/*.cshtml", "../../**/*.html", '!**/node_modules/**/*'])
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
        .pipe(gulp.dest("../../"))
})
/////////////////////////////////////////////////////////////

//////////////////////// 删除js和css的dist文件 //////////////////////////
gulp.task('clean', function () {
    return del([
        config.clean.dist,
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        //  'dist/mobile/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        //    "!style/dist/**/!(Public)*"
    ]);
})
//////////////////////////////////////////////////////////////

gulp.task('watchUpdate', function (cb) {

    //监听less样式的变化
    gulp.watch(config.less.dev).on('change', function (src) {
        let path = src.replace(/\\/g, '/')
        gulpLessMin(path, config.less.dist + srcReplace(path, config.root), "./rev_manifest/less/");
    });
    //监听public less 样式的变化
    gulp.watch(config.public.less_dev).on('change', function (src) {
        let path = src.replace(/\\/g, '/')
        gulpLessMin(path, config.public.less_dist, "./rev_manifest/public/less/");
    });
    //监听ts的改变触发
    gulp.watch([config.js.dev, config.public.script_dev]).on('change', function (src) {
        var src = path.resolve(__dirname, src);
        if (!jsLodingOver) return;
        if (filepath.indexOf(src) === -1) {
            console.log(src + " -> 不能编辑，需要在node->gulp->build 进行配置！");
            return;
        }
        jsLodingOver = false;
        //完整的路径
        console.log(src + " -> 编译中！");
        bundle(src, cb);
    })

})

function gulperror() {
    return plumber({
        errorHandler: function (err) {
            console.error(err.toString())
            this.emit('end')
        }
    })
}

function srcReplace(src, root) {
    let str = src.replace(root, '')
    let lastIndex = str.lastIndexOf('/')
    return str.substr(0, lastIndex)

}

gulp.task("devStart",
    gulp.series(
        //  'clean',
        gulp.parallel('build', 'less', 'publicless'),
    ),
)

gulp.task("watch",
    gulp.series(
        // 'clean',   
        gulp.parallel('build', 'less', 'publicless'),
        'watchUpdate'
    ))

gulp.task("gaStart",
    gulp.series(
        // 'clean',
        gulp.parallel('build', 'less', 'publicless'),
        gulp.parallel('js', 'public:js:min'),
        'rev'
    ))



gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});


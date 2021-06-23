const { src, dest, series, task } = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const replace = require('gulp-replace')
const tsProject = ts.createProject('tsconfig.json')
const ENV = process.env.NODE_ENV || 'ga'





function clean(cb) {
    return del(['dist'], cb)
}

let ev = ''
//  改修前端的环境变量 用于前端生成对应的环境
function clientEnv() {
    return src(['src/wwwroot/work/common/config/env.ts'])
        .pipe(replace(/export[\s?*]default[\s?*]baseUrl.(dev|test|pre|ga)/, function ($1, $2) {
            ev = $1
            return `export default baseUrl.${ENV}`
        }))
        .pipe(dest('src/wwwroot/work/common/config'))
}

// 生成完成后 还原环境变量
function clientEnvOver() {
    return src(['src/wwwroot/work/common/config/env.ts'])
        .pipe(replace(/export[\s?*]default[\s?*]baseUrl.(dev|test|pre|ga)/, ev))
        .pipe(dest('src/wwwroot/work/common/config'))
}

// 输出 js 到 dist目录
function toJs() {
    return src(['src/**/*.ts', 'src/**/*.js', '!src/wwwroot/**/*'])
        .pipe(tsProject())
        .pipe(dest('dist'))
}


function tostaticfile() {
    return src(['package.json'])
        .pipe(replace('src/bin/www.ts', `bin/www.js`))
        .pipe(replace('./node_modules/.bin/nodemon', ''))
        .pipe(replace('NODE_ENV=ga', `NODE_ENV=${ENV}`))
        .pipe(dest('dist'))
}

function topm2config() {
    return src(['pm2.conf.json'])
        .pipe(replace('koa_ts', `wlzj_${ENV}`))
        .pipe(replace('src/bin/www.ts', `bin/www.js`))
        .pipe(replace(`"interpreter": "../node_modules/.bin/ts-node",`, ``))
        .pipe(dest('dist'))
}

function tostaticwwwroot() {
    return src(['src/wwwroot/assets/**/*'])
        .pipe(dest('dist/wwwroot/assets'))
}

function tostaticwwwrooticon() {
    return src(['src/wwwroot/favicon.ico'])
        .pipe(dest('dist/wwwroot'))
}

function tostaticwwwrootstatic() {
    return src(['src/wwwroot/dist/**/*'])
        .pipe(dest('dist/wwwroot/dist'))
}


function tostaticviews() {
    return src(['src/views/**/*'])
        .pipe(dest('dist/views'))
}

function tostaticcommonasets() {
    return src(['src/common/assets/**/*'])
        .pipe(dest('dist/common/assets'))
}




// nodemon 监控 ts 文件
function runNodemon(done) {
    let stream = nodemon({
        inspect: true,
        script: 'src/bin/www.ts',
        watch: 'src',
        ext: 'ts',
        env: { NODE_ENV: ENV },
        // done: done
        // tasks: ['build'],
    })

    stream.on('restart', function () {
        console.log('nodemon启动成功!')
    }).on('crash', (e) => {
        console.log(e)
        console.error('启动失败，10秒后重启\n')
        stream.emit('restart', 10)  // restart the server in 10 seconds
    })
}

const build = series(clientEnv, clean, toJs, tostaticfile, tostaticviews, topm2config, tostaticwwwroot, tostaticwwwrootstatic, tostaticcommonasets, tostaticwwwrooticon, clientEnvOver)
task('build', build)
task('default', runNodemon)
exports.build = build
exports.default = runNodemon
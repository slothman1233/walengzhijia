import { share } from '@stl/share'
import { comment1fn } from '../../../components/comment/comment1'
import window from '../../../common/win/windows'

import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import { AddPraise, DeletePraise, GetIsPraise } from '../../../common/service/PraiseBrowse.services'
import { CommentTargetTypeEnum, PraiseBrowsePraiseTypeEnum, subCodeEnums } from '../../../../../enums/enums'
import { ChartstoKV } from '../../../components/chart/chart'
import { on } from '@stl/tool-ts/src/common/event/on'


declare const $: JQueryStatic
declare const document: any
declare const reputationId: any
//新闻id
declare const newsId: any

declare const reshighKbChart: any

let main: HTMLElement = document.querySelector('#main');

//图表
(function () {
    ChartstoKV(document.getElementById(`ecahr0`), reshighKbChart)
})();

//分享
(function () {
    new share({})
})();


//评论
(async function () {
    comment1fn(document.querySelector('.questions_box'), {
        type: CommentTargetTypeEnum.praise,
        newsId,
        reputationId,
        pagetype: 'mobile',
    })
})()

//点赞模型
let praiseObject = {
    targetId: reputationId,
    praiseType: PraiseBrowsePraiseTypeEnum.praise,
    praiseUser: 0,

}

//ispraise true可以点赞  false不可以点赞
let praiseObjectDefineProperty = {
    ispraise: true,
    _ispraise: true
};

//点赞初始化
(async function () {
    // let share = main.querySelector('.share')
    let givelike = document.querySelectorAll('.givelike')
    praiseObject.praiseUser = window.getuserid()
    Object.defineProperty(praiseObjectDefineProperty, 'ispraise', {
        configurable: true,
        set: function (newVal: boolean) {
            if (newVal) {

                $(givelike).removeClass('praise')

            } else {

                $(givelike).addClass('praise')

            }
            this._ispraise = newVal
        },
        get: function () {
            return this._ispraise
        }
    })
})();

//新闻点赞
(async function () {

    //初始化点赞状态
    if (praiseObject.praiseUser !== 0) {
        let dataispraise = await GetIsPraise(praiseObject)
        if (dataispraise.code === 0 && dataispraise.subCode === subCodeEnums.success) {
            praiseObjectDefineProperty.ispraise = dataispraise.bodyMessage
        }
    }

    // let share = main.querySelector('.share')
    let givelike = document.querySelectorAll('.givelike')
    // let news_content: HTMLElement = document.querySelector('.news_content')
    // let praise: HTMLElement = news_content.querySelector('.title .praise span')

    givelike.forEach((item: HTMLElement) => {

        item.onclick = async function () {
            if (praiseObject.praiseUser === 0) {
                window.loginshow()
                alert('登录后才能点赞')
                return
            }
            if (praiseObjectDefineProperty.ispraise) {
                let data = await AddPraise(praiseObject)
                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    //点赞数量变化
                    let count = parseInt(item.querySelector('span').innerText)

                    givelike.forEach((items:any) => {
                        items.querySelector('span').innerText = (count + 1).toString()
                    })

                    alert('点赞成功')
                    praiseObjectDefineProperty.ispraise = false
                } else {
                    alert('点赞失败')
                }
            } else {
                let data = await DeletePraise(praiseObject)
                if (data.code === 0 && data.subCode === subCodeEnums.success) {
                    //点赞数量变化
                    let count = parseInt(item.querySelector('span').innerText)

                    givelike.forEach((items:any) => {
                        items.querySelector('span').innerText = (count - 1).toString()
                    })


                    alert('取消点赞成功')
                    praiseObjectDefineProperty.ispraise = true
                } else {
                    alert('取消点赞失败')
                }
            }
        }
    })


})();


//底部浮动
(function () {
    let twistlockfixed = document.querySelector('.twistlockfixed')
    let input: HTMLElement = twistlockfixed.querySelector('.input')

    on({
        agent: twistlockfixed,
        events: 'tap',
        ele: '.input',
        fn: function () {
            let questions: HTMLElement = document.querySelector('.questions')
            let top = questions.offsetTop
            window.scrollTo(0, top)
        }
    })

    on({
        agent: twistlockfixed,
        events: 'tap',
        ele: '.pl',
        fn: function () {
            let questions: HTMLElement = document.querySelector('.allcommon')
            let top = questions.offsetTop
            window.scrollTo(0, top)
        }
    })

    on({
        agent: twistlockfixed,
        events: 'tap',
        ele: '.weixin',
        fn: function () {
            alert('请使用浏览器的分享功能')
        }
    })

})()
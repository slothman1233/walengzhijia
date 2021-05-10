import { share } from '@stl/share'
import { comment1fn } from '../../components/comment/comment1'
import window from '../../common/win/windows'

import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { AddPraise, DeletePraise, GetIsPraise } from '../../common/service/PraiseBrowse.services'
import { PraiseBrowsePraiseTypeEnum, subCodeEnums } from '../../../../enums/enums'
declare const $: JQueryStatic
declare const document: any
declare const reputationId: any

let main = document.querySelector('#main')

let shareObj = new share({
    qrcodeBox: document.getElementById('qrcode'),
    qrcodeDeploy: {
        width: 200,
        height: 200,
        colorDark: '#0000ff',
    }
})


comment1fn(document.querySelector('.questions_box'), (value) => {
    console.log(value)
})



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
    let share = main.querySelector('.share')
    let givelike: HTMLElement = share.querySelector('.givelike')
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

    let share = main.querySelector('.share')
    let givelike: HTMLElement = share.querySelector('.givelike')
    let news_content = main.querySelector('.news_content')
    let praise = news_content.querySelector('.title .praise span')


    givelike.onclick = async function () {
        if (praiseObject.praiseUser === 0) {
            window.loginshow()
            alert('登录后才能点赞')
            return
        }

        if (praiseObjectDefineProperty.ispraise) {
            let data = await AddPraise(praiseObject)
            if (data.code === 0 && data.subCode === subCodeEnums.success) {
                //点赞数量变化
                let count = parseInt(givelike.querySelector('span').innerText)
                givelike.querySelector('span').innerText = (count + 1).toString()
                let praisecount = parseInt(praise.innerText)
                praise.innerText = (praisecount + 1).toString()

                praise
                alert('点赞成功')
                praiseObjectDefineProperty.ispraise = false
            } else {
                alert('点赞失败')
            }
        } else {
            let data = await DeletePraise(praiseObject)
            if (data.code === 0 && data.subCode === subCodeEnums.success) {
                //点赞数量变化
                let count = parseInt(givelike.querySelector('span').innerText)
                givelike.querySelector('span').innerText = (count - 1).toString()
                let praisecount = parseInt(praise.innerText)
                praise.innerText = (praisecount - 1).toString()

                alert('取消点赞成功')
                praiseObjectDefineProperty.ispraise = true
            } else {
                alert('取消点赞失败')
            }
        }
    }
})()


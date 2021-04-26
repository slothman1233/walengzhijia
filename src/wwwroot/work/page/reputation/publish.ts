import { NodeListToArray } from '@stl/tool-ts/src/common/obj/NodeListToArray'
import { ReputationModel } from '../../../../model/reputation/reputation'
import window from '../../common/win/windows'
import { editor_uploadimg } from '../../components/editor'
import { selectOption1 } from '../../components/select'
import { starfn } from '../../components/star'
import { uploadfilefnImg } from '../../components/uploadfile'
import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { subCodeEnums } from '../../../../enums/enums'
import { GetCompanyProductType } from '../../common/service/product.services'

declare const laydate: any

let main = document.getElementById('main')
//用户id
let userId = 0;
(function () {
    //用户id
    let usercookie = getCookie(config.userlogin)
    if (!usercookie) {
        window.loginshow()
    } else {
        userId = JSON.parse(getCookie(config.userlogin)).userId
    }

})()
/**
 * 口碑模型
 * @param {number} companyId 公司标识ID
 * @param {number} productId 产品标识ID
 * @param {string} buyTime 购买时间
 * @param {string} useTime 使用时间
 * @param {number} purchasePrice 购买价格
 * @param {priceShowStatusEnums} priceShowStatus 价格显示状态 - 显示价格，显示数字第一位有小数点，不现实价格
 * @param {string} summary 口碑描述
 * @param {string} reputationIcon 口碑封面图
 * @param {number} createUser 创建用户
 * @param {ReputationScoreModel[]} reputationScores 口碑评分模型
 */
let PublishData: ReputationModel = {
    companyId: 0,
    productId: 0,
    buyTime: '',
    useTime: '',
    purchasePrice: 0,
    priceShowStatus: 0,
    summary: '',
    reputationIcon: '',
    createUser: userId,
    reputationScores: []
};
// lay('#version').html('-v' + laydate.v)

//执行一个laydate实例
//购买时间  投入使用
(function () {
    laydate.render({
        elem: '#purchastime', //指定元素
        type: 'month',
        change: function (value: any, date: any) {
            console.log(value, date)
            // lay('#testView').html(value);
            PublishData.buyTime = value

        }
    })



    laydate.render({
        elem: '#use', //指定元素
        type: 'month',
        change: function (value: any, date: any) {
            console.log(value, date)
            // lay('#testView').html(value);
            PublishData.useTime = value

        }
    })
})()


let onload = window.onload
window.onload = function () {
    onload && onload()

    window.ue.ready(function () {
        //获取内容
        window.ue.getContent()

        editor_uploadimg('edit_container', window.ue, {
            success: (name) => {
                console.log(name)
            },
            error: () => { }
        })
        // editor_uploadvideo('edit_container', window.ue, {
        //     success: (ename) => {
        //         console.log(name)
        //     },
        //     error: (e) => { }
        // })
    })
};


//选择产品
(function () {

    selectOption1((<HTMLElement>document.getElementById('main').querySelector('#s1')), async function (id) {
        // option.style.display = 'none'
        let s2option = document.getElementById('s2').querySelector('.option')
        let selectOption = document.getElementById('s2').querySelector('.selectOption')
        PublishData.companyId = id
        //GetCompanyProductType 
        // 绑定错误
        let data = await GetCompanyProductType(id)

        let html = ``
        if (data.code === 0 && data.subCode === subCodeEnums.success) {
            selectOption.querySelector('h1').setAttribute('data-id', '0')
            selectOption.querySelector('span').innerHTML = ''
            data.bodyMessage.forEach((item, index) => {
                if (index === 0) {
                    PublishData.productId = item.productTypeId
                    selectOption.querySelector('h1').setAttribute('data-id', item.productTypeId.toString())
                    selectOption.querySelector('span').innerHTML = item.productTypeName
                }
                html += `<p data-id="${item.productTypeId}">${item.productTypeName}</p>`
            })
        }
        s2option.innerHTML = html

    })

    selectOption1((<HTMLElement>document.getElementById('main').querySelector('#s2')), function (id) {
        // option.style.display = 'none'
        PublishData.productId = id
    })
})();


//选中星星
(function () {
    let em = ['很差', '低于预期', '中规中矩', '不错', '优秀']

    NodeListToArray(document.querySelectorAll('.star_box > div')).forEach((item: HTMLElement) => {
        starfn(item, (e, val) => {
            item.querySelectorAll('span')[2].innerHTML = `${val}`
            item.querySelector('i').innerHTML = em[Math.floor(val - 0.1)]
            allScore()
        })

    })

})()

//计算总得分
function allScore() {
    let score = 0
    let child = NodeListToArray(document.querySelectorAll('.star_box > div'))
    child.forEach((item: HTMLElement) => {
        score += parseFloat(item.querySelectorAll('span')[2].innerText)
    })
    document.getElementById('main').querySelector('.grade > h2 > i').innerHTML = (score / child.length).toFixed(2)


}

//上传图片
(function () {
    let box: HTMLInputElement = document.querySelector('.uploadcover .box')

    uploadfilefnImg(box, {
        success: (url: string) => {
            PublishData.reputationIcon = url
        }, error: () => {
            alert('上传错误请重新上传')
        },
        delcallback: () => {
            PublishData.reputationIcon = null
        }
    })
})();


(function () {

    let submit = main.querySelector('.submit')
    submit.querySelector('a').onclick = function () {
        submitFn()
    }

})()


async function submitFn() {
    // @param {number} companyId 公司标识ID
    // * @param {number} productId 产品标识ID

    if (!PublishData.companyId) {
        alert('公司标识不能为空！')
        return
    }

    if (!PublishData.productId) {
        alert('产品标识不能为空！')
        return
    }

    if (PublishData.buyTime.length <= 0) {
        alert('购买时间不能为空')
        return
    }

    if (PublishData.useTime.length <= 0) {
        alert('使用时间不能为空')
        return
    }

    let price: HTMLInputElement = main.querySelector('.price input')

    if (price.value.length <= 0 || isNaN(parseFloat(price.value))) {
        alert('购买价格格式不正对')
        return
    }


}
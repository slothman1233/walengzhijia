import { NodeListToArray } from '@stl/tool-ts/src/common/obj/NodeListToArray'
import { ReputationModel, ReputationScoreModel } from '../../../../model/reputation/reputation'
import window from '../../common/win/windows'
import { editor_uploadimg, editor_uploadvideo } from '../../components/editor'
import { selectOption1 } from '../../components/select'
import { starfn } from '../../components/star'
import { uploadfilefnImg } from '../../components/uploadfile'
import config from '../../common/config/env'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { NewsContentTypeEnums, subCodeEnums } from '../../../../enums/enums'
import { GetCompanyProduct, GetCompanyProductType } from '../../common/service/product.services'
import { AddReputaion } from '../../common/service/reputaion.services'
import { bodyModel } from '../../../../model/resModel'
import { GetReputationTypeById } from '../../common/service/ManageLepackReputaion'

declare const laydate: any
declare const companyId: any
declare const productId: any

let main = document.getElementById('main')
//用户id
let userId = window.getuserid()
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
 * @param {NewsContentTypeEnums} newsContentType 新闻内容类型
 */
let PublishData: ReputationModel = {
    title: '',
    companyId,
    productId,
    buyTime: '',
    useTime: '',
    purchasePrice: 0,
    priceShowStatus: 0,
    summary: '',
    reputationIcon: '',
    createUser: userId,
    reputationScores: [],
    newsContentType: NewsContentTypeEnums.content

};


// {
//     "companyId": 0,
//     "productId": 0,
//     "buyTime": "2021-04-30T05:54:20.615Z",
//     "useTime": "2021-04-30T05:54:20.615Z",
//     "purchasePrice": 0,
//     "priceShowStatus": 0,
//     "summary": "string",
//     "reputationIcon": "string",
//     "createUser": 0,
//     "reputationScores": [
//       {
//         "reputationId": 0,
//         "reputationTypeId": 0,
//         "score": 0
//       }
//     ]
//   }

// lay('#version').html('-v' + laydate.v)

//执行一个laydate实例
//购买时间  投入使用
(function () {
    laydate.render({
        elem: '#purchastime', //指定元素
        type: 'month',
        change: function (value: any, date: any) {
            // console.log(value, date)
            // lay('#testView').html(value);
            PublishData.buyTime = value

        }
    })



    laydate.render({
        elem: '#use', //指定元素
        type: 'month',
        change: function (value: any, date: any) {
            // lay('#testView').html(value);
            PublishData.useTime = value

        }
    })
})()


let onload = window.onload
window.onload = function () {
    onload && onload()

    window.ue.ready(function () {


        editor_uploadimg('edit_container', window.ue, {
            success: (name) => {
                // console.log(name)
            },
            error: () => { }
        })
        editor_uploadvideo('edit_container', window.ue, {
            success: (name) => {
                //    console.log(name)
            },
            error: (e) => { }
        })
    })
};


//选择产品
(function () {

    selectOption1((<HTMLElement>document.getElementById('main').querySelector('#s1')), async function (id) {
        // option.style.display = 'none'
        let s2option = document.getElementById('s2').querySelector('.option')
        let selectOption = document.getElementById('s2').querySelector('.selectOption')
        PublishData.companyId = id

        let data = await GetCompanyProduct(id)

        let html = ``
        if (data.code === 0 && data.subCode === subCodeEnums.success) {
            selectOption.querySelector('h1').setAttribute('data-id', '0')
            selectOption.querySelector('span').innerHTML = ''
            data.bodyMessage.forEach((item, index) => {
                if (index === 0) {
                    PublishData.productId = item.productId
                    selectOption.querySelector('h1').setAttribute('data-id', `${item.productId}_${item.productTypeId}`)
                    selectOption.querySelector('span').innerHTML = item.productName
                    //获取产品类型对应的口碑评分项
                    GetReputationType(parseInt(item.productTypeId))
                }
                html += `<p data-id="${item.productId}_${item.productTypeId}">${item.productName}</p>`
            })
        }
        s2option.innerHTML = html

    })

    selectOption1((<HTMLElement>document.getElementById('main').querySelector('#s2')), function (ids) {
        // option.style.display = 'none'
        let productId = parseInt(ids.toString().split('_')[0])
        let productTypeId = parseInt(ids.toString().split('_')[1])
        PublishData.productId = productId
        GetReputationType(productTypeId)
    })
})()

/**
 * 口碑评分项赋值
 * @param {number} productTypeId 产品类型
 */
async function GetReputationType(productTypeId: number) {


    let grade = main.querySelector('.grade > h2 i')
    let star_box = main.querySelector('.star_box')

    //清空评分
    grade.innerHTML = '0.00'
    star_box.innerHTML = ''
    PublishData.reputationScores = []

    let GetReputationType = await GetReputationTypeById({ productTypeId })
    if (GetReputationType && GetReputationType.code === 0 && GetReputationType.subCode === subCodeEnums.success) {
        let ResReputationType = GetReputationType.bodyMessage
        let html = ''
        ResReputationType.forEach((item) => {
            html += `<div data-id="${item.reputationTypeId}"><span>${item.reputationName}：</span><div class="star"><span style="width:0%"></span></div><span>0</span> <i></i></div>`
        })

        star_box.innerHTML = html
        selectstarfn()

    } else {
        alert('获取评分项失败')
    }

}


//选中星星
(function () {
    selectstarfn()
})()
function selectstarfn() {
    let em = ['很差', '低于预期', '中规中矩', '不错', '优秀']

    NodeListToArray(document.querySelectorAll('.star_box > div')).forEach((item: HTMLElement) => {
        starfn(item, (e, val) => {
            item.querySelectorAll('span')[2].innerHTML = `${val}`
            item.querySelector('i').innerHTML = em[Math.floor(val - 0.1)]
            allScore()
        })

    })
}

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

    let reputationtitle: HTMLInputElement = main.querySelector('.reputationtitle')



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


    let checkeDom = main.querySelector('.price input:checked')
    if (!checkeDom) {
        alert('请选择价格显示的方式')
        return
    }

    if (window.ue.body.innerHTML.length <= 0) {
        alert('观点描述不能为空！')
        return
    }

    if (reputationtitle.value.length < 5 || reputationtitle.value.length > 30) {
        alert('标题限制哎5-30个字之内！')
        return
    }
    PublishData.title = reputationtitle.value

    //评分项
    let child = NodeListToArray(document.querySelectorAll('.star_box > div'))
    let scores: ReputationScoreModel[] = []
    for (let i = 0; i < child.length; i++) {
        let item = child[i]
        let id = item.getAttribute('data-id')
        let score = parseFloat(item.querySelectorAll('span')[2].innerText)

        if (score <= 0) {
            alert('评分项每个都必须选择')
            return
        }

        scores.push({
            reputationTypeId: parseInt(id),
            score
        })
    }

    if (PublishData.reputationIcon.length <= 0) {
        alert('封面图不能为空！')
        return
    }

    //判断文章是否有音频
    //有音频则为音频类型
    if (window.publishnews_ue.body.querySelector('video')) {
        PublishData.newsContentType = NewsContentTypeEnums.video
    }

    PublishData.purchasePrice = parseFloat(price.value)
    PublishData.priceShowStatus = parseInt(checkeDom.getAttribute('data-id'))
    PublishData.summary = window.ue.body.innerHTML
    PublishData.reputationScores = scores

    let data: bodyModel<boolean> = await AddReputaion(PublishData)

    if (data.code === 0 && data.subCode === subCodeEnums.success) {
        alert('发表成功')
    } else {
        alert(data.message)
    }
}
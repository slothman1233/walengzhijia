import { on } from '@stl/tool-ts/src/common/event/on'
import env from '../../../common/config/env'
import multipartUpload from '../../../common/utils/multipartUpload/multipartUpload'
import { uploadfilefnImg } from '../../../components/uploadfile'
import window from '../../../common/win/windows'
import type { JQueryStatic } from '../../../../assets/plugin/jquery/jquery'
import { NodeListToArray } from '@stl/tool-ts/src/common/obj/NodeListToArray'
import { starfn } from '../../../components/star'
import { GetCompanyProduct } from '../../../common/service/product.services'
import { ReputationModel, ReputationScoreModel } from '../../../../../model/reputation/reputation'
import { NewsContentTypeEnums, subCodeEnums } from '../../../../../enums/enums'
import { GetReputationTypeById } from '../../../common/service/ManageLepackReputaion'
import { bodyModel } from '../../../../../model/resModel'
import { AddReputaion } from '../../../common/service/reputaion.services'


declare const $: JQueryStatic
declare const mui: any
declare const companyId: any
declare const productId: any


//用户id
let userId = window.getuserid();

(function () {
    if (userId === 0) {
        window.loginshow()
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
    newsContentType: NewsContentTypeEnums.reputation

};

//添加图片
(function () {
    //当前图片数量
    let imgNumber = 0
    let maxlength = 9
    let uploadfileinput: HTMLInputElement = document.querySelector('.uploadimg .upfile .uploadfileinput')

    let loadPath = '/assets/images/loading.png'
    uploadfileinput.onchange = function (e: any) {
        let files = (<HTMLInputElement>e.target).files
        //是否超出大小
        let isBeyondsize = false


        for (let i = 0; i < files.length; i++) {
            if (imgNumber >= maxlength) {
                alert('最多上传9张图片')
                return
            }

            if (files[i].size >= env.imgMaxSize) {
                isBeyondsize = true
                continue
            }
            imgNumber++
            setimgNumber(imgNumber);
            (function (file) {

                let div = document.createElement('div')
                div.className = 'child'

                let img = document.createElement('img')
                img.src = loadPath


                let span = document.createElement('span')

                let idom = document.createElement('i')
                idom.className = 'iconfont_wlzj'
                idom.innerHTML = '&#xE01E;'
                span.appendChild(idom)

                div.appendChild(img)
                div.appendChild(span)

                document.querySelector('.Imagecollection .upfile').before(div)



                multipartUpload(file, {
                    success: function (url: string) {
                        img.src = url
                    },
                    progress: function (i: number) { }
                })

            })(files[i])

        }


        uploadfileinput.value = ''
        if (isBeyondsize) {
            alert('图片不能超过5M大小！')
        }


    }

    function setimgNumber(count: number) {
        document.querySelector('.uploadimg  .imgcount span').innerHTML = count.toString()
    }


    //删除图片
    on({
        agent: document.querySelector('.Imagecollection'),
        events: 'tap',
        ele: 'span',
        fn: function (dom: HTMLElement, e: Event) {

            $(dom).parent().remove()
            --imgNumber
            setimgNumber(imgNumber)
        }
    })
})();

//添加封面
(function () {
    let box: HTMLInputElement = document.querySelector('.cover .l')

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

//购买时间
(function () {
    let dtPicker = new mui.DtPicker({
        type: 'month',
        beginYear: '1949', //设置开始日期 
        endYear: new Date().getFullYear() + 100, //设置结束日期 
    })

    dtPicker.ui.picker.querySelector('.mui-dtpicker-header span').innerHTML = '购买时间'

    let buyime: HTMLElement = document.querySelector('.info .buytime')
    buyime.onclick = function () {
        dtPicker.show(function (selectItems: any) {
            buyime.querySelector('input').value = selectItems.y.text + '-' + selectItems.m.text
            PublishData.buyTime = selectItems.y.text + '-' + selectItems.m.text
        })
    }



})();


//使用时间
(function () {
    let dtPicker = new mui.DtPicker({
        type: 'month',
        beginYear: '1949', //设置开始日期 
        endYear: new Date().getFullYear() + 100, //设置结束日期 
    })

    dtPicker.ui.picker.querySelector('.mui-dtpicker-header span').innerHTML = '使用时间'

    let usetime: HTMLElement = document.querySelector('.info .usetime')
    usetime.onclick = function () {
        dtPicker.show(function (selectItems: any) {
            usetime.querySelector('input').value = selectItems.y.text + '-' + selectItems.m.text
            PublishData.useTime = selectItems.y.text + '-' + selectItems.m.text
        })
    }

})();



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
    document.querySelector('.scoreitems > h2 > span').innerHTML = (score / child.length).toFixed(2)


}

//观点描述
(function () {
    let content_box: HTMLTextAreaElement = document.querySelector('.description_box .content_box')
    let wordcount: HTMLElement = document.querySelector('.description_box .wordcount')
    let div = $(content_box).val()
    setInterval(function () {
        let divNew = $(content_box).val()
        if (div !== divNew) {
            changes()
            div = divNew
        }
    }, 100)

    function changes() {
        wordcount.querySelector('span').innerText = content_box.value.length.toString()
    }



})();

(function () {
    let modal: HTMLElement = document.getElementById('modal')
    let content: HTMLElement = modal.querySelector('.content')
    on({
        agent: content,
        events: 'tap',
        ele: 'a',
        fn: async function (dom: HTMLElement) {
            let id = dom.getAttribute('data-productid')
            let producttypeid = dom.getAttribute('data-producttypeid')
            let name = dom.querySelector('p').innerHTML
            $(dom).siblings().removeClass('select')
            $(dom).addClass('select')
            mui('#modal').popover('toggle')
            GetReputationType(parseInt(producttypeid))
            PublishData.productId = parseInt(id)
            document.querySelector('.selectpooduct .c span').innerHTML = name

        }
    })
})()
/**
 * 口碑评分项赋值
 * @param {number} productTypeId 产品类型
 */
async function GetReputationType(productTypeId: number) {

    let scoreitems = document.querySelector('.scoreitems')
    let grade = scoreitems.querySelector('h2 span')
    let star_box = scoreitems.querySelector('.star_box')

    //清空评分
    grade.innerHTML = '0.00'
    star_box.innerHTML = ''
    PublishData.reputationScores = []

    let GetReputationType = await GetReputationTypeById({ productTypeId })
    if (GetReputationType && GetReputationType.code === 0 && GetReputationType.subCode === subCodeEnums.success) {
        let ResReputationType = GetReputationType.bodyMessage
        let html = ''
        ResReputationType.forEach((item) => {
            html += `<div data-id="${item.reputationTypeId}"><span class='name'>${item.reputationName}</span><div class="star"><span style="width:0%"></span></div><span>0</span> <i></i></div>`
        })

        star_box.innerHTML = html
        selectstarfn()

    } else {
        alert('获取评分项失败')
    }

}


(function () {
    on({

        events: 'tap',
        ele: '.submit',
        fn: function () {
            submitFn()
        }
    })

})()


async function submitFn() {
    // @param {number} companyId 公司标识ID
    // * @param {number} productId 产品标识ID

    let reputationtitle: HTMLInputElement = document.querySelector('.description_box .title')
    let descriptioncontent: HTMLTextAreaElement = document.querySelector('.descriptioncontent .content_box')


    if (!PublishData.companyId) {
        alert('公司标识不能为空！')
        return
    }

    if (!PublishData.productId) {
        alert('产品标识不能为空！')
        return
    }

    // if (PublishData.buyTime.length <= 0) {
    //     alert('购买时间不能为空')
    //     return
    // }

    // if (PublishData.useTime.length <= 0) {
    //     alert('使用时间不能为空')
    //     return
    // }

    let price: HTMLInputElement = document.querySelector('.info .price input')

    // if (price.value.length <= 0 || isNaN(parseFloat(price.value))) {
    //     alert('购买价格格式不正对')
    //     return
    // }


    let checkeDom = document.querySelector('.info .radio input:checked')
    // if (!checkeDom) {
    //     alert('请选择价格显示的方式')
    //     return
    // }

    if (descriptioncontent.value.length < 20) {
        alert('观点描述不能少于20个字符以上')
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
    // if (window.ue.body.querySelector('video')) {
    //     PublishData.newsContentType = NewsContentTypeEnums.video
    // }

    PublishData.purchasePrice = parseFloat(price.value) || 0
    PublishData.priceShowStatus = parseInt(checkeDom.getAttribute('data-id'))

    let content = descriptioncontent.value.replace(/\r/g, '')
    content = '<p>' + content.replace(/\n*$/g, '').replace(/\n/g, '</p><p>') + '</p>'
    PublishData.summary = content

    let Imagecollection = document.querySelector('.Imagecollection')
    let allHTML = ``
    for (let i = 0; i < Imagecollection.querySelectorAll('.child').length; i++) {
        let item = Imagecollection.querySelectorAll('.child')[i]
        let url = item.querySelector('img').src
        let html = `<p><img src="${url}" data-viewer="${url}" style="display: block; margin: auto; max-width: 100%;"></p>`
        allHTML += html
    }
    PublishData.summary += allHTML

    PublishData.reputationScores = scores

    let data: bodyModel<boolean> = await AddReputaion(PublishData)

    if (data && data.code === 0 && data.subCode === subCodeEnums.success) {
        alert('发表成功')
        setTimeout(() => {
            document.location.href = document.location.href
        }, 3000)
    } else {
        alert(data && data.message || '发表错误，请重新发表')
    }
}
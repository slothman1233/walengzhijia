import { selectOption1 } from '../../components/select'
import xlsxtojson, { ArraytoJSON } from '../../components/xlsx/xlsx'
import { on } from '@stl/tool-ts/src/common/event/on'
import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { CompanyProductInfoModel } from '../../../../model/company/Company'
import window from '../../common/win/windows'
import config from '../../common/config/env'
import { editor_uploadimg } from '../../components/editor'
import { uploadfilefnImg, uploadfilefnVideo } from '../../components/uploadfile'
import filecollection from '../../components/uploadfile/filecollection'
import { productImgTypeEnums } from '../../../../enums/enums'

declare const $: JQueryStatic
declare const document: any
declare const laydate: any
let usermain = document.getElementById('usermain')

//用户id
let userId = JSON.parse(getCookie(config.userlogin)).userId

//产品外观图集
let externalImgAry: string[] = []
//产品细节图集
let detaileddrawAry: string[] = []

let publishData: CompanyProductInfoModel = {
    companyId: null,
    createUser: userId,
    productName: null,
    listingDateYear: null,
    listingDateMonth: null,
    productVideo: null,
    productCover: null,
    summary: null,
    productDetailArguments: [],
    productType: {
        productTypeId: null,
        productClassifyType: null
    },
    productMedias: []
};

//xlsx的操作
(function () {
    let imFile = document.getElementById('imFile')
    let product = document.querySelector('#usermain .product')
    xlsxtojson(imFile, {
        success: function (data) {
            let d = ArraytoJSON(data)
            // console.log(d)
            let html = ''


            data.forEach((item: string[]) => {

                for (let i = 0; i < item.length; i += 4) {
                    html += '<tr>'
                    html += ` <td contenteditable="plaintext-only">${item[i]}</td>`
                    html += ` <td contenteditable="plaintext-only">${item[i + 1]}</td>`
                    html += ` <td contenteditable="plaintext-only">${item[i + 2]}</td>`
                    html += ` <td contenteditable="plaintext-only">${item[i + 3]}</td>`
                    html += '</tr>'
                }

            })
            product.querySelector('table').innerHTML = html
        },
        error: function (e) {
            console.log(e)
        }
    })
})();

//产品基本信息
(function () {
    let product = usermain.querySelector('.product')
    let add = product.querySelector('.add')
    let table = product.querySelector('.table')
    on({
        agent: product,
        events: 'click',
        ele: '.add',
        fn: function () {
            $(table).find('table').append(`
            <tr>
                <td contenteditable="plaintext-only"></td>
                <td contenteditable="plaintext-only"></td>
                <td contenteditable="plaintext-only"></td>
                <td contenteditable="plaintext-only"></td>
            </tr>
            `)
        }
    })
})();

//产品类别
(function () {
    selectOption1(usermain.querySelector('#s1'), (id: number, e: Event, option: HTMLElement) => {
        console.log(id, e, option)
        publishData.productType.productTypeId = id
    })
})();

//细节标签
(function () {

    let labels = usermain.querySelector('.basicinfo .labels')
    let Detailslabel = labels.querySelector('.Detailslabel')
    let list = labels.querySelector('.list')


    let productClassifyTypeAry: any[] = []

    //点击X删除
    on({
        agent: Detailslabel,
        events: 'click',
        ele: 'span i',
        fn: function (dom: HTMLElement, ev: Event) {
            let id = $(dom).data('id')
            let index = productClassifyTypeAry.indexOf(id)
            if (index >= 0) { productClassifyTypeAry.splice(index, 1) }
            $(dom).parent().remove()
        }
    })

    //点击标签 添加进入标签列表
    on({
        agent: list,
        events: 'click',
        ele: 'span',
        fn: function (dom: HTMLElement, ev: Event) {
            let id = dom.getAttribute('data-id')
            let value = dom.innerText
            if ($(Detailslabel).find('span[data-id=' + id + ']').length <= 0) {
                $(Detailslabel).append(
                    `<span data-id='${id}'>
                        <b>${value}</b>
                        <i class="iconfont_wlzj">&#xE01E;</i>
                    </span>`
                )
                if (productClassifyTypeAry.indexOf(id) < 0) {
                    productClassifyTypeAry.push(id)
                }

                publishData.productType.productClassifyType = productClassifyTypeAry

            }

        }
    })

})();

//上市时间
(function () {
    laydate.render({
        elem: '#purchastime', //指定元素
        type: 'month',
        change: function (value: any, date: any) { //监听日期被切换
            console.log(value, date)
            // lay('#testView').html(value);
            publishData.listingDateYear = date.year
            publishData.listingDateMonth = date.month
        }
    })



})();

//编辑器
(function () {
    let onload = window.onload
    window.onload = function () {
        onload && onload()
        window.edit_container_ue.ready(function () {
            editor_uploadimg('edit_container', window.edit_container_ue, {
                success: function (imgdom: HTMLImageElement) {
                    console.log(imgdom)
                },
                error: function (e: any) {
                    console.log(e)
                }
            })
        })
    }
})();

//上传产品封面
//上传产品视频
(function () {
    //传产品封面
    let printDom = usermain.querySelector('.uploadproduct .uploadimg_box')
    uploadfilefnImg(printDom, {
        success: (url: string) => {
            publishData.productCover = url
        }, error: (e: any) => {
            alert('上传错误请重新上传')
        },
        delcallback: () => {
            publishData.productCover = null
        }
    })
    //上传产品视频
    let uploadVideo = usermain.querySelector('.uploadproduct .uploadVideo_box')
    uploadfilefnVideo(uploadVideo, {
        success: (url: string) => {
            publishData.productVideo = url
        }, error: (e: any) => {
            alert('上传错误请重新上传')
        },
        delcallback: () => {
            publishData.productVideo = null
        }
    })
})();


//产品外观图
(function () {
    let external: HTMLElement = usermain.querySelector('.productimg .external')
    let externalpreview: HTMLElement = external.querySelector('.preview')
    external.onclick = function () {
        filecollection({
            title: '产品外观图',
            description: '最多20张 图片比例3:2 可拖动排序',
            imgArray: externalImgAry,
            maxlength: 20,
            isdragsort: true,
            callback: function (ary: string[]) {
                externalImgAry = ary
                if (externalImgAry.length > 0) {
                    externalpreview.style.backgroundImage = `url(${externalImgAry[0]})`
                    externalpreview.querySelector('p').innerText = `编辑(已上传${externalImgAry.length}张)`
                    externalpreview.style.display = 'block'
                } else {
                    externalpreview.style.display = 'none'
                }
            },
            exceedlimitCb: function () {
                alert('最多上传20张图片')
            }
        })
    }
})();

//产品细节图
(function () {
    let detaileddraw: HTMLElement = usermain.querySelector('.productimg .detaileddraw')
    let detaileddrawpreview: HTMLElement = detaileddraw.querySelector('.preview')
    detaileddraw.onclick = function () {
        filecollection({
            title: '产品细节图',
            description: '最多20张 图片比例3:2 可拖动排序',
            imgArray: detaileddrawAry,
            maxlength: 20,
            isdragsort: true,
            callback: function (ary: string[]) {
                detaileddrawAry = ary
                if (detaileddrawAry.length > 0) {
                    detaileddrawpreview.style.backgroundImage = `url(${detaileddrawAry[0]})`
                    detaileddrawpreview.querySelector('p').innerText = `编辑(已上传${detaileddrawAry.length}张)`
                    detaileddrawpreview.style.display = 'block'
                } else {
                    detaileddrawpreview.style.display = 'none'
                }
            },
            exceedlimitCb: function () {
                alert('最多上传20张图片')
            }
        })

    }
})();

//提交
(function () {
    let productname = usermain.querySelector('.productname')


    //提交
    let submit = usermain.querySelector('.submit')
    let sub = submit.querySelector('.sub')
    let drafts = submit.querySelector('.drafts')

    sub.onclick = function () {
        getsubContent()

    }



})()


function getsubContent() {
    let productname = usermain.querySelector('.productname')
    //产品名称
    if (productname.value.length <= 0) {
        alert('请输入产品名称')
        return
    }

    if (!publishData.listingDateYear || !publishData.listingDateMonth) {
        alert('请选择产品上市时间')
        return
    }

    if (!publishData.productType.productTypeId) {
        alert('请选择产品分类')
        return
    }

    if (!publishData.productType.productClassifyType && publishData.productType.productClassifyType.length <= 0) {
        alert('请选择产品的细节标签')
        return
    }
    //产品名称
    publishData.productName = productname.value

    //产品基本信息
    let product = usermain.querySelector('.product')
    let table = product.querySelector('.table')

    for (let i = 0; i < $(table).find('tr').length; i++) {
        let tr = $($(table).find('tr')[i])
        let td = tr.find('td')
        publishData.productDetailArguments.push({ productKey: td[0].innerText, productValue: td[1].innerText })
        publishData.productDetailArguments.push({ productKey: td[2].innerText, productValue: td[3].innerText })
    }

    //产品概要
    publishData.summary = window.edit_container_ue.getContent()

    //产品外观图和产品细节图
    publishData.productMedias = []
    //产品外观图
    externalImgAry.forEach((url: string) => {
        publishData.productMedias.push({
            productImgType: productImgTypeEnums.external,
            imageUrl: url,
            imageDesc: ''
        })
    })
    //产品细节图集
    detaileddrawAry.forEach((url: string) => {
        publishData.productMedias.push({
            productImgType: productImgTypeEnums.detaileddraw,
            imageUrl: url,
            imageDesc: ''
        })
    })




    console.log(publishData)

    // /api/Company/AddCompanyProduct
}




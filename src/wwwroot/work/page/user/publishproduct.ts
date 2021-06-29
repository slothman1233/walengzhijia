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
import { productImgTypeEnums, subCodeEnums } from '../../../../enums/enums'
import { AddCompanyProduct, UpdateCompanyProduct } from '../../common/service/company.services'
import { GetProductType } from '../../common/service/product.services'

declare const $: JQueryStatic
declare const document: any
declare const laydate: any
declare const listingDateYear: any
declare const listingDateMonth: any
declare const productTypeId: any
declare let productClassifyTypeAry: any[]
declare const productCover: string
declare const productVideo: string
declare const productId: string

//产品外观图集
declare let externalImgAry: string[]
//产品细节图集
declare let detaileddrawAry: string[]
//是否是草稿
declare const isdrafts: boolean

let usermain = document.getElementById('usermain')

//用户id
let userId = window.getuserid()

//品牌商id
let companyId = JSON.parse(window.getusercookie()).company.companyId


let draftsStorage = 'draftsStorage'

//产品外观图集
// let externalImgAry: string[] = []
//产品细节图集
// let detaileddrawAry: string[] = []

let publishData: CompanyProductInfoModel = {
    companyId: companyId || 2,
    createUser: userId,
    productName: null,
    listingDateYear: 0,
    listingDateMonth: 0,
    productVideo: null,
    productCover: null,
    summary: null,
    productDetailArguments: [],
    productType: {
        productTypeId: null,
        productClassifyType: null
    },
    productMedias: [],
    productId: productId ? parseInt(productId) : 0
};


//草稿默认赋值 
(async function () {
    if (!isdrafts) { return }
    let cache = JSON.parse(localStorage.getItem(draftsStorage)) || {}

    if (!cache[userId]) { return }

    if (!cache[userId][productId]) { return }

    let data = cache[userId][productId]

    publishData = data


    //产品分类 细节标签
    let selectOption = usermain.querySelector('.selectOption')
    let option = selectOption.querySelector('.option')
    let labels = usermain.querySelector('.basicinfo .labels')
    let list: HTMLElement = labels.querySelector('.list')
    let Detailslabel: HTMLElement = labels.querySelector('.Detailslabel')
    let selectDom = $(option).find('p[data-id="' + publishData.productType.productTypeId + '"]')
    if (selectDom) {
        $(selectOption).find('h1 span').text(selectDom.text())
        let id = publishData.productType.productTypeId
        let data = await GetProductType(id)

        let html = ``
        let detailsHTML = ``
        if (data.code === 0 && data.subCode === subCodeEnums.success) {
            data.bodyMessage[0].productTypeLabels.forEach((item) => {

                if (publishData.productType.productClassifyType.indexOf(item.productTypeDetailId) >= 0) {
                    detailsHTML += `<span data-id='${item.productTypeDetailId}'>
                    <b>${item.productTypeDetail}</b>
                    <i data-id='${item.productTypeDetailId}' class="iconfont_wlzj">&#xE039;</i>
                </span>`
                }

                html += `<span data-id="${item.productTypeDetailId}">${item.productTypeDetail}</span>`
            })
        }
        list.innerHTML = html

        Detailslabel.innerHTML = detailsHTML
    }
    //-------------------------------------------------------------------------------------------
    //产品名称 上市时间
    let productname = usermain.querySelector('.productname')
    productname.value = publishData.productName

    let purchastime = usermain.querySelector('#purchastime')
    if (publishData?.listingDateYear && publishData?.listingDateMonth) {
        purchastime.value = `${publishData.listingDateYear}-${publishData.listingDateMonth}`
    }

    //-------------------------------------------------------------------------------------------
    //产品基本信息
    let product = document.querySelector('#usermain .product')
    let html = ``
    if (publishData.productDetailArguments.length <= 0) {
        html += `
        <tr>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        </tr>
        <tr>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        </tr>
        <tr>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        </tr>
        <tr>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        <td contenteditable="plaintext-only"></td>
        </tr>
        `
    } else {
        publishData.productDetailArguments.forEach((item, index) => {
            if (index % 2 === 0) {
                html += '<tr>'
                html += ` <td contenteditable="plaintext-only">${item.productKey}</td>`
                html += ` <td contenteditable="plaintext-only">${item.productValue}</td>`

            } else {
                html += ` <td contenteditable="plaintext-only">${item.productKey}</td>`
                html += ` <td contenteditable="plaintext-only">${item.productValue}</td>`
                html += '</tr>'
            }
        })
    }

    product.querySelector('table').innerHTML = html
    //-------------------------------------------------------------------------------------------
    //产品外观图 和 细节图
    let externalDom = usermain.querySelector('.external')
    let detaileddrawDom = usermain.querySelector('.detaileddraw')
    externalImgAry = []
    detaileddrawAry = []
    publishData.productMedias.forEach(item => {
        switch (item.productImgType) {
            case productImgTypeEnums.external:
                externalImgAry.push(item.imageUrl)
                break
            case productImgTypeEnums.detaileddraw:
                detaileddrawAry.push(item.imageUrl)
                break
            default:
                break
        }

    })
    externalDom.querySelector('.preview').style.backgroundImage = `url(${externalImgAry[0]})`
    externalDom.querySelector('.preview').style.display = 'block'
    detaileddrawDom.querySelector('.preview').style.backgroundImage = `url(${detaileddrawAry[0]})`
    detaileddrawDom.querySelector('.preview').style.display = 'block'
    //-------------------------------------------------------------------------------------------
    //产品封面 和 产品视频
    let uploadimg_box = usermain.querySelector('.uploadimg_box')

    let uploadVideo_box = usermain.querySelector('.uploadVideo_box')
    if (publishData.productCover.length > 0) {
        uploadimg_box.querySelector('.preview').style.backgroundImage = `url(${publishData.productCover})`
        uploadimg_box.querySelector('.preview').style.display = 'block'
        uploadimg_box.querySelector('.delete').style.display = 'block'
    }
    if (publishData.productVideo.length > 0) {
        uploadVideo_box.querySelector('.preview').style.backgroundImage = `url(${publishData.productVideo})`
        uploadVideo_box.querySelector('.preview').style.display = 'block'
        uploadVideo_box.querySelector('.delete').style.display = 'block'
    }


})();


//修改的初始化
(function () {
    if (isdrafts) { return }
    publishData.productType.productTypeId = productTypeId
    publishData.productType.productClassifyType = productClassifyTypeAry
    if (listingDateYear.length > 0 && listingDateMonth.length > 0) {
        publishData.listingDateYear = listingDateYear
        publishData.listingDateMonth = listingDateMonth
    }
    publishData.productCover = productCover.length > 0 ? productCover : null
    publishData.productVideo = productVideo.length > 0 ? productVideo : null
})();

//xlsx的操作
(function () {
    let imFile = document.getElementById('imFile')
    let product = document.querySelector('#usermain .product')
    xlsxtojson(imFile, {
        success: function (data) {
            // let d = ArraytoJSON(data)
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
            // console.log(e)
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

    let labels = usermain.querySelector('.basicinfo .labels')
    let list: HTMLElement = labels.querySelector('.list')
    let Detailslabel: HTMLElement = labels.querySelector('.Detailslabel')
    selectOption1(usermain.querySelector('#s1'), async (id: number, e: Event, option: HTMLElement) => {
        // console.log(id, e, option)
        publishData.productType.productTypeId = id

        let data = await GetProductType(id)

        let html = ``
        if (data.code === 0 && data.subCode === subCodeEnums.success) {
            data.bodyMessage[0].productTypeLabels.forEach((item) => {
                if (item.productTypeDetailId !== 0) {
                    html += `<span data-id="${item.productTypeDetailId}">${item.productTypeDetail}</span>`
                }

            })
        }
        Detailslabel.innerHTML = ''
        list.innerHTML = html
        publishData.productType.productClassifyType = []
    })
})();

//细节标签
(function () {

    let labels = usermain.querySelector('.basicinfo .labels')
    let Detailslabel = labels.querySelector('.Detailslabel')
    let list = labels.querySelector('.list')
    //点击X删除
    on({
        agent: Detailslabel,
        events: 'click',
        ele: 'span i',
        fn: function (dom: HTMLElement, ev: Event) {
            let id = $(dom).data('id')
            let index = productClassifyTypeAry.indexOf(id.toString())
            if (index >= 0) { productClassifyTypeAry.splice(index, 1) }
            $(dom).parent().remove()
            publishData.productType.productClassifyType = productClassifyTypeAry
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
                        <i data-id='${id}' class="iconfont_wlzj">&#xE039;</i>
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
            // console.log(value, date)
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
            if (!isdrafts) {
                //修改
                window.edit_container_ue.setContent(document.getElementById('editorContent').innerHTML)
            } else {
                //草稿
                window.edit_container_ue.setContent(publishData.summary)
            }


            editor_uploadimg('edit_container', window.edit_container_ue, {
                success: function (imgdom: HTMLImageElement) {
                    // console.log(imgdom)
                },
                error: function (e: any) {
                    // console.log(e)
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


//保存为草稿
(function () {
    if (productId && !isdrafts) { return }

    let submit = usermain.querySelector('.submit')
    let drafts = submit.querySelector('.drafts')
    let productIds = Date.now().toString()
    if (drafts) {


        drafts.onclick = function () {
            let productname = usermain.querySelector('.productname')
            //产品名称
            if (productname.value.length <= 0) {
                alert('请输入产品名称')
                return
            }

            let draftsCache = localStorage.getItem(draftsStorage) || '{}'
            let cachejson = JSON.parse(draftsCache)
            if (!cachejson[userId]) { cachejson[userId] = {} }
            if (isdrafts) {
                productIds = productId
            }
            setPublishData()

            cachejson[userId][productIds] = publishData

            localStorage.setItem(draftsStorage, JSON.stringify(cachejson))
            alert('保存草稿成功')
        }
    }
})();

//提交
(function () {
    let productname = usermain.querySelector('.productname')
    //提交
    let submit = usermain.querySelector('.submit')
    let sub = submit.querySelector('.sub')

    sub.onclick = function () {
        getsubContent()

    }



})()


function setPublishData() {
    let productname = usermain.querySelector('.productname')
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
}

async function getsubContent() {
    let productname = usermain.querySelector('.productname')
    //产品名称
    if (productname.value.length <= 0) {
        alert('请输入产品名称')
        return
    }

    // if (!publishData.listingDateYear || !publishData.listingDateMonth) {
    //     alert('请选择产品上市时间')
    //     return
    // }

    if (!publishData.productType.productTypeId) {
        alert('请选择产品分类')
        return
    }

    if (!publishData.productType.productClassifyType && publishData.productType.productClassifyType.length <= 0) {
        alert('请选择产品的细节标签')
        return
    }

    if (!publishData.productCover) {
        alert('请上传产品封面图')
        return
    }
    // if (!publishData.productVideo) {
    //     alert('请选择产品分类')
    //     return
    // }

    setPublishData()


    let datajson
    if ((productId && isdrafts) || !productId) {
        //草稿  和  发布
        datajson = await AddCompanyProduct(publishData)
    } else {
        //修改
        datajson = await UpdateCompanyProduct(publishData)
    }
    if (datajson && datajson.code === 0 && datajson.subCode === subCodeEnums.success) {

        if (isdrafts) {
            let cache = JSON.parse(localStorage.getItem(draftsStorage)) || {}
            delete cache[userId][productId]
            localStorage.setItem(draftsStorage, JSON.stringify(cache))
        }

        alert('发布成功')
        setTimeout(() => {
            document.location.href = '/user/product'
        }, 3000)
    } else {
        alert(datajson?.bodyMessage || '发布失败，请重新发布')
    }
}




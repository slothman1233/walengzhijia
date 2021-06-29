import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { on } from '@stl/tool-ts/src/common/event/on'
import multipartUpload from '../../common/utils/multipartUpload/multipartUpload'
import env from '../../common/config/env'
declare const $: JQueryStatic
/**
 * 图集管理模型
 * @param {string} title 标题
 * @param {string} description 描述
 * @param {string[]} imgArray 图集 默认 []
 * @param {number} maxlength 最大允许上传图片 默认 99
 * @param {boolean} isdragsort 是否需要图片拖拽功能 默认 true
 * @param {callbackfn} callback 点击确定后的回调 imgArray图集
 * @param {exceedlimitCb} exceedlimitCb 图片上传到达上限后的回调
 */
export type filecollectionTypes = {
  title?: string,
  description?: string,
  imgArray?: string[],
  maxlength?: number,
  isdragsort?: boolean,
  callback?: callbackfn,
  exceedlimitCb?: exceedlimitCb
}


type callbackfn = (imgArray: string[]) => void
type exceedlimitCb = () => void

//当前图片数量
let imgNumber = 0

let data: filecollectionTypes = {
    title: '',
    description: '',
    imgArray: [],
    maxlength: 99,
    isdragsort: false,
    callback: function (img: string[]) { },
    exceedlimitCb: function () { }
}

//修改描述里面的图片数量
function setimgNumber(num: number) {
    let filecollectionImg: HTMLElement = document.getElementById('filecollectionImg')
    let filecollectionImg_container = filecollectionImg.querySelector('.filecollectionImg_container')
    let description: HTMLElement = filecollectionImg_container.querySelector('.description')
    description.querySelector('span').innerText = num.toString()
}

//首次初始化
function getHtml() {
    let html = `<div id="filecollectionImg">
                  <div class="filecollectionImg_box">
                    <div class="filecollection_closeicon iconfont_wlzj">&#xE039;</div>
                    <div class="filecollectionImg_container">
                      <div class="title">${data.title}</div>
                      <p class="description">
                        已上传<span>${data.imgArray.length}</span>张 ${data.description}
                      </p>
                      <div class="filecollectionuploadfile">
                          <p>点击上传</p>
                          <input class="uploadfileinput" multiple="multiple" accept="image/jpeg,image/jpg,image/png" type="file"/>
                        </div>
                    
                      <div class="Imagecollection">
                        <div class="child">
                            <img />
                        </div>
                    
                      </div>
                      <div class="collection_sub">
                        <a href="javascript:void(0)" class="collection_sbumit">确定</a>
                        <a href="javascript:void(0)" class="collection_close">取消</a>
                      </div>
                    </div>
                  </div>
                </div>`

    $('body').append(html)
}

//复制
function compile() {
    let filecollectionImg = document.getElementById('filecollectionImg')
    let filecollectionImg_container = filecollectionImg.querySelector('.filecollectionImg_container')
    let title: HTMLElement = filecollectionImg_container.querySelector('.title')
    let description: HTMLElement = filecollectionImg_container.querySelector('.description')
    let Imagecollection: HTMLElement = filecollectionImg.querySelector('.Imagecollection')

    title.innerText = data.title
    description.innerHTML = `已上传<span>${data.imgArray.length}</span>张 ${data.description}`
    Imagecollection.innerHTML = getImgcollection(data.imgArray)
}

//图集赋值
function getImgcollection(imgArray: string[]) {
    let html = ``
    for (let i = 0; i < imgArray.length; i++) {
        html += `<div class="child">
           <img _src_="${imgArray[i]}"/>
           <span><i class="iconfont_wlzj">&#xE039;</i></span>
         </div>`
    }
    return html
}

function stopPropagation(e: Event) {
    e.stopPropagation()
    if (e.preventDefault) {
        e.preventDefault()
    } else {
        window.event.returnValue === false
    }
}

function bindingmethod() {
    let filecollectionImg: HTMLElement = document.getElementById('filecollectionImg')
    let Imagecollection: HTMLElement = filecollectionImg.querySelector('.Imagecollection')
    let close: HTMLElement = filecollectionImg.querySelector('.filecollection_closeicon')
    let collection_close: HTMLElement = filecollectionImg.querySelector('.collection_close')
    let collection_sbumit: HTMLElement = filecollectionImg.querySelector('.collection_sbumit')

    //删除图片
    on({
        agent: Imagecollection,
        events: 'click',
        ele: 'span',
        fn: function (dom: HTMLElement, e: Event) {

            $(dom).parent().remove()
            --imgNumber
            setimgNumber(imgNumber)
        }
    })

    //点击取消
    close.onclick = function () {
        filecollectionImg.style.display = 'none'
    }
    collection_close.onclick = function () {
        filecollectionImg.style.display = 'none'
    }

    //点击提交
    collection_sbumit.onclick = function () {
        let imgary: string[] = []
        Imagecollection.querySelectorAll('img').forEach((item: HTMLImageElement) => {
            imgary.push(item.src)
        })

        data.callback && data.callback(imgary)
        filecollectionImg.style.display = 'none'
    }

}

//上传图片
function uploadimg() {
    let filecollectionImg: HTMLElement = document.getElementById('filecollectionImg')
    let uploadfileinput: HTMLInputElement = filecollectionImg.querySelector('.uploadfileinput')
    let Imagecollection: HTMLElement = filecollectionImg.querySelector('.Imagecollection')
    let loadPath = '/assets/images/loading.png'
    uploadfileinput.onchange = function (e: any) {
        let files = (<HTMLInputElement>e.target).files
        //是否超出大小
        let isBeyondsize = false

       
        for (let i = 0; i < files.length; i++) {
            if (imgNumber >= data.maxlength) {
                data.exceedlimitCb && data.exceedlimitCb()
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
                idom.innerHTML = '&#xE039;'
                span.appendChild(idom)

                div.appendChild(img)
                div.appendChild(span)

                Imagecollection.appendChild(div)


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


}

//拖拽
function drg() {
    (<any>$('#filecollectionImg .Imagecollection')).dragsort(
        {
            dragSelector: '#filecollectionImg .Imagecollection .child img',
            dragEnd: function () { },
            dragBetween: false,
            placeHolderTemplate: '<div class="child"></div>'
        })
}

function datainit(d: filecollectionTypes) {
    data.title = d.title || ''
    data.description = d.description || ''
    data.imgArray = d.imgArray || []
    data.maxlength = d.maxlength || 99
    data.isdragsort = d.isdragsort || false
    data.callback = d.callback
    data.exceedlimitCb = d.exceedlimitCb
    imgNumber = data.imgArray.length
}



/**
 * 图集管理模型
 * 如果需要使用拖拽功能在页面引用 <script type="text/javascript" src="/assets/plugin/dragsort/dragsort.min.js"></script>
 * @param {string} title 标题
 * @param {string} description 描述
 * @param {string[]} imgArray 图集 默认 []
 * @param {number} maxlength 最大允许上传图片 默认 99
 * @param {boolean} isdragsort 是否需要图片拖拽功能 默认 false
 * @param {callbackfn} callback 点击确定后的回调 imgArray图集
 * @param {exceedlimitCb} exceedlimitCb 图片上传到达上限后的回调
 */
export default function filecollection(d: filecollectionTypes) {
    datainit(d)
   
    let filecollectionImg = document.getElementById('filecollectionImg')
    if (!filecollectionImg) {
        getHtml()
        bindingmethod()
        uploadimg()

        if (data.isdragsort) { drg() }
        compile()
    } else {
        compile()
    }

    document.getElementById('filecollectionImg').style.display = 'block'

}



import { getCookie } from '@stl/tool-ts/src/common/compatible/getCookie'
import { on } from '@stl/tool-ts/src/common/event/on'
import { NewsInfoModel } from '../../../../model/news/news'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import config from '../../common/config/env'
import { selectOption1 } from '../../components/select'
import window from '../../common/win/windows'
import { editor_uploadimg, editor_uploadvideo } from '../../components/editor'
import { uploadfilefnImg } from '../../components/uploadfile'
import { AddNews, UpdateNews } from '../../common/service/news.services'
import { NewsContentTypeArray, NewsContentTypeEnums, publishNewsTypeEnumsAry, subCodeEnums } from '../../../../enums/enums'
declare const $: JQueryStatic
declare const document: any
declare const laydate: any
declare const isdrafts: any
declare const newsId: any
declare let newsIcon: any
declare let newsType: any[]
let newsStorage = 'newsStorage'

//用户id
let userId = JSON.parse(getCookie(config.userlogin)).userId

//品牌商id
let companyId = JSON.parse(getCookie(config.userlogin)).company.companyId

/**
 * 新闻模型
 * @param {number} newsId 修改新闻快讯，移除新闻快讯使用
 * @param {number} companyId 公司ID
 * @param {number} productId 对应产品的ID
 * @param {string[]} newsType 新闻类型
 * @param {string} newsTitle 新闻标题
 * @param {string} source 来源
 * @param {string} newsContent 新闻内容
 * @param {string} newsIcon 新闻封面图
 * @param {number} createUser 新闻创建者
 */
let publishData: NewsInfoModel = {
    newsId: newsId || 0,
    companyId: companyId,
    productId: document.getElementById('s1').querySelector('.option p').getAttribute('data-id') || 0,
    newsType,
    newsTitle: '',
    source: '',
    newsContent: '',
    newsIcon: newsIcon,
    createUser: userId,
    newsContentType: NewsContentTypeEnums.content
}

let usermain = document.getElementById('usermain');


//草稿默认赋值 
(async function () {
    if (!isdrafts) { return }
    let cache = JSON.parse(localStorage.getItem(newsStorage)) || {}

    if (!cache[newsId]) { return }

    let data = cache[newsId]

    publishData = data

    let Detailslabel = usermain.querySelector('.Detailslabel')
    //标签选择 
    let labelhtml = ``
    if (publishData.newsType && publishData.newsType.length > 0) {
        publishData.newsType.forEach(id => {
            let value = publishNewsTypeEnumsAry[parseInt(id)]
            labelhtml += `<span data-id="${id}">
            <b>${value}</b>
            <i data-id="${id}" class="iconfont_wlzj"></i>
        </span>`
        })
    }

    Detailslabel.innerHTML = labelhtml
    //----------------------------------------------------------------
    //新闻标题
    let productname = usermain.querySelector('.summary .title p input')
    productname.value = publishData.newsTitle
    //----------------------------------------------------------------
    //关联产品
    let selectOption = usermain.querySelector('.selectOption')
    let option = selectOption.querySelector('.option')
    let h1: HTMLElement = selectOption.querySelector('h1')
    let span = h1.querySelector('span')
    h1.setAttribute('data-id', publishData.productId.toString())
    span.innerHTML = option.querySelector('p[data-id="' + publishData.productId + '"]').innerText
    //----------------------------------------------------------------
    //产品封面

    let uploadimg = usermain.querySelector('.uploadproduct .uploadimg')
    if (publishData.newsIcon.length > 0) {
        uploadimg.querySelector('.preview').style.backgroundImage = `url(${publishData.newsIcon})`
        uploadimg.querySelector('.preview').style.display = 'block'
        uploadimg.querySelector('.delete').style.display = 'block'
    }


    //----------------------------------------------------------------
    window.imgload()
})();


//选择标签
(function () {

    let labels = usermain.querySelector('.basicinfo .labels')
    let Detailslabel = labels.querySelector('.Detailslabel')
    let list = labels.querySelector('.list')


    let newsTypeAry: any[] = newsType

    //点击X删除
    on({
        agent: Detailslabel,
        events: 'click',
        ele: 'span i',
        fn: function (dom: HTMLElement, ev: Event) {
            let id = $(dom).data('id')
            let index = newsTypeAry.indexOf(id.toString())
            if (index >= 0) { newsTypeAry.splice(index, 1) }
            $(dom).parent().remove()
            publishData.newsType = newsTypeAry
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

                if (newsTypeAry.length >= 2) {
                    alert('新闻类型最多两类')
                    return
                }

                $(Detailslabel).append(
                    `<span data-id='${id}'>
                      <b>${value}</b>
                      <i data-id='${id}' class="iconfont_wlzj">&#xE01E;</i>
                  </span>`
                )
                if (newsTypeAry.indexOf(id) < 0) {
                    newsTypeAry.push(id)
                }

                publishData.newsType = newsTypeAry

            }

        }
    })

})();

//关联产品
(function () {
    selectOption1(usermain.querySelector('#s1'), (id: number, e: Event, option: HTMLElement) => {
        console.log(id, e, option)
        publishData.productId = id
    })
})();

//编辑器
(function () {
    let onload = window.onload
    window.onload = function () {
        onload && onload()
        window.publishnews_ue.ready(function () {
            if (!isdrafts) {
                //修改
                window.publishnews_ue.setContent(document.getElementById('editorContent').innerHTML)
            } else {
                //草稿
                window.publishnews_ue.setContent(publishData.newsContent)
            }

            editor_uploadimg('edit_container', window.publishnews_ue, {
                success: function (imgdom: HTMLImageElement) {
                    console.log(imgdom)
                },
                error: function (e: any) {
                    console.log(e)
                }
            })

            editor_uploadvideo('edit_container', window.publishnews_ue, {
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
(function () {
    //传产品封面
    let printDom = usermain.querySelector('.uploadproduct .uploadimg_box')
    uploadfilefnImg(printDom, {
        success: (url: string) => {
            publishData.newsIcon = url
        }, error: (e: any) => {
            alert('上传错误请重新上传')
        },
        delcallback: () => {
            publishData.newsIcon = null
        }
    })
})();

//保存为草稿
(function () {
    if (newsId && !isdrafts) { return }

    let submit = usermain.querySelector('.submit')
    let drafts = submit.querySelector('.drafts')
    let newsIds = Date.now().toString()
    drafts.onclick = function () {
        let productname = usermain.querySelector('.summary .title p input')

        //产品名称
        if (productname.value.length <= 0) {
            alert('请输入新闻标题')
            return
        }

        let draftsCache = localStorage.getItem(newsStorage) || '{}'
        let cachejson = JSON.parse(draftsCache)
        if (isdrafts) {
            newsIds = newsId
        }
        setPublishData()
        cachejson[newsIds] = publishData

        localStorage.setItem(newsStorage, JSON.stringify(cachejson))
        alert('保存草稿成功')
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

function setPublishData() {
    let productname = usermain.querySelector('.summary .title p input')
    //新闻标题
    publishData.newsTitle = productname.value

    //新闻内容
    publishData.newsContent = window.publishnews_ue.body.innerHTML
}

async function getsubContent() {
    let productname = usermain.querySelector('.summary .title p input')
    //产品名称
    if (productname.value.length <= 0) {
        alert('请输入新闻标题')
        return
    }


    if (!publishData.productId) {
        alert('请选择关联产品')
        return
    }

    if (!publishData.newsType || publishData.newsType.length <= 0) {
        alert('请选择新闻类型')
        return
    }

    if (!publishData.newsIcon) {
        alert('请上传产品封面')
        return
    }



    setPublishData()

    //判断文章是否有音频
    //有音频则为音频类型
    if (window.publishnews_ue.body.querySelector('video')) {
        publishData.newsContentType = NewsContentTypeEnums.video
    }



    let datajson
    if ((newsId && isdrafts) || !newsId) {
        //草稿  和  发布
        datajson = await AddNews(publishData)
    } else {
        //修改
        datajson = await UpdateNews(publishData)
    }

    if (datajson.code === 0 && datajson.subCode === subCodeEnums.success) {
        if (isdrafts) {
            let cache = JSON.parse(localStorage.getItem(newsStorage)) || {}
            delete cache[newsId]
            localStorage.setItem(newsStorage, JSON.stringify(cache))
        }

        alert('添加成功')
        setTimeout(() => {
            document.location.href = '/user/news'
        }, 3000)
    } else {
        alert(datajson.bodyMessage)
    }
}




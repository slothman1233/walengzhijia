import { get_unix_time_stamp, ge_time_format } from '../../../../common/utils/util'
import { NewsContentTypeArray, subCodeEnums } from '../../../../enums/enums'
import { GetNewsByCompanyId, GetNewsByProductId } from '../../common/service/news.services'
import { navigationbar2 } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import imgPreview from '../../common/utils/imgPreview/imgPreview'
import window from '../../common/win/windows'
declare const companyId: any
declare const productId: any
declare const $: JQueryStatic
declare const qrcode: any
//相关资讯
(function () {

    let isloaded = false
    let container = $('#main .row4  .list .list1')
    if (container && container.length > 0) {
        document.onscroll = async function (e) {
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {
                if (isloaded) { return }
                isloaded = true
                // let id = $('#main').find('.row5 .list .tab .select').data('id')
                let child = $('#main').find('.row4 .list .list1').find('.child')
                let timetick = $(child[child.length - 1]).data('timetick')
                let newsList = await GetNewsByCompanyId(productId, 0, parseInt(timetick))
                let NewsList: any[] = []
                if (newsList.code === 0 && newsList.subCode === subCodeEnums.success && newsList.bodyMessage) {
                    newsList.bodyMessage.forEach((item) => {
                        let link = '/news/' + item.newsId
                        if (item.reputationId !== 0) {
                            link = '/news/reputation/' + item.newsId
                        }
                        NewsList.push({
                            link,
                            img: item.newsIcon,
                            title: item.newsTitle,
                            content: item.newsContent.replace(/<[^>]*>|/g, ''),
                            author: item.createUser,
                            time: ge_time_format(item.newsTime, '2'),
                            businesslogo: item.companyIcon,
                            businessname: item.userName,
                            timetick: get_unix_time_stamp(item.newsTime, 2),
                            slug: [NewsContentTypeArray[item.newsContentType]]
                        })
                    })
                    let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: newsList })

                    if (datas.code === 0) {
                        container.append(datas.bodyMessage)
                        isloaded = false
                        window.imgload()
                    }
                }
            }
        }
    }
})();

//图片放大
(function () {
    imgPreview({
        parentEle: document.querySelector('.row1 .productVideo'),
        key: 'video',

        clickCallback: function (dom, ev) {
            // console.log(dom, ev)
            return true
        }
    })

    imgPreview({
        parentEle: document.querySelector('.row1 .productimg'),
        key: 'img',

        clickCallback: function (dom, ev) {
            // console.log(dom, ev)
            return true
        }
    })
})();

//邀请发送口碑
(function () {
    let more: HTMLElement = document.querySelector('.btm .more')
    let invitepopup: HTMLElement = document.querySelector('.invitepopup')
    let close: HTMLElement = invitepopup.querySelector('.iconfont_wlzj')
    let copylink: HTMLElement = invitepopup.querySelector('.copylink')
    let copylinka: HTMLElement = copylink.querySelector('a')
    let copylinkinput: HTMLInputElement = copylink.querySelector('input')
    copylinkinput.value = document.location.href
    more.onclick = function () {
        invitepopup.style.display = 'block'
    }

    close.onclick = function () {
        invitepopup.style.display = 'none'
    }

    //二维码生成
    let dom = document.getElementById('qrcode')

    $(dom).qrcode({ text: document.location.href.replace('/business/', '/m/business/'), render: 'canvas', width: 154, height: 154, })

    copylinka.onclick = function (e: any) {
        copylinkinput.select()		
        document.execCommand('Copy')
        alert('链接复制成功！')
    }


})()

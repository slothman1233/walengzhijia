import { get_unix_time_stamp, ge_time_format } from '../../../../common/utils/util'
import { NewsContentTypeArray, subCodeEnums } from '../../../../enums/enums'
import { GetNewsByCompanyId, GetNewsByProductId } from '../../common/service/news.services'
import { navigationbar2 } from '../../components/navigationbar'

import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
declare const companyId: any
declare const productId: any
declare const $: JQueryStatic
//相关资讯
(function () {

    let isloaded = false
    let container = $('#main .row4  .list .list1')
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
                    NewsList.push({
                        link: '/news/' + item.newsId,
                        img: item.newsIcon,
                        title: item.newsTitle,
                        content: item.newsContent.replace(/<[^>]*>|/g, ''),
                        author: item.createUser,
                        time: ge_time_format(item.newsTime, '2'),
                        businesslogo: item.companyIcon,
                        businessname: item.companyName,
                        timetick: get_unix_time_stamp(item.newsTime, 2),
                        slug: [NewsContentTypeArray[item.NewsContentType]]
                    })
                })
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: newsList })

                if (datas.code === 0) {
                    container.append(datas.bodyMessage)
                    isloaded = false
                }
            }
        }
    }

})()
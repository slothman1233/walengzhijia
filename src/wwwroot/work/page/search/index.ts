import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const $: JQueryStatic
(function () {
    let search = document.querySelector('#main .search')
    let btn = search.querySelector('a')
    let input = search.querySelector('input')
    btn.onclick = function () {
        if (input.value.length <= 0) {
            alert('清输入搜索内容')
        }

        document.location.href = `/search/1/${encodeURI(input.value)}`

    }

})();

(function () {
    let data = {
        args: [
            {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11',
                businesslogo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                businessname: '万联',
                slug: ['视频', '音频']
            }, {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }, {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }, {
                link: '#',
                img: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
                title: '为解决供应短缺问题 iPhone 12 Pro零件不够iPad来凑？',
                content: '显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。显示一行正文内容。',
                author: '作者大大',
                time: '2021-11-11'
            }
        ]
    }
    let isloaded = false
    document.onscroll = async function (e) {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 300) {
            if (isloaded) { return }


            isloaded = true
            setTimeout(async () => {
                let datas: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'list1', data: data })

                if (datas.code === 0) {
                    let list_box = $('#main .list_box')
                    list_box.append(datas.bodyMessage)
                    isloaded = false
                }
            }, 500)


        }
    }

})()
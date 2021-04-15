import { kkpager } from '@stl/kkpager'
import { on } from '@stl/tool-ts/src/common/event/on'
import { navigationbar2, usernavigationbar } from '../../components/navigationbar'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
declare const tabType: any
declare const pageIndex: number
declare const $: JQueryStatic

//已发布
(function () {
    //tab切换
    usernavigationbar('usermain', (dom: Element) => {
        let index = $(dom).index()
        let thatshowdom = $($('#usermain .box > div')[index])
        thatshowdom.siblings().hide()
        thatshowdom.show()
    })
})();
(function () {
    //已发布下的分页
    if (document.getElementById('publish_kkpage')) {
        kkpager({
            pagerid: 'publish_kkpage',
            total: 20,
            pno: pageIndex,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async function (i: number) {
                let id = $('#usermain .publish .navigationbar2 .select').data('id')
                console.log(id)
                let html = await getdata(id)
                $('#usermain .publish .child_box').html(html)
            }

        })
    }

    //已发布 下的切换
    navigationbar2('usermain', async (dom: Element) => {
      
        let id = $(dom).data('id')
        
        let html = await getdata(id)

        $('#usermain .publish .child_box').html(html)

        kkpager({
            pagerid: 'publish_kkpage',
            total: 20,
            pno: 1,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async function (i: number) {
                let html = await getdata(id)
                $('#usermain .publish .child_box').html(html)
            }

        })

    })

})()

//获取数据
async function getdata(id:any){
    let d = {
        title: '全部',
        id: '123',
        count: '24',
        child: [{
            logo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            title: 'WL C220 2200（产品名称）5555',
            label: ['分类A', '分类A', '分类A'],
            id: '11',
            createTime: '2020-08-01'
        },
        {
            logo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            title: 'WL C220 2200（产品名称）22111',
            label: ['分类A', '分类A', '分类A'],
            id: '11',
            createTime: '2020-08-01'
        },
        {
            logo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            title: 'WL C220 2200（产品名称）',
            label: ['分类A', '分类A', '分类A'],
            id: '11',
            createTime: '2020-08-01'
        },
        {
            logo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            title: 'WL C220 2200（产品名称）',
            label: ['分类A', '分类A', '分类A'],
            id: '11',
            createTime: '2020-08-01'
        },
        {
            logo: 'https://cn.bing.com/th?id=OHR.CarrizoPlain_ZH-CN5933565493_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4&r=0',
            title: 'WL C220 2200（产品名称）',
            label: ['分类A'],
            id: '11',
            createTime: '2020-08-01'
        }]
    }
  
    let html = ''
    for (let i = 0; i < d.child.length; i++) {
        let item = d.child[i]
        let labelhtml = ''
        for (let j = 0; j < item.label.length; j++) {
            labelhtml += `<span>${item.label[j]}</span>`
        }

        html += `<div class="child">
        <img src="${item.logo}"/>
        <div class="c">
          <h3>${item.title}</h3>
            <p class="clearfix">
                ${labelhtml}
            </p>
          <p class="createtime">发布时间：${item.createTime}</p>

        </div>
        <div class="r">
          <a href="/user/sales/2/11">修改</a>
          <a href="javascript:(0)" data-id="${item.id}" class="stick" style='display:${i === 0 ? 'none' : 'block'}'>置顶</a>
        </div>
      </div>`
    }
    return html
}

(function () {
    //点击置顶
    let child_box = document.querySelector('#usermain .publish .child_box')
    on({
        agent: child_box,
        events: 'click',
        ele: '.stick',
        fn: function (dom: any, ev: any) {
            let id = $(dom).data('id')
            if (pageIndex === 1) {
                $($(child_box).find('.child')[0]).find('.stick').show()
                $(child_box).prepend($(dom).parents('.child'))
                $(dom).hide()
                alert('置顶成功')
            } else {
                $(dom).parents('.child').remove()
                alert('置顶成功')
            }

        }
    })
})();
//----------------------------------------------

//审核中
(function(){
    //已发布下的分页
    if (document.getElementById('drafts_kkpage')) {
        kkpager({
            pagerid: 'drafts_kkpage',
            total: 20,
            pno: pageIndex,
            mode: 'click',
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isShowLastPage: false,
            lang: {
                prePageText: '上一页',
                nextPageText: '下一页',
            },
            click: async function (i: number) {
                let id = $('#usermain .drafts .navigationbar2 .select').data('id')
                console.log(id)
                let html = await getdata(id)
                $('#usermain .drafts .child_box').html(html)
            }

        })
    }
})()
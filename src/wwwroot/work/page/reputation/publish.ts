import { NodeListToArray } from '@stl/tool-ts/src/common/obj/NodeListToArray'
import window from '../../common/win/windows'
import { editor_uploadimg, editor_uploadvideo } from '../../components/editor'
import { selectOption1 } from '../../components/select'
import { starfn } from '../../components/star'
import { uploadfilefn } from '../../components/uploadfile'
declare const lay: any
declare const laydate: any

// lay('#version').html('-v' + laydate.v)

//执行一个laydate实例
//购买时间  投入使用
(function () {
    laydate.render({
        elem: '#purchastime', //指定元素
        type: 'month'
    })

    laydate.render({
        elem: '#use', //指定元素
        type: 'month'
    })
})()


let onload = window.onload
window.onload = function () {
    onload && onload()
    
    window.ue.ready(function () {
        //获取内容
        window.ue.getContent()

        editor_uploadimg('edit_container', {
            success: (e, name) => {
                console.log(1, e, name)
            }
        })
        editor_uploadvideo('edit_container', {
            success: (e, name) => {
                console.log(2, e, name)
            }
        })
    })
};


//选择产品
(function () {

    selectOption1('s1', function (id, e, option) {
        option.style.display = 'none'
    })

    selectOption1('s2', function (id, e, option) {
        option.style.display = 'none'
    })
})();


//选中星星
(function () {
    let em = ['很差', '低于预期', '中规中矩', '不错', '优秀']

    NodeListToArray(document.querySelectorAll('.star_box > div')).forEach((item: HTMLElement) => {
        starfn(item, (e, val) => {

            item.querySelectorAll('span')[2].innerHTML = `${val}.0`
            item.querySelector('i').innerHTML = em[val - 1]
        })

    })

})();

//上传图片
(function () {
    let box: HTMLElement = document.querySelector('.uploadcover .box')
    uploadfilefn(box, {
        success: (e, name) => {
            console.log(e, name)
        }
    })
})()
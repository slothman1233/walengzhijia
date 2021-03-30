import window from '../../common/win/windows'
declare const lay: any
declare const laydate: any

lay('#version').html('-v' + laydate.v)

//执行一个laydate实例

laydate.render({
    elem: '#purchastime', //指定元素
    type: 'month'
})

laydate.render({
    elem: '#use', //指定元素
    type: 'month'
})

declare let UE: any

let onload = window.onload
window.onload = function(){
    onload && onload()
    window.ue.ready(function () {
        console.log(123123)
    })
}





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



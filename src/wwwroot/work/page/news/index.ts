import { share } from '@stl/share'
import { imgPreview } from '@stl/image-preview'
import { comment1fn } from '../../components/comment/comment1'
declare const document: any
let shareObj = new share({
    qrcodeBox: document.getElementById('qrcode'),
    qrcodeDeploy: {
        width: 200,
        height: 200,
        colorDark: '#0000ff',
    }
})


comment1fn(document.querySelector('.questions_box'), (value) => {
    console.log(value)
});

//图片放大
(function () {
    imgPreview({
        parentEle: document.querySelector('#main .container .content'),
        key: 'img',
        clickCallback: function (dom, ev) {
            console.log(dom, ev)
            return true
        }
    })
})()
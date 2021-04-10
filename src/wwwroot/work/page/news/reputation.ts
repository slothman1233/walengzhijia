import { share } from '@stl/share'
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
})
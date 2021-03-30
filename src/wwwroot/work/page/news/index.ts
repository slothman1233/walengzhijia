import { share } from '@stl/share'
declare const document: any
let shareObj = new share({
    qrcodeBox: document.getElementById('qrcode'),
    qrcodeDeploy: {
        width: 200,
        height: 200,
        colorDark: '#0000ff',
    }
})

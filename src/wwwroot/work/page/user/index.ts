import multipartUpload from '../../common/utils/multipartUpload/multipartUpload'

document.getElementById('file').addEventListener('change', async function (e) {


    multipartUpload((<HTMLInputElement>e.target).files[0], {
        //成功的回调
        success: function (url) {
            console.log(url)
        },
        //失败的回调
        error: function (e) {
            console.log(e)
        },
        //进度回调
        progress: function (i) {
            console.log(i)
        }
    })

})

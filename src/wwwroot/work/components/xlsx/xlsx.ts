
declare const XLSX: any

/**
 * 上传参数说明
 * @param {Function(url)} success 成功后的回调  data json数据  [[][]] 二元二次数组
 * @param {Function(e)} error 失败后的回调      e 错误
 */
export type xlsxUploadType = {
    success?: successType
    error?: errorType

}

export type successType = (data: any) => void
export type errorType = (e: any) => void


/**
 * xlsx 转json 
 * 页面需要引入  <script type="text/javascript" src="/assets/plugin/xlsx/xlsx.core.min.js"></script>
 * input 直接收xlsx xls类型文件  <input type="file"   id="imFile"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
 * @param {HTMLElement} inputDom  上传的input元素
 * @param param1 
    * @param {Function(url)} success 成功的回调    url  文件地址
    * @param {Function(e)} error 失败的回调  e错误信息
    * @param {function (i)} progress 进度回调  i 当前进度   1为100%
 */
export default function xlsxtojson(inputDom: HTMLInputElement, {
    success,
    error
}: xlsxUploadType) {
    inputDom.onchange = function (e: any) {
        importFile(inputDom, e, {
            success,
            error
        })
    }
}

/**
 * 数组转JSON
 * @param {Array<Array<string>>} data 双数组 [[],[]]
 * @returns {Array<Object>} d 得到的JSON数组[{},{}]
 */
export function ArraytoJSON(data: any[]) {
    let d: any[] = []
    data.forEach((item: string[]) => {
        let jsonary = []
        for (let i = 1; i < item.length; i += 2) {
            let json = {}
            json[item[i - 1]] = item[i]
            jsonary.push(json)
        }
        d.push(jsonary)
    })
    return d
}



function fixdata(data: any) { // 文件流转BinaryString
    let o = ''
    let l = 0
    let w = 10240
    for (; l < data.byteLength / w; ++l) {
        o += String
            .fromCharCode
            .apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
    }
    o += String
        .fromCharCode
        .apply(null, new Uint8Array(data.slice(l * w)))
    return o
}
function importFile(inputDom: HTMLInputElement, e: any, {
    success,
    error
}: xlsxUploadType) { //input事件
    try {
        let event = e || window.event
        // 通过DOM取文件数据
        let file = (<any>event.target).files[0]
        let rABS = false //是否将文件读取为二进制字符串
        let f = file
        let reader = new FileReader()
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
            let binary = ''
            let rABS = false //是否将文件读取为二进制字符串
            let wb //读取完成的数据
            let outdata
            let reader: any = new FileReader()
            reader.onload = function (e: any) {
                let bytes = new Uint8Array(reader.result)
                let length = bytes.byteLength
                for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i])
                }
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                        type: 'base64'
                    })
                } else {
                    wb = XLSX.read(binary, { type: 'binary' })
                }
                outdata = XLSX
                    .utils
                    .sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' })
                let da = [...outdata]

                success && success(da)
                //清空input里面的内容
                inputDom.value = ''
            }
            reader.readAsArrayBuffer(f)
        }
        if (rABS) {
            reader.readAsArrayBuffer(f)
        } else {
            reader.readAsBinaryString(f)
        }
    } catch (e) {
        error(e)

    }
}


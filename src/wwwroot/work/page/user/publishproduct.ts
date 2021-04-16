import xlsxtojson, { ArraytoJSON } from '../../components/xlsx/xlsx'

declare const document: any


(function () {
    let imFile = document.getElementById('imFile')
    let product = document.querySelector('#usermain .product')
    xlsxtojson(imFile, {
        success: function (data) {
            let d = ArraytoJSON(data)
            // console.log(d)
            let html = ''


            data.forEach((item: string[]) => {

                for (let i = 0; i < item.length; i += 4) {
                    html += '<tr>'
                    html += ` <td contenteditable="plaintext-only">${item[i]}</td>`
                    html += ` <td contenteditable="plaintext-only">${item[i + 1]}</td>`
                    html += ` <td contenteditable="plaintext-only">${item[i + 2]}</td>`
                    html += ` <td contenteditable="plaintext-only">${item[i + 3]}</td>`
                    html += '</tr>'
                }

            })
            product.querySelector('table').innerHTML = html
        },
        error: function (e) {
            console.log(e)
        }
    })
})()
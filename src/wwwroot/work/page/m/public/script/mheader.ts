declare const mui: any

(function () {
    let mhearder = document.getElementById('mhearder')

    if (mhearder) {
        let home = mhearder.querySelector('homes')
        mui('#mhearder').on('tap', '.homes', () => {
            window.location.href = '/m/index'
        })

        mui('#mhearder').on('tap', '.goback', () => {
            window.history.back()
            //  window.location.replace(document.referrer)
        })
    }


})()
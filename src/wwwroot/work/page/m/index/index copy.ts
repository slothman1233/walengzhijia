import swiper from 'swiper'

declare const mui: any

mui.previewImage()



new swiper('.swiper-container', {
    watchSlidesProgress: !0,
    direction: 'horizontal',
    //  autoplay: true, //可选选项，自动滑动
    centeredSlides: !0,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    on: {
        progress: function (t) {

        },
        setTransition: function (t) {
            // console.log('setTransition' + t)
            // for (let e = 0; e < this.slides.length; e++) { this.slides.eq(e).transition(t) }
        }
    }
})

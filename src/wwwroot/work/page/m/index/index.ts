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
            // console.log('progress' + t)
            // for (let e = 0; e < this.slides.length; e++) {
            //     let n = this.slides.eq(e),
            //         o = this.slides[e].progress,
            //         i = 1
            //     1 < Math.abs(o) && (i = .5 * (Math.abs(o) - 1) + 1)
            //     let r = o * i + 'px',
            //         s = 1 - Math.abs(o) / 25
            //     i = 999 - Math.abs(Math.round(10 * o))
            //     n.transform('translateX(' + r + ') scale(' + s + ')'),
            //     n.css('zIndex', i),
            //     n.css('opacity', 1),
            //     3 < Math.abs(o) && n.css('opacity', 0)
            // }
        },
        setTransition: function (t) {
            // console.log('setTransition' + t)
            // for (let e = 0; e < this.slides.length; e++) { this.slides.eq(e).transition(t) }
        }
    }
})

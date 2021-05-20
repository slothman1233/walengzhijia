(function($, window) {

    let template = '<div id="{{id}}" class="mui-slider mui-preview-image mui-fullscreen" style="disply:none"><div class="mui-preview-header">{{header}}</div><div class="mui-slider-group"></div><div class="mui-preview-footer mui-hidden">{{footer}}</div><div class="mui-preview-loading"><span class="mui-spinner mui-spinner-white"></span></div></div>'
    let itemTemplate = '<div class="mui-slider-item mui-zoom-wrapper {{className}}"><div class="mui-zoom-scroller"><img src="{{src}}" data-preview-lazyload="{{lazyload}}" style="{{style}}" class="mui-zoom"></div></div>'
    let defaultGroupName = '__DEFAULT'
    let div = document.createElement('div')
    let imgId = 0
    let PreviewImage = function(options) {
        this.options = $.extend(true, {
            id: '__MUI_PREVIEWIMAGE',
            zoom: true,
            header: '<span class="mui-preview-indicator"></span>',
            footer: ''
        }, options || {})
        this.init()
        this.initEvent()
    }
    let proto = PreviewImage.prototype
    proto.init = function() {
        let options = this.options
        let el = document.getElementById(this.options.id)
        if (!el) {
            div.innerHTML = template.replace(/\{\{id\}\}/g, this.options.id).replace('{{header}}', options.header).replace('{{footer}}', options.footer)
            document.body.appendChild(div.firstElementChild)
            el = document.getElementById(this.options.id)
        }

        this.element = el
        this.scroller = this.element.querySelector($.classSelector('.slider-group'))
        this.indicator = this.element.querySelector($.classSelector('.preview-indicator'))
        this.loader = this.element.querySelector($.classSelector('.preview-loading'))
        if (options.footer) {
            this.element.querySelector($.classSelector('.preview-footer')).classList.remove($.className('hidden'))
        }
        this.addImages()
    }
    proto.initEvent = function() {
        let self = this
        $(document.body).on('tap', 'img[data-preview-src]', function () {
            if(!(this.parentNode.nodeName === 'A')){ //为满足需求改动mui图片预览 适应web端转化h5返回结构a标签点击跳转，其余无a标签图片放大预览
                self.open(this)
            }
            return
        })
        let laterClose = null
        var laterCloseEvent = function() {
            !laterClose && (laterClose = $.later(function() {
                self.loader.removeEventListener('tap', laterCloseEvent)
                self.scroller.removeEventListener('tap', laterCloseEvent)
                self.close()
            }, 300))
        }
        this.scroller.addEventListener('doubletap', function() {
            if (laterClose) {
                laterClose.cancel()
                laterClose = null
            }
        })
        this.element.addEventListener('webkitAnimationEnd', function() {
            if (self.element.classList.contains($.className('preview-out'))) { //close
                self.element.style.display = 'none'
                self.element.classList.remove($.className('preview-out'))
                self.element.classList.remove($.className('preview-in'))
                laterClose = null
            } else { //open
                self.loader.addEventListener('tap', laterCloseEvent)
                self.scroller.addEventListener('tap', laterCloseEvent)
            }
        })
        this.element.addEventListener('slide', function(e) {
            if (self.options.zoom) {
                let lastZoomerEl = self.element.querySelector('.mui-zoom-wrapper:nth-child(' + (self.lastIndex + 1) + ')')
                if (lastZoomerEl) {
                    $(lastZoomerEl).zoom().setZoom(1)
                }
            }
            let slideNumber = e.detail.slideNumber
            self.lastIndex = slideNumber
            self.indicator && (self.indicator.innerText = (slideNumber + 1) + '/' + self.currentGroup.length)
            self._loadItem(slideNumber)

        })
    }
    proto.addImages = function(group, index) {
        this.groups = {}
        let imgs = []
        if (group) {
            if (group === defaultGroupName) {
                imgs = document.querySelectorAll('img[data-preview-src]:not([data-preview-group])')
            } else {
                imgs = document.querySelectorAll('img[data-preview-src][data-preview-group=\'' + group + '\']')
            }
        } else {
            imgs = document.querySelectorAll('img[data-preview-src]')
        }
        if (imgs.length) {
            for (let i = 0, len = imgs.length; i < len; i++) {
                this.addImage(imgs[i])
            }
        }
    }
    proto.addImage = function(img) {
        let group = img.getAttribute('data-preview-group')
        group = group || defaultGroupName
        if (!this.groups[group]) {
            this.groups[group] = []
        }
        let src = img.getAttribute('src')
        if (img.__mui_img_data && img.__mui_img_data.src === src) { //已缓存且图片未变化
            this.groups[group].push(img.__mui_img_data)
        } else {
            let lazyload = img.getAttribute('data-preview-src')
            if (!lazyload) {
                lazyload = src
            }
            let imgObj = {
                src: src,
                lazyload: src === lazyload ? '' : lazyload,
                loaded: src === lazyload ? true : false,
                sWidth: 0,
                sHeight: 0,
                sTop: 0,
                sLeft: 0,
                sScale: 1,
                el: img
            }
            this.groups[group].push(imgObj)
            img.__mui_img_data = imgObj
        }
    }


    proto.empty = function() {
        this.scroller.innerHTML = ''
    }
    proto._initImgData = function(itemData, imgEl) {
        if (!itemData.sWidth) {
            let img = itemData.el
            itemData.sWidth = img.offsetWidth
            itemData.sHeight = img.offsetHeight
            let offset = $.offset(img)
            itemData.sTop = offset.top
            itemData.sLeft = offset.left
            itemData.sScale = Math.max(itemData.sWidth / window.innerWidth, itemData.sHeight / window.innerHeight)
        }
        imgEl.style.webkitTransform = 'translate3d(0,0,0) scale(' + itemData.sScale + ')'
    }

    proto._getScale = function(from, to) {
        let scaleX = from.width / to.width
        let scaleY = from.height / to.height
        let scale = 1
        if (scaleX <= scaleY) {
            scale = from.height / (to.height * scaleX)
        } else {
            scale = from.width / (to.width * scaleY)
        }
        return scale
    }
    proto._imgTransitionEnd = function(e) {
        let img = e.target
        img.classList.remove($.className('transitioning'))
        img.removeEventListener('webkitTransitionEnd', this._imgTransitionEnd.bind(this))
    }
    proto._loadItem = function(index, isOpening) { //TODO 暂时仅支持img
        let itemEl = this.scroller.querySelector($.classSelector('.slider-item:nth-child(' + (index + 1) + ')'))
        let itemData = this.currentGroup[index]
        let imgEl = itemEl.querySelector('img')
        this._initImgData(itemData, imgEl)
        if (isOpening) {
            let posi = this._getPosition(itemData)
            imgEl.style.webkitTransitionDuration = '0ms'
            imgEl.style.webkitTransform = 'translate3d(' + posi.x + 'px,' + posi.y + 'px,0) scale(' + itemData.sScale + ')'
            imgEl.offsetHeight
        }
        if (!itemData.loaded && imgEl.getAttribute('data-preview-lazyload')) {
            let self = this
            self.loader.classList.add($.className('active'))
            //移动位置动画
            imgEl.style.webkitTransitionDuration = '0.5s'
            imgEl.addEventListener('webkitTransitionEnd', self._imgTransitionEnd.bind(self))
            imgEl.style.webkitTransform = 'translate3d(0,0,0) scale(' + itemData.sScale + ')'
            this.loadImage(imgEl, function() {
                itemData.loaded = true
                imgEl.src = itemData.lazyload
                self._initZoom(itemEl, this.width, this.height)
                imgEl.classList.add($.className('transitioning'))
                imgEl.addEventListener('webkitTransitionEnd', self._imgTransitionEnd.bind(self))
                imgEl.setAttribute('style', '')
                imgEl.offsetHeight
                self.loader.classList.remove($.className('active'))
            })
        } else {
            itemData.lazyload && (imgEl.src = itemData.lazyload)
            this._initZoom(itemEl, imgEl.width, imgEl.height)
            imgEl.classList.add($.className('transitioning'))
            imgEl.addEventListener('webkitTransitionEnd', this._imgTransitionEnd.bind(this))
            imgEl.setAttribute('style', '')
            imgEl.offsetHeight
        }
        this._preloadItem(index + 1)
        this._preloadItem(index - 1)
    }
    proto._preloadItem = function(index) {
        let itemEl = this.scroller.querySelector($.classSelector('.slider-item:nth-child(' + (index + 1) + ')'))
        if (itemEl) {
            let itemData = this.currentGroup[index]
            if (!itemData.sWidth) {
                let imgEl = itemEl.querySelector('img')
                this._initImgData(itemData, imgEl)
            }
        }
    }
    proto._initZoom = function(zoomWrapperEl, zoomerWidth, zoomerHeight) {
        if (!this.options.zoom) {
            return
        }
        if (zoomWrapperEl.getAttribute('data-zoomer')) {
            return
        }
        let zoomEl = zoomWrapperEl.querySelector($.classSelector('.zoom'))
        if (zoomEl.tagName === 'IMG') {
            let self = this
            let maxZoom = self._getScale({
                width: zoomWrapperEl.offsetWidth,
                height: zoomWrapperEl.offsetHeight
            }, {
                width: zoomerWidth,
                height: zoomerHeight
            })
            $(zoomWrapperEl).zoom({
                maxZoom: Math.max(maxZoom, 1)
            })
        } else {
            $(zoomWrapperEl).zoom()
        }
    }
    proto.loadImage = function(imgEl, callback) {
        let onReady = function() {
            callback && callback.call(this)
        }
        let img = new Image()
        img.onload = onReady
        img.onerror = onReady
        img.src = imgEl.getAttribute('data-preview-lazyload')
    }
    proto.getRangeByIndex = function(index, length) {
        return {
            from: 0,
            to: length - 1
        }
        //		var from = Math.max(index - 1, 0);
        //		var to = Math.min(index + 1, length);
        //		if (index === length - 1) {
        //			from = Math.max(length - 3, 0);
        //			to = length - 1;
        //		}
        //		if (index === 0) {
        //			from = 0;
        //			to = Math.min(2, length - 1);
        //		}
        //		return {
        //			from: from,
        //			to: to
        //		};
    }

    proto._getPosition = function(itemData) {
        let sLeft = itemData.sLeft - window.pageXOffset
        let sTop = itemData.sTop - window.pageYOffset
        let left = (window.innerWidth - itemData.sWidth) / 2
        let top = (window.innerHeight - itemData.sHeight) / 2
        return {
            left: sLeft,
            top: sTop,
            x: sLeft - left,
            y: sTop - top
        }
    }
    proto.refresh = function(index, groupArray) {
        this.currentGroup = groupArray
        //重新生成slider
        let length = groupArray.length
        let itemHtml = []
        let currentRange = this.getRangeByIndex(index, length)
        let from = currentRange.from
        let to = currentRange.to + 1
        let currentIndex = index
        let className = ''
        let itemStr = ''
        let wWidth = window.innerWidth
        let wHeight = window.innerHeight
        for (let i = 0; from < to; from++, i++) {
            let itemData = groupArray[from]
            let style = ''
            if (itemData.sWidth) {
                style = '-webkit-transform:translate3d(0,0,0) scale(' + itemData.sScale + ');transform:translate3d(0,0,0) scale(' + itemData.sScale + ')'
            }
            itemStr = itemTemplate.replace('{{src}}', itemData.src).replace('{{lazyload}}', itemData.lazyload).replace('{{style}}', style)
            if (from === index) {
                currentIndex = i
                className = $.className('active')
            } else {
                className = ''
            }
            itemHtml.push(itemStr.replace('{{className}}', className))
        }
        this.scroller.innerHTML = itemHtml.join('')
        this.element.style.display = 'block'
        this.element.classList.add($.className('preview-in'))
        this.lastIndex = currentIndex
        this.element.offsetHeight
        $(this.element).slider().gotoItem(currentIndex, 0)
        this.indicator && (this.indicator.innerText = (currentIndex + 1) + '/' + this.currentGroup.length)
        this._loadItem(currentIndex, true)
    }
    proto.openByGroup = function(index, group) {
        index = Math.min(Math.max(0, index), this.groups[group].length - 1)
        this.refresh(index, this.groups[group])
    }
    proto.open = function(index, group) {
        if (this.isShown()) {
            return
        }
        if (typeof index === 'number') {
            group = group || defaultGroupName
            this.addImages(group, index) //刷新当前group
            this.openByGroup(index, group)
        } else {
            group = index.getAttribute('data-preview-group')
            group = group || defaultGroupName
            this.addImages(group, index) //刷新当前group
            this.openByGroup(this.groups[group].indexOf(index.__mui_img_data), group)
        }
    }
    proto.close = function(index, group) {
        if (!this.isShown()) {
            return
        }
        this.element.classList.remove($.className('preview-in'))
        this.element.classList.add($.className('preview-out'))
        let itemEl = this.scroller.querySelector($.classSelector('.slider-item:nth-child(' + (this.lastIndex + 1) + ')'))
        let imgEl = itemEl.querySelector('img')
        if (imgEl) {
            imgEl.classList.add($.className('transitioning'))
            let itemData = this.currentGroup[this.lastIndex]
            let posi = this._getPosition(itemData)
            let sLeft = posi.left
            let sTop = posi.top
            if (sTop > window.innerHeight || sLeft > window.innerWidth || sTop < 0 || sLeft < 0) { //out viewport
                imgEl.style.opacity = 0
                imgEl.style.webkitTransitionDuration = '0.5s'
                imgEl.style.webkitTransform = 'scale(' + itemData.sScale + ')'
            } else {
                if (this.options.zoom) {
                    $(imgEl.parentNode.parentNode).zoom().toggleZoom(0)
                }
                imgEl.style.webkitTransitionDuration = '0.5s'
                imgEl.style.webkitTransform = 'translate3d(' + posi.x + 'px,' + posi.y + 'px,0) scale(' + itemData.sScale + ')'
            }
        }
        let zoomers = this.element.querySelectorAll($.classSelector('.zoom-wrapper'))
        for (let i = 0, len = zoomers.length; i < len; i++) {
            $(zoomers[i]).zoom().destroy()
        }
        $(this.element).slider().destroy()
        //		this.empty();
    }
    proto.isShown = function() {
        return this.element.classList.contains($.className('preview-in'))
    }

    let previewImageApi = null
    $.previewImage = function(options) {
        if (!previewImageApi) {
            previewImageApi = new PreviewImage(options)
        }
        return previewImageApi
    }
    $.getPreviewImage = function() {
        return previewImageApi
    }

})(mui, window)
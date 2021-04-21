// 基于 jq 的 图片拖拽插件
// html结构

{/* <div id="solo">
<div class="Imgms">
    <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
</div>
<div class="Imgms">
    <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
</div>
<div class="Imgms">
    <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
</div>
<div class="Imgms">
    <img src="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png" data-viewer="http://upload.fx110.com/files/thumbnail/201702/529CFE3C42BC3F613FCCE51B8D0F4B94.png">
</div>
</div> */}


// JS

// $("#solo").dragsort({ dragSelector: "#solo > .Imgms", dragEnd: function () { }, dragBetween: false, placeHolderTemplate: "" })
// 参数说明
// dragSelector
// CSS选择器内的元素的列表项的拖动手柄。默认值是“li”

// dragSelectorExclude
// CSS选择器的元素内的dragSelector不会触发dragsort的。默认值是”input, textarea, a[href]”

// dragEnd
// 拖动结束后将被调用的回调函数

// dragBetween
// 设置为“true”，如果你要启用多组列表之间拖动选定的列表。 默认值是false

// placeHolderTemplate
// 拖动列表的HTML部分。默认值是”<li></li>”

// scrollContainer
// CSS选择器的元素，作为滚动容器，例如溢出的div设置为自动。 默认值是“窗口”

// scrollSpeed
// 一个数字，它代表了速度，页面拖动某一项时，将滚动容器外，较高使用价值的是速度和较低的值是较慢的。 如果设置为”0”以禁用滚动。默认值是”5”
// jQuery List DragSort v0.5.2
// License: http://dragsort.codeplex.com/license
//var one = 0;
(function (e) {
    e.fn.dragsort = function (t) {
        if (t == 'destroy') {
            e(this.selector).trigger('dragsort-uninit')
            return
        }
        let n = e.extend({},
            e.fn.dragsort.defaults, t)
        let r = []
        let i = null,
            s = null
        this.each(function (t, o) {
            if (e(o).is('table') && e(o).children().size() == 1 && e(o).children().is('tbody')) {o = e(o).children().get(0)}
            let u = {
                draggedItem: null,
                placeHolderItem: null,
                pos: null,
                offset: null,
                offsetLimit: null,
                scroll: null,
                container: o,
                init: function () {
                    // if (one != 0) { return false };
                    n.tagName = e(this.container).children().size() == 0 ? 'li' : e(this.container).children().get(0).tagName.toLowerCase()
                    if (n.itemSelector == '') {n.itemSelector = n.tagName}
                    if (n.dragSelector == '') {n.dragSelector = n.tagName}
                    if (n.placeHolderTemplate == '') {n.placeHolderTemplate = '<' + n.tagName + '>&nbsp;</' + n.tagName + '>'}
                    e(this.container).attr('data-listidx', t).mousedown(this.grabItem).bind('dragsort-uninit', this.uninit)
                    this.styleDragHandlers(true)
                //  one = 1;
                },
                uninit: function () {
                    let t = r[e(this).attr('data-listidx')]
                    e(t.container).unbind('mousedown', t.grabItem).unbind('dragsort-uninit')
                    t.styleDragHandlers(false)
                },
                getItems: function () {
                    return e(this.container).children(n.itemSelector)
                },
                styleDragHandlers: function (t) {
                    this.getItems().map(function () {
                        return e(this).is(n.dragSelector) ? this : e(this).find(n.dragSelector).get()
                    }).css('cursor', t ? 'pointer' : '')
                },
                grabItem: function (t) {
                    let i = r[e(this).attr('data-listidx')]
                    let s = e(t.target).closest('[data-listidx] > ' + n.tagName).get(0)
                    let o = i.getItems().filter(function () {
                        return this == s
                    }).size() > 0
                    if (t.which != 1 || e(t.target).is(n.dragSelectorExclude) || e(t.target).closest(n.dragSelectorExclude).size() > 0 || !o) {return}
                    t.preventDefault()
                    let u = t.target
                    while (!e(u).is(n.dragSelector)) {
                        if (u == this) {return}
                        u = u.parentNode
                    }
                    e(u).attr('data-cursor', e(u).css('cursor'))
                    e(u).css('cursor', 'move')
                    let a = this
                    var f = function () {
                        i.dragStart.call(a, t)
                        e(i.container).unbind('mousemove', f)
                    }
                    e(i.container).mousemove(f).mouseup(function () {
                        e(i.container).unbind('mousemove', f)
                        e(u).css('cursor', e(u).attr('data-cursor'))
                    })
                },
                dragStart: function (t) {
                    if (i != null && i.draggedItem != null) {i.dropItem()}
                    i = r[e(this).attr('data-listidx')]
                    i.draggedItem = e(t.target).closest('[data-listidx] > ' + n.tagName)
                    i.draggedItem.attr('data-origpos', e(this).attr('data-listidx') + '-' + e(i.container).children().index(i.draggedItem))
                    let s = parseInt(i.draggedItem.css('marginTop'))
                    let o = parseInt(i.draggedItem.css('marginLeft'))
                    i.offset = i.draggedItem.offset()
                    i.offset.top = t.pageY - i.offset.top + (isNaN(s) ? 0 : s)
                    i.offset.left = t.pageX - i.offset.left + (isNaN(o) ? 0 : o)
                    if (!n.dragBetween) {
                        let u = e(i.container).outerHeight() == 0 ? Math.max(1, Math.round(.5 + i.getItems().size() * i.draggedItem.outerWidth() / e(i.container).outerWidth())) * i.draggedItem.outerHeight() : e(i.container).outerHeight()
                        i.offsetLimit = e(i.container).offset()
                        i.offsetLimit.right = i.offsetLimit.left + e(i.container).outerWidth() - i.draggedItem.outerWidth()
                        i.offsetLimit.bottom = i.offsetLimit.top + u - i.draggedItem.outerHeight()
                    }
                    let a = i.draggedItem.height()
                    let f = i.draggedItem.width()
                    if (n.tagName == 'tr') {
                        i.draggedItem.children().each(function () {
                            e(this).width(e(this).width())
                        })
                        i.placeHolderItem = i.draggedItem.clone().attr('data-placeholder', true)
                        i.draggedItem.after(i.placeHolderItem)
                        i.placeHolderItem.children().each(function () {
                            e(this).css({
                                borderWidth: 0,
                                width: e(this).width() + 1,
                                height: e(this).height() + 1
                            }).html('&nbsp;')
                        })
                    } else {
                        i.draggedItem.after(n.placeHolderTemplate)
                        i.placeHolderItem = i.draggedItem.next().css({
                            height: a,
                            width: f
                        }).attr('data-placeholder', true)
                    }
                    if (n.tagName == 'td') {
                        let l = i.draggedItem.closest('table').get(0)
                        e('<table id=\'' + l.id + '\' style=\'border-width: 0px;\' class=\'dragSortItem ' + l.className + '\'><tr></tr></table>').appendTo('body').children().append(i.draggedItem)
                    }
                    let c = i.draggedItem.attr('style')
                    i.draggedItem.attr('data-origstyle', c ? c : '')
                    i.draggedItem.css({
                        position: 'absolute',
                        opacity: .8,
                        'z-index': 999,
                        height: a,
                        width: f
                    })
                    i.scroll = {
                        moveX: 0,
                        moveY: 0,
                        maxX: e(document).width() - e(window).width(),
                        maxY: e(document).height() - e(window).height()
                    }
                    i.scroll.scrollY = window.setInterval(function () {
                        if (n.scrollContainer != window) {
                            e(n.scrollContainer).scrollTop(e(n.scrollContainer).scrollTop() + i.scroll.moveY)
                            return
                        }
                        let t = e(n.scrollContainer).scrollTop()
                        if (i.scroll.moveY > 0 && t < i.scroll.maxY || i.scroll.moveY < 0 && t > 0) {
                            e(n.scrollContainer).scrollTop(t + i.scroll.moveY)
                            i.draggedItem.css('top', i.draggedItem.offset().top + i.scroll.moveY + 1)
                        }
                    },
                    10)
                    i.scroll.scrollX = window.setInterval(function () {
                        if (n.scrollContainer != window) {
                            e(n.scrollContainer).scrollLeft(e(n.scrollContainer).scrollLeft() + i.scroll.moveX)
                            return
                        }
                        let t = e(n.scrollContainer).scrollLeft()
                        if (i.scroll.moveX > 0 && t < i.scroll.maxX || i.scroll.moveX < 0 && t > 0) {
                            e(n.scrollContainer).scrollLeft(t + i.scroll.moveX)
                            i.draggedItem.css('left', i.draggedItem.offset().left + i.scroll.moveX + 1)
                        }
                    },
                    10)
                    e(r).each(function (e, t) {
                        t.createDropTargets()
                        t.buildPositionTable()
                    })
                    i.setPos(t.pageX, t.pageY)
                    e(document).bind('mousemove', i.swapItems)
                    e(document).bind('mouseup', i.dropItem)
                    if (n.scrollContainer != window) {e(window).bind('wheel', i.wheel)}
                },
                setPos: function (t, r) {
                    let s = r - this.offset.top
                    let o = t - this.offset.left
                    if (!n.dragBetween) {
                        s = Math.min(this.offsetLimit.bottom, Math.max(s, this.offsetLimit.top))
                        o = Math.min(this.offsetLimit.right, Math.max(o, this.offsetLimit.left))
                    }
                    let u = this.draggedItem.offsetParent().not('body').offset()
                    if (u != null) {
                        s -= u.top
                        o -= u.left
                    }
                    if (n.scrollContainer == window) {
                        r -= e(window).scrollTop()
                        t -= e(window).scrollLeft()
                        r = Math.max(0, r - e(window).height() + 5) + Math.min(0, r - 5)
                        t = Math.max(0, t - e(window).width() + 5) + Math.min(0, t - 5)
                    } else {
                        let a = e(n.scrollContainer)
                        let f = a.offset()
                        r = Math.max(0, r - a.height() - f.top) + Math.min(0, r - f.top)
                        t = Math.max(0, t - a.width() - f.left) + Math.min(0, t - f.left)
                    }
                    i.scroll.moveX = t == 0 ? 0 : t * n.scrollSpeed / Math.abs(t)
                    i.scroll.moveY = r == 0 ? 0 : r * n.scrollSpeed / Math.abs(r)
                    this.draggedItem.css({
                        top: s,
                        left: o
                    })
                },
                wheel: function (t) {
                    if (i && n.scrollContainer != window) {
                        let r = e(n.scrollContainer)
                        let s = r.offset()
                        t = t.originalEvent
                        if (t.clientX > s.left && t.clientX < s.left + r.width() && t.clientY > s.top && t.clientY < s.top + r.height()) {
                            let o = (t.deltaMode == 0 ? 1 : 10) * t.deltaY
                            r.scrollTop(r.scrollTop() + o)
                            t.preventDefault()
                        }
                    }
                },
                buildPositionTable: function () {
                    let t = []
                    this.getItems().not([i.draggedItem[0], i.placeHolderItem[0]]).each(function (n) {
                        let r = e(this).offset()
                        r.right = r.left + e(this).outerWidth()
                        r.bottom = r.top + e(this).outerHeight()
                        r.elm = this
                        t[n] = r
                    })
                    this.pos = t
                },
                dropItem: function () {
                    if (i.draggedItem == null) {return}
                    let t = i.draggedItem.attr('data-origstyle')
                    i.draggedItem.attr('style', t)
                    if (t == '') {i.draggedItem.removeAttr('style')}
                    i.draggedItem.removeAttr('data-origstyle')
                    i.styleDragHandlers(true)
                    i.placeHolderItem.before(i.draggedItem)
                    i.placeHolderItem.remove()
                    e('[data-droptarget], .dragSortItem').remove()
                    window.clearInterval(i.scroll.scrollY)
                    window.clearInterval(i.scroll.scrollX)
                    if (i.draggedItem.attr('data-origpos') != e(r).index(i) + '-' + e(i.container).children().index(i.draggedItem)) {if (n.dragEnd.apply(i.draggedItem) == false) {
                        let s = i.draggedItem.attr('data-origpos').split('-')
                        let o = e(r[s[0]].container).children().not(i.draggedItem).eq(s[1])
                        if (o.size() > 0) {o.before(i.draggedItem)}
                        else if (s[1] == 0) {e(r[s[0]].container).prepend(i.draggedItem)}
                        else {e(r[s[0]].container).append(i.draggedItem)}
                    }}
                    i.draggedItem.removeAttr('data-origpos')
                    i.draggedItem = null
                    e(document).unbind('mousemove', i.swapItems)
                    e(document).unbind('mouseup', i.dropItem)
                    if (n.scrollContainer != window) {e(window).unbind('wheel', i.wheel)}
                    return false
                },
                swapItems: function (t) {
                    if (i.draggedItem == null) {return false}
                    i.setPos(t.pageX, t.pageY)
                    let o = i.findPos(t.pageX, t.pageY)
                    let u = i
                    for (let a = 0; o == -1 && n.dragBetween && a < r.length; a++) {
                        o = r[a].findPos(t.pageX, t.pageY)
                        u = r[a]
                    }
                    if (o == -1) {return false}
                    let f = function () {
                        return e(u.container).children().not(u.draggedItem)
                    }
                    let l = f().not(n.itemSelector).each(function (e) {
                        this.idx = f().index(this)
                    })
                    if (s == null || s.top > i.draggedItem.offset().top || s.left > i.draggedItem.offset().left) {e(u.pos[o].elm).before(i.placeHolderItem)}
                    else {e(u.pos[o].elm).after(i.placeHolderItem)}
                    l.each(function () {
                        let t = f().eq(this.idx).get(0)
                        if (this != t && f().index(this) < this.idx) {e(this).insertAfter(t)}
                        else if (this != t) {e(this).insertBefore(t)}
                    })
                    e(r).each(function (e, t) {
                        t.createDropTargets()
                        t.buildPositionTable()
                    })
                    s = i.draggedItem.offset()
                    return false
                },
                findPos: function (e, t) {
                    for (let n = 0; n < this.pos.length; n++) {
                        if (this.pos[n].left < e && this.pos[n].right > e && this.pos[n].top < t && this.pos[n].bottom > t) {return n}
                    }
                    return -1
                },
                createDropTargets: function () {
                    if (!n.dragBetween) {return}
                    e(r).each(function () {
                        let t = e(this.container).find('[data-placeholder]')
                        let r = e(this.container).find('[data-droptarget]')
                        if (t.size() > 0 && r.size() > 0) {r.remove()}
                        else if (t.size() == 0 && r.size() == 0) {
                            if (n.tagName == 'td') {e(n.placeHolderTemplate).attr('data-droptarget', true).appendTo(this.container)}
                            else {e(this.container).append(i.placeHolderItem.removeAttr('data-placeholder').clone().attr('data-droptarget', true))}
                            i.placeHolderItem.attr('data-placeholder', true)
                        }
                    })
                }
            }
            u.init()
            r.push(u)
        })
        return this
    }
    e.fn.dragsort.defaults = {
        itemSelector: '',
        dragSelector: '',
        dragSelectorExclude: 'input, textarea',
        dragEnd: function () { },
        dragBetween: false,
        placeHolderTemplate: '',
        scrollContainer: window,
        scrollSpeed: 5
    }
})(jQuery)
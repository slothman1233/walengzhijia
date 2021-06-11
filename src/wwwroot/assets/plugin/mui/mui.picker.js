/**
 * 选择列表插件
 * varstion 2.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 **/

!function(e, t, i, a) {
	var n = 30,
		r = 90,
		s = 40,
		c = 10,
		l = e.rad2deg = function(e) {
			return e / (Math.PI / 180)
		},
		o = (e.deg2rad = function(e) {
			return e * (Math.PI / 180)
		}, navigator.platform.toLowerCase()),
		d = navigator.userAgent.toLowerCase(),
		u = (d.indexOf("iphone") > -1 || d.indexOf("ipad") > -1 || d.indexOf("ipod") > -1) && (o.indexOf("iphone") > -1 || o.indexOf("ipad") > -1 || o.indexOf("ipod") > -1),
		p = e.Picker = function(e, t) {
			var i = this;
			i.holder = e, i.options = t || {}, i.init(), i.initInertiaParams(), i.calcElementItemPostion(!0), i.bindEvent()
		};
	p.prototype.findElementItems = function() {
		var e = this;
		return e.elementItems = [].slice.call(e.holder.querySelectorAll("li")), e.elementItems
	}, p.prototype.init = function() {
		var e = this;
		e.list = e.holder.querySelector("ul"), e.findElementItems(), e.height = e.holder.offsetHeight, e.r = e.height / 2 - c, e.d = 2 * e.r, e.itemHeight = e.elementItems.length > 0 ? e.elementItems[0].offsetHeight : s, e.itemAngle = parseInt(e.calcAngle(.8 * e.itemHeight)), e.hightlightRange = e.itemAngle / 2, e.visibleRange = r, e.beginAngle = 0, e.beginExceed = e.beginAngle - n, e.list.angle = e.beginAngle, u && (e.list.style.webkitTransformOrigin = "center center " + (e.r * (1/37.5)) + "rem")
	}, p.prototype.calcElementItemPostion = function(e) {
		var t = this;
		e && (t.items = []), t.elementItems.forEach(function(i) {
			var a = t.elementItems.indexOf(i);
			if (t.endAngle = t.itemAngle * a, i.angle = t.endAngle, i.style.webkitTransformOrigin = "center center -" +(t.r * (1/37.5)) + "rem", i.style.webkitTransform = "translateZ(" + (t.r * (1/37.5)) + "rem) rotateX(" + -t.endAngle + "deg)", e) {
				var n = {};
				n.text = i.innerHTML || "", n.value = i.getAttribute("data-value") || n.text, t.items.push(n)
			}
		}), t.endExceed = t.endAngle + n, t.calcElementItemVisibility(t.beginAngle)
	}, p.prototype.calcAngle = function(e) {
		var t = this,
			i = b = parseFloat(t.r);
		e = Math.abs(e);
		var a = 180 * parseInt(e / t.d);
		e %= t.d;
		var n = (i * i + b * b - e * e) / (2 * i * b),
			r = a + l(Math.acos(n));
		return r
	}, p.prototype.calcElementItemVisibility = function(e) {
		var t = this;
		t.elementItems.forEach(function(i) {
			var a = Math.abs(i.angle - e);
			a < t.hightlightRange ? i.classList.add("highlight") : a < t.visibleRange ? (i.classList.add("visible"), i.classList.remove("highlight")) : (i.classList.remove("highlight"), i.classList.remove("visible"))
		})
	}, p.prototype.setAngle = function(e) {
		var t = this;
		t.list.angle = e, t.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + e + "deg)", t.calcElementItemVisibility(e)
	}, p.prototype.bindEvent = function() {
		var e = this,
			t = 0,
			i = null;
		e.holder.addEventListener("touchstart", function(a) {
			a.preventDefault(), e.list.style.webkitTransition = "", i = (a.changedTouches ? a.changedTouches[0] : a).pageY, t = e.list.angle, e.updateInertiaParams(a, !0)
		}, !1), e.holder.addEventListener("touchend", function(t) {
			t.preventDefault(), e.startInertiaScroll(t)
		}, !1), e.holder.addEventListener("touchcancel", function(t) {
			t.preventDefault(), e.startInertiaScroll(t)
		}, !1), e.holder.addEventListener("touchmove", function(a) {
			a.preventDefault();
			var n = (a.changedTouches ? a.changedTouches[0] : a).pageY,
				r = n - i,
				s = e.calcAngle(r),
				c = r > 0 ? t - s : t + s;
			c > e.endExceed && (c = e.endExceed), c < e.beginExceed && (c = e.beginExceed), e.setAngle(c), e.updateInertiaParams(a)
		}, !1), e.list.addEventListener("tap", function(t) {
			elementItem = t.target, "LI" == elementItem.tagName && e.setSelectedIndex(e.elementItems.indexOf(elementItem), 200)
		}, !1)
	}, p.prototype.initInertiaParams = function() {
		var e = this;
		e.lastMoveTime = 0, e.lastMoveStart = 0, e.stopInertiaMove = !1
	}, p.prototype.updateInertiaParams = function(e, t) {
		var i = this,
			a = e.changedTouches ? e.changedTouches[0] : e;
		if (t) i.lastMoveStart = a.pageY, i.lastMoveTime = e.timeStamp || Date.now(), i.startAngle = i.list.angle;
		else {
			var n = e.timeStamp || Date.now();
			n - i.lastMoveTime > 300 && (i.lastMoveTime = n, i.lastMoveStart = a.pageY)
		}
		i.stopInertiaMove = !0
	}, p.prototype.startInertiaScroll = function(e) {
		var t = this,
			i = e.changedTouches ? e.changedTouches[0] : e,
			a = e.timeStamp || Date.now(),
			n = (i.pageY - t.lastMoveStart) / (a - t.lastMoveTime),
			r = n > 0 ? -1 : 1,
			s = 6e-4 * r * -1,
			c = Math.abs(n / s),
			l = n * c / 2,
			o = t.list.angle,
			d = t.calcAngle(l) * r,
			u = d;
		return o + d < t.beginExceed && (d = t.beginExceed - o, c = c * (d / u) * .6), o + d > t.endExceed && (d = t.endExceed - o, c = c * (d / u) * .6), 0 == d ? void t.endScroll() : void t.scrollDistAngle(a, o, d, c)
	}, p.prototype.scrollDistAngle = function(e, t, i, a) {
		var n = this;
		n.stopInertiaMove = !1, function(e, t, i, a) {
			var r = 13,
				s = a / r,
				c = 0;
			!
			function l() {
				if (!n.stopInertiaMove) {
					var e = n.quartEaseOut(c, t, i, s);
					return n.setAngle(e), c++, c > s - 1 || e < n.beginExceed || e > n.endExceed ? void n.endScroll() : void setTimeout(l, r)
				}
			}()
		}(e, t, i, a)
	}, p.prototype.quartEaseOut = function(e, t, i, a) {
		return -i * ((e = e / a - 1) * e * e * e - 1) + t
	}, p.prototype.endScroll = function() {
		var e = this;
		if (e.list.angle < e.beginAngle) e.list.style.webkitTransition = "150ms ease-out", e.setAngle(e.beginAngle);
		else if (e.list.angle > e.endAngle) e.list.style.webkitTransition = "150ms ease-out", e.setAngle(e.endAngle);
		else {
			var t = parseInt((e.list.angle / e.itemAngle).toFixed(0));
			e.list.style.webkitTransition = "100ms ease-out", e.setAngle(e.itemAngle * t)
		}
		e.triggerChange()
	}, p.prototype.triggerChange = function(t) {
		var i = this;
		setTimeout(function() {
			var a = i.getSelectedIndex(),
				n = i.items[a];
			e.trigger && (a != i.lastIndex || t) && e.trigger(i.holder, "change", {
				index: a,
				item: n
			}), i.lastIndex = a
		}, 0)
	}, p.prototype.correctAngle = function(e) {
		var t = this;
		return e < t.beginAngle ? t.beginAngle : e > t.endAngle ? t.endAngle : e
	}, p.prototype.setItems = function(e) {
		var t = this;
		t.items = e || [];
		var i = [];
		t.items.forEach(function(e) {
			null !== e && e !== a && i.push("<li>" + (e.text || e) + "</li>")
		}), t.list.innerHTML = i.join(""), t.findElementItems(), t.calcElementItemPostion(), t.setAngle(t.correctAngle(t.list.angle)), t.triggerChange(!0)
	}, p.prototype.getItems = function() {
		var e = this;
		return e.items
	}, p.prototype.getSelectedIndex = function() {
		var e = this;
		return parseInt((e.list.angle / e.itemAngle).toFixed(0))
	}, p.prototype.setSelectedIndex = function(e, t) {
		var i = this;
		i.list.style.webkitTransition = "";
		var a = i.correctAngle(i.itemAngle * e);
		if (t && t > 0) {
			var n = a - i.list.angle;
			i.scrollDistAngle(Date.now(), i.list.angle, n, t)
		} else i.setAngle(a);
		i.triggerChange()
	}, p.prototype.getSelectedItem = function() {
		var e = this;
		return e.items[e.getSelectedIndex()]
	}, p.prototype.getSelectedValue = function() {
		var e = this;
		return (e.items[e.getSelectedIndex()] || {}).value
	}, p.prototype.getSelectedText = function() {
		var e = this;
		return (e.items[e.getSelectedIndex()] || {}).text
	}, p.prototype.setSelectedValue = function(e, t) {
		var i = this;
		for (var a in i.items) {
			var n = i.items[a];
			if (n.value == e) return void i.setSelectedIndex(a, t)
		}
	}, e.fn && (e.fn.picker = function(e) {
		return this.each(function(t, i) {
			if (!i.picker) if (e) i.picker = new p(i, e);
			else {
				var a = i.getAttribute("data-picker-options"),
					n = a ? JSON.parse(a) : {};
				i.picker = new p(i, n)
			}
		}), this[0] ? this[0].picker : null
	}, e.ready(function() {
		e(".mui-picker").picker()
	}))
}(window.mui || window, window, document, void 0), function(e, t) {
	e.dom = function(i) {
		return "string" != typeof i ? i instanceof Array || i[0] && i.length ? [].slice.call(i) : [i] : (e.__create_dom_div__ || (e.__create_dom_div__ = t.createElement("div")), e.__create_dom_div__.innerHTML = i, [].slice.call(e.__create_dom_div__.childNodes))
	};
	var i = '<div class="mui-poppicker">		<div class="mui-poppicker-header">			<button class="mui-btn mui-poppicker-btn-cancel">取消</button>			<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>		<span style=""></span>	<div class="mui-poppicker-clear"></div>		</div>		<div class="mui-poppicker-body">		</div>	</div>',
		a = '<div class="mui-picker">		<div class="mui-picker-inner">			<div class="mui-pciker-rule mui-pciker-rule-ft"></div>			<ul class="mui-pciker-list">			</ul>			<div class="mui-pciker-rule mui-pciker-rule-bg"></div>		</div>	</div>';
	e.PopPicker = e.Class.extend({
		init: function(a) {
			var n = this;
			n.options = a || {}, n.options.buttons = n.options.buttons || ["取消", "确定"], n.panel = e.dom(i)[0], t.body.appendChild(n.panel), n.ok = n.panel.querySelector(".mui-poppicker-btn-ok"), n.cancel = n.panel.querySelector(".mui-poppicker-btn-cancel"), n.body = n.panel.querySelector(".mui-poppicker-body"), n.mask = e.createMask(), n.cancel.innerText = n.options.buttons[0], n.ok.innerText = n.options.buttons[1], n.cancel.addEventListener("tap", function(e) {
				n.hide()
			}, !1), n.ok.addEventListener("tap", function(e) {
				if (n.callback) {
					var t = n.callback(n.getSelectedItems());
					t !== !1 && n.hide()
				}
			}, !1), n.mask[0].addEventListener("tap", function() {
				n.hide()
			}, !1), n._createPicker(), n.panel.addEventListener("touchstart", function(e) {
				e.preventDefault()
			}, !1), n.panel.addEventListener("touchmove", function(e) {
				e.preventDefault()
			}, !1)
		},
		_createPicker: function() {
			var t = this,
				i = t.options.layer || 1,
				n = 100 / i + "%";
			t.pickers = [];
			for (var r = 1; i >= r; r++) {
				var s = e.dom(a)[0];
				s.style.width = n, t.body.appendChild(s);
				var c = e(s).picker();
				t.pickers.push(c), s.addEventListener("change", function(e) {
					var s = this.nextSibling;
					if (s && s.picker) {
						var i = e.detail || {},
							a = i.item || {};
						s.picker.setItems(a.children)
					}
					if(t.selectionChanged){
					    //当选择改变时调用此方法
						t.selectionChanged(this);
					}
				}, !1)
			}
		},
		setData: function(e) {
			var t = this;
			e = e || [], t.pickers[0].setItems(e)
		},
		getSelectedItems: function() {
			var e = this,
				t = [];
			for (var i in e.pickers) {
				var a = e.pickers[i];
				t.push(a.getSelectedItem() || {})
			}
			return t
		},
		show: function(i) {
			var a = this;
			a.callback = i, a.mask.show(), t.body.classList.add(e.className("poppicker-active-for-page")), a.panel.classList.add(e.className("active")), a.__back = e.back, e.back = function() {
				a.hide()
			}
		},
		hide: function() {
			var i = this;
			i.disposed || (i.panel.classList.remove(e.className("active")), i.mask.close(), t.body.classList.remove(e.className("poppicker-active-for-page")), e.back = i.__back)
		},
		dispose: function() {
			var e = this;
			e.hide(), setTimeout(function() {
				e.panel.parentNode.removeChild(e.panel);
				for (var t in e) e[t] = null, delete e[t];
				e.disposed = !0
			}, 300)
		}
	})
}(mui, document), function(e, t) {
	e.dom = function(i) {
		return "string" != typeof i ? i instanceof Array || i[0] && i.length ? [].slice.call(i) : [i] : (e.__create_dom_div__ || (e.__create_dom_div__ = t.createElement("div")), e.__create_dom_div__.innerHTML = i, [].slice.call(e.__create_dom_div__.childNodes))
	};
	var i = '<div class="mui-dtpicker" data-type="datetime">		<div class="mui-dtpicker-header">			<button data-id="btn-cancel" class="mui-btn">取消</button>			<button data-id="btn-ok" class="mui-btn mui-btn-blue">确定</button>	<span style=""></span>	</div>		<div class="mui-dtpicker-title"><h5 data-id="title-y">年</h5><h5 data-id="title-m">月</h5><h5 data-id="title-d">日</h5><h5 data-id="title-h">时</h5><h5 data-id="title-i">分</h5></div>		<div class="mui-dtpicker-body">			<div data-id="picker-y" class="mui-picker">				<div class="mui-picker-inner">					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>					<ul class="mui-pciker-list">					</ul>					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>				</div>			</div>			<div data-id="picker-m" class="mui-picker">				<div class="mui-picker-inner">					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>					<ul class="mui-pciker-list">					</ul>					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>				</div>			</div>			<div data-id="picker-d" class="mui-picker">				<div class="mui-picker-inner">					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>					<ul class="mui-pciker-list">					</ul>					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>				</div>			</div>			<div data-id="picker-h" class="mui-picker">				<div class="mui-picker-inner">					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>					<ul class="mui-pciker-list">					</ul>					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>				</div>			</div>			<div data-id="picker-i" class="mui-picker">				<div class="mui-picker-inner">					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>					<ul class="mui-pciker-list">					</ul>					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>				</div>			</div>		</div>	</div>';
	e.DtPicker = e.Class.extend({
		init: function(a) {
			var n = this,
				r = e.dom(i)[0];
			t.body.appendChild(r), e('[data-id*="picker"]', r).picker();
			var s = n.ui = {
				picker: r,
				mask: e.createMask(),
				ok: e('[data-id="btn-ok"]', r)[0],
				cancel: e('[data-id="btn-cancel"]', r)[0],
				y: e('[data-id="picker-y"]', r)[0],
				m: e('[data-id="picker-m"]', r)[0],
				d: e('[data-id="picker-d"]', r)[0],
				h: e('[data-id="picker-h"]', r)[0],
				i: e('[data-id="picker-i"]', r)[0],
				labels: e('[data-id*="title-"]', r)
			};
			s.cancel.addEventListener("tap", function() {
				n.hide()
			}, !1), s.ok.addEventListener("tap", function() {
				var e = n.callback(n.getSelected());
				e !== !1 && n.hide()
			}, !1), s.y.addEventListener("change", function() {
				n._createDay()
			}, !1), s.m.addEventListener("change", function() {
				n._createDay()
			}, !1), s.mask[0].addEventListener("tap", function() {
				n.hide()
			}, !1), n._create(a), n.ui.picker.addEventListener("touchstart", function(e) {
				e.preventDefault()
			}, !1), n.ui.picker.addEventListener("touchmove", function(e) {
				e.preventDefault()
			}, !1)
		},
		getSelected: function() {
			var e = this,
				t = e.ui,
				i = e.options.type,
				a = {
					type: i,
					y: t.y.picker.getSelectedItem(),
					m: t.m.picker.getSelectedItem(),
					d: t.d.picker.getSelectedItem(),
					h: t.h.picker.getSelectedItem(),
					i: t.i.picker.getSelectedItem(),
					toString: function() {
						return this.value
					}
				};
			switch (i) {
			case "datetime":
				a.value = a.y.value + "-" + a.m.value + "-" + a.d.value + " " + a.h.value + ":" + a.i.value, a.text = a.y.text + "-" + a.m.text + "-" + a.d.text + " " + a.h.text + ":" + a.i.text;
				break;
			case "date":
				a.value = a.y.value + "-" + a.m.value + "-" + a.d.value, a.text = a.y.text + "-" + a.m.text + "-" + a.d.text;
				break;
			case "time":
				a.value = a.h.value + ":" + a.i.value, a.text = a.h.text + ":" + a.i.text;
				break;
			case "month":
				a.value = a.y.value + "-" + a.m.value, a.text = a.y.text + "-" + a.m.text;
				break;
			case "hour":
				a.value = a.y.value + "-" + a.m.value + "-" + a.d.value + " " + a.h.value, a.text = a.y.text + "-" + a.m.text + "-" + a.d.text + " " + a.h.text
			}
			return a
		},
		setSelectedValue: function(e) {
			var t = this,
				i = t.ui,
				a = t._parseValue(e);
			i.y.picker.setSelectedValue(a.y, 0), i.m.picker.setSelectedValue(a.m, 0), i.d.picker.setSelectedValue(a.d, 0), i.h.picker.setSelectedValue(a.h, 0), i.i.picker.setSelectedValue(a.i, 0)
		},
		isLeapYear: function(e) {
			return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
		},
		_inArray: function(e, t) {
			for (var i in e) {
				var a = e[i];
				if (a === t) return !0
			}
			return !1
		},
		getDayNum: function(e, t) {
			var i = this;
			return i._inArray([1, 3, 5, 7, 8, 10, 12], t) ? 31 : i._inArray([4, 6, 9, 11], t) ? 30 : i.isLeapYear(e) ? 29 : 28
		},
		_fill: function(e) {
			return e = e.toString(), e.length < 2 && (e = 0 + e), e
		},
		_createYear: function(e) {
			var t = this,
				i = t.options,
				a = t.ui,
				n = [];
			if (i.customData.y) n = i.customData.y;
			else for (var r = i.beginYear, s = i.endYear, c = r; s >= c; c++) n.push({
				text: c + "",
				value: c
			});
			a.y.picker.setItems(n)
		},
		_createMonth: function(e) {
			var t = this,
				i = t.options,
				a = t.ui,
				n = [];
			if (i.customData.m) n = i.customData.m;
			else for (var r = 1; 12 >= r; r++) {
				var s = t._fill(r);
				n.push({
					text: s,
					value: s
				})
			}
			a.m.picker.setItems(n)
		},
		_createDay: function(e) {
			var t = this,
				i = t.options,
				a = t.ui,
				n = [];
			if (i.customData.d) n = i.customData.d;
			else for (var r = t.getDayNum(parseInt(a.y.picker.getSelectedValue()), parseInt(a.m.picker.getSelectedValue())), s = 1; r >= s; s++) {
				var c = t._fill(s);
				n.push({
					text: c,
					value: c
				})
			}
			a.d.picker.setItems(n), e = e || a.d.picker.getSelectedValue()
		},
		_createHours: function(e) {
			var t = this,
				i = t.options,
				a = t.ui,
				n = [];
			if (i.customData.h) n = i.customData.h;
			else for (var r = 0; 23 >= r; r++) {
				var s = t._fill(r);
				n.push({
					text: s,
					value: s
				})
			}
			a.h.picker.setItems(n)
		},
		_createMinutes: function(e) {
			var t = this,
				i = t.options,
				a = t.ui,
				n = [];
			if (i.customData.i) n = i.customData.i;
			else for (var r = 0; 59 >= r; r++) {
				var s = t._fill(r);
				n.push({
					text: s,
					value: s
				})
			}
			a.i.picker.setItems(n)
		},
		_setLabels: function() {
			var e = this,
				t = e.options,
				i = e.ui;
			i.labels.each(function(e, i) {
				i.innerText = t.labels[e]
			})
		},
		_setButtons: function() {
			var e = this,
				t = e.options,
				i = e.ui;
			i.cancel.innerText = t.buttons[0], i.ok.innerText = t.buttons[1]
		},
		_parseValue: function(e) {
			var t = {};
			if (e) {
				var i = e.replace(":", "-").replace(" ", "-").split("-");
				t.y = i[0], t.m = i[1], t.d = i[2], t.h = i[3], t.i = i[4]
			} else {
				var a = new Date;
				t.y = a.getFullYear(), t.m = a.getMonth() + 1, t.d = a.getDate(), t.h = a.getHours(), t.i = a.getMinutes()
			}
			return t
		},
		_create: function(e) {
			var t = this;
			e = e || {}, e.labels = e.labels || ["年", "月", "日", "时", "分"], e.buttons = e.buttons || ["取消", "确定"], e.type = e.type || "datetime", e.customData = e.customData || {}, t.options = e;
			var i = new Date;
			e.beginYear = e.beginYear || i.getFullYear() - 5, e.endYear = e.endYear || i.getFullYear() + 5;
			var a = t.ui;
			t._setLabels(), t._setButtons(), a.picker.setAttribute("data-type", e.type), t._createYear(), t._createMonth(), t._createDay(), t._createHours(), t._createMinutes(), t.setSelectedValue(e.value)
		},
		show: function(i) {
			var a = this,
				n = a.ui;
			a.callback = i || e.noop, n.mask.show(), t.body.classList.add(e.className("dtpicker-active-for-page")), n.picker.classList.add(e.className("active")), a.__back = e.back, e.back = function() {
				a.hide()
			}
		},
		hide: function() {
			var i = this;
			if (!i.disposed) {
				var a = i.ui;
				a.picker.classList.remove(e.className("active")), a.mask.close(), t.body.classList.remove(e.className("dtpicker-active-for-page")), e.back = i.__back
			}
		},
		dispose: function() {
			var e = this;
			e.hide(), setTimeout(function() {
				e.ui.picker.parentNode.removeChild(e.ui.picker);
				for (var t in e) e[t] = null, delete e[t];
				e.disposed = !0
			}, 300)
		}
	})
}(mui, document);
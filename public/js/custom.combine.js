/*! Striking Responsive
 * https://kaptinlin.com/themes/strikingr
 * Copyright (c) 2014 Lyon Holdings Ltd; Licensed  */
window.matchMedia || (window.matchMedia = function() {
	"use strict";
	var a = window.styleMedia || window.media;
	if (!a) {
		var b = document.createElement("style"),
			c = document.getElementsByTagName("script")[0],
			d = null;
		b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, a = {
			matchMedium: function(a) {
				var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
				return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width
			}
		}
	}
	return function(b) {
		return {
			matches: a.matchMedium(b || "all"),
			media: b || "all"
		}
	}
}()),
function() {
	if (window.matchMedia && window.matchMedia("all").addListener) return !1;
	var a = window.matchMedia,
		b = a("only all").matches,
		c = !1,
		d = 0,
		e = [],
		f = function() {
			clearTimeout(d), d = setTimeout(function() {
				for (var b = 0, c = e.length; c > b; b++) {
					var d = e[b].mql,
						f = e[b].listeners || [],
						g = a(d.media).matches;
					if (g !== d.matches) {
						d.matches = g;
						for (var h = 0, i = f.length; i > h; h++) f[h].call(window, d)
					}
				}
			}, 30)
		};
	window.matchMedia = function(d) {
		var g = a(d),
			h = [],
			i = 0;
		return g.addListener = function(a) {
			b && (c || (c = !0, window.addEventListener("resize", f, !0)), 0 === i && (i = e.push({
				mql: g,
				listeners: h
			})), h.push(a))
		}, g.removeListener = function(a) {
			for (var b = 0, c = h.length; c > b; b++) h[b] === a && h.splice(b, 1)
		}, g
	}
}(),
function(a, b) {
	"use strict";
	var c = "nav",
		d = b.nav = function(a, e) {
			function f() {
				d.windowDimensions = j.getWindowDimensions(), g(), b(window).bind("resize", j.resize)
			}
			function g() {
				i = !0;
				var a = j.$nav.find("> li");
				h(a, j.settings.root), h(a.find("li"), j.settings.child)
			}
			function h(a, c) {
				j.hover(a, c.hoverIntent, c.delay, function() {
					var a = this,
						e = b(this).find("> ul");
					if (c.beforeHoverIn.call(a), e.size() > 0) {
						var f = b(a).data("check");
						void 0 === f && c.beforeFirstRender.call(a), (void 0 === f || f !== d.windowDimensions) && (c.position.call(a, e, j), b(a).data("check", d.windowDimensions)), "fade" === c.effect ? e.hide().css("visibility", "visible").fadeIn(c.inDuration, function() {
							c.afterHoverIn.call(a)
						}) : e.hide().css("visibility", "visible").slideDown(c.inDuration, function() {
							c.afterHoverIn.call(a)
						})
					} else c.afterHoverIn.call(a)
				}, function() {
					var a = this,
						d = b(this).find("> ul");
					c.beforeHoverOut.call(a), d.size() > 0 ? "fade" === c.effect ? d.fadeOut(c.outDuration, function() {
						d.css("visibility", "hidden"), c.afterHoverOut.call(a)
					}) : d.slideUp(c.outDuration, function() {
						d.css("visibility", "hidden"), c.afterHoverOut.call(a)
					}) : c.afterHoverOut.call(a)
				})
			}
			this.nav = a, this.$nav = b(a), this.settings = b.extend(!0, {}, d.defaults, e);
			var i = !1,
				j = this;
			null == this.settings.rtl && (this.settings.rtl = function(a) {
				if ("rtl" === ("" + a.attr("dir")).toLowerCase()) return !0;
				var c = !1;
				return a.parents("[dir]").each(function() {
					return /rtl/i.test(b(this).attr("dir")) ? (c = !0, !1) : void 0
				}), c
			}(this.$nav)), this.settings.rtl ? (this.dirAttribute = "right", this.$nav.addClass(c + "_rtl")) : this.dirAttribute = "left", b.extend(j, {
				getNav: function() {
					return this.$nav
				},
				getCurrent: function() {
					var a = this.$nav.find(this.settings.currentSelector);
					return 0 === a.size() && (a = this.$nav.find("li:first")), a.find("> a")
				},
				getWindowDimensions: function() {
					return {
						w: b(window).width(),
						h: b(window).height()
					}
				},
				resize: function() {
					d.windowDimensions = j.getWindowDimensions()
				},
				isBuilted: function() {
					return i
				},
				hover: function(a, c, d, e, f) {
					void 0 !== b.fn.hoverIntent ? b(a).hoverIntent({
						sensitivity: 30,
						interval: c,
						timeout: d,
						over: e,
						out: f
					}) : b(a).hover(e, f)
				}
			}), f()
		};
	d.defaults = {
		root: {
			effect: "slide",
			delay: 100,
			hoverIntent: 100,
			inDuration: 200,
			outDuration: 200,
			beforeHoverIn: function() {},
			afterHoverIn: function() {
				b(this).addClass("is-open")
			},
			beforeHoverOut: function() {},
			afterHoverOut: function() {
				b(this).removeClass("is-open")
			},
			beforeFirstRender: function() {},
			position: function(a, c) {
				var e = this,
					f = b(this),
					g = {
						left: f.offset().left,
						top: f.offset().top
					}, h = {
						w: a.outerWidth(),
						h: a.outerHeight()
					};
				a.css(c.settings.rtl ? g.left > h.w ? {
					right: 0
				} : g.left + e.offsetWidth < h.w ? {
					right: -h.w + e.offsetWidth
				} : {
					right: "auto",
					left: 0
				} : g.left + h.w < d.windowDimensions.w ? {
					left: 0
				} : g.left + e.offsetWidth < h.w ? g.left < d.windowDimensions.w / 2 ? {
					left: -g.left + c.$nav.offset().left
				} : {
					left: d.windowDimensions.w - g.left - h.w - c.$nav.offset().left
				} : {
					left: "auto",
					right: 0
				})
			}
		},
		child: {
			effect: "fade",
			delay: 150,
			hoverIntent: 0,
			inDuration: 200,
			outDuration: 200,
			beforeHoverIn: function() {},
			afterHoverIn: function() {
				b(this).addClass("is-open")
			},
			beforeHoverOut: function() {},
			afterHoverOut: function() {
				b(this).removeClass("is-open")
			},
			beforeFirstRender: function() {},
			position: function(a, c) {
				var e = this,
					f = b(e),
					g = {
						left: f.offset().left,
						top: f.offset().top
					}, h = {
						w: a.outerWidth(),
						h: a.outerHeight()
					};
				a.css(c.settings.rtl ? e.offsetWidth < g.left ? {
					right: e.offsetWidth
				} : {
					right: 0 - e.offsetWidth
				} : g.left + e.offsetWidth + h.w < d.windowDimensions.w ? {
					left: e.offsetWidth
				} : {
					left: 0 - e.offsetWidth
				})
			}
		}
	}, b.fn.nav = function(a) {
		return this.each(function() {
			b.data(this, c) || b.data(this, c, new d(this, a))
		})
	}
}(document, jQuery),
function(a, b, c, d) {
	"use strict";
	var e = function(b, d) {
		this.element = b, this.$element = c(b), this._isBuilded = !1, this.options = c.extend(e.defaults, d);
		var f = this;
		c.extend(f, {
			init: function() {
				var b = f.getItems();
				f.build(b), f.$select.on("change", f.options.onChange), f.$element.trigger("navToSelect::ready"), c(a).on("orientationchange", function() {
					f.$select.is(":hidden") && f.$select.is(":focus") && f.$select.blur()
				})
			},
			build: function(a) {
				f.$select = c("<select />", {
					"class": f.options.namespace
				}).html(f.buildOptions(a, 1)), null === f.options.prependTo ? f.$element.after(f.$select) : f.$select.prependTo(f.options.prependTo), f._isBuilded = !0
			},
			buildOption: function(a, b) {
				var c = new Array(b).join(f.options.indentString);
				return 1 !== b && f.options.indentSpace && (c += "&nbsp;"), '<option value="' + a.value + '"' + (a.linkable === !1 ? ' data-linkable="false"' : "") + (a.actived === !0 ? ' selected="selected"' : "") + ">" + c + a.label + "</option>"
			},
			buildOptions: function(a, b) {
				if (b > f.options.maxLevel) return "";
				var d = "";
				return c.each(a, function(a, c) {
					c.linkable === !1 && "undefined" != typeof c.items && 1 === b && f.options.useOptgroup && (d += '<optgroup label="' + c.label + '">', d += f.buildOptions(c.items, b + 1), d += "</optgroup>"), "undefined" != typeof c.items ? (d += f.buildOption(c, b), d += f.buildOptions(c.items, b + 1)) : d += f.buildOption(c, b)
				}), d
			},
			getItems: function() {
				var a = [];
				return f.options.placeholder && (a = a.concat({
					value: "#",
					label: f.options.placeholder,
					linkable: !1
				})), a = a.concat(f.options.getItemsFromList.call(f, f.$element, 1))
			},
			getItemValue: function(a) {
				return a.find(f.options.linkSelector).attr("href")
			},
			isLinkable: function(a) {
				return "#" !== f.getItemValue(a)
			},
			isActived: function(a) {
				return a.is("." + f.options.activeClass)
			},
			isBuilded: function() {
				return f._isBuilded
			}
		}), this.init()
	};
	e.defaults = {
		maxLevel: 4,
		prependTo: null,
		activeClass: "active",
		linkSelector: "a:first",
		indentString: "&ndash;",
		indentSpace: !0,
		placeholder: "Navigate to...",
		useOptgroup: !1,
		namespace: "navToSelect",
		itemFilter: function() {
			return !0
		},
		getItemLabel: function(a) {
			return a.find(this.options.linkSelector).text()
		},
		getItemsFromList: function(a, b) {
			var d = this,
				e = [];
			return a.children("li").each(function() {
				var a = c(this);
				if (d.options.itemFilter(a)) {
					var f = {
						value: d.getItemValue(a),
						label: d.options.getItemLabel.call(d, a),
						linkable: d.isLinkable(a),
						actived: d.isActived(a)
					};
					a.children("ul, ol").length && (f.items = [], a.children("ul, ol").each(function() {
						f.items = f.items.concat(d.options.getItemsFromList.call(d, c(this), b + 1))
					})), e.push(f)
				}
			}), e
		},
		onChange: function() {
			c(this).data("linkable") !== !1 && (b.location.href = this.value)
		}
	}, e.prototype = {
		constructor: e,
		getSelect: function() {
			return this.$select
		},
		destroy: function() {
			this.$select.remove(), this.$element.data("NavToSelect", null)
		}
	}, c.fn.navToSelect = function(a) {
		if ("string" == typeof a) {
			var b = a,
				f = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : d;
			return this.each(function() {
				var a = c.data(this, "navToSelect");
				a && "function" == typeof a[b] && a[b].apply(a, f)
			})
		}
		return this.each(function() {
			var b = c.data(this, "navToSelect");
			b || (b = new e(this, a), c.data(this, "navToSelect", b))
		})
	}
}(window, document, jQuery),
function(a, b, c) {
	var d = window.matchMedia;
	"undefined" != typeof module && module.exports ? module.exports = c(d) : "function" == typeof define && define.amd ? define(function() {
		return b[a] = c(d)
	}) : b[a] = c(d)
}("enquire", this, function(a) {
	"use strict";

	function b(a, b) {
		var c, d = 0,
			e = a.length;
		for (d; e > d && (c = b(a[d], d), c !== !1); d++);
	}
	function c(a) {
		return "[object Array]" === Object.prototype.toString.apply(a)
	}
	function d(a) {
		return "function" == typeof a
	}
	function e(a) {
		this.options = a, !a.deferSetup && this.setup()
	}
	function f(b, c) {
		this.query = b, this.isUnconditional = c, this.handlers = [], this.mql = a(b);
		var d = this;
		this.listener = function(a) {
			d.mql = a, d.assess()
		}, this.mql.addListener(this.listener)
	}
	function g() {
		if (!a) throw new Error("matchMedia not present, legacy browsers require a polyfill");
		this.queries = {}, this.browserIsIncapable = !a("only all").matches
	}
	return e.prototype = {
		setup: function() {
			this.options.setup && this.options.setup(), this.initialised = !0
		},
		on: function() {
			!this.initialised && this.setup(), this.options.match && this.options.match()
		},
		off: function() {
			this.options.unmatch && this.options.unmatch()
		},
		destroy: function() {
			this.options.destroy ? this.options.destroy() : this.off()
		},
		equals: function(a) {
			return this.options === a || this.options.match === a
		}
	}, f.prototype = {
		addHandler: function(a) {
			var b = new e(a);
			this.handlers.push(b), this.matches() && b.on()
		},
		removeHandler: function(a) {
			var c = this.handlers;
			b(c, function(b, d) {
				return b.equals(a) ? (b.destroy(), !c.splice(d, 1)) : void 0
			})
		},
		matches: function() {
			return this.mql.matches || this.isUnconditional
		},
		clear: function() {
			b(this.handlers, function(a) {
				a.destroy()
			}), this.mql.removeListener(this.listener), this.handlers.length = 0
		},
		assess: function() {
			var a = this.matches() ? "on" : "off";
			b(this.handlers, function(b) {
				b[a]()
			})
		}
	}, g.prototype = {
		register: function(a, e, g) {
			var h = this.queries,
				i = g && this.browserIsIncapable;
			return h[a] || (h[a] = new f(a, i)), d(e) && (e = {
				match: e
			}), c(e) || (e = [e]), b(e, function(b) {
				h[a].addHandler(b)
			}), this
		},
		unregister: function(a, b) {
			var c = this.queries[a];
			return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this
		}
	}, new g
}),
function() {
	"use strict";

	function a() {}
	function b(a, b) {
		for (var c = a.length; c--;) if (a[c].listener === b) return c;
		return -1
	}
	var c = a.prototype;
	c.getListeners = function(a) {
		var b, c, d = this._getEvents();
		if ("object" == typeof a) {
			b = {};
			for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
		} else b = d[a] || (d[a] = []);
		return b
	}, c.flattenListeners = function(a) {
		var b, c = [];
		for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
		return c
	}, c.getListenersAsObject = function(a) {
		var b, c = this.getListeners(a);
		return c instanceof Array && (b = {}, b[a] = c), b || c
	}, c.addListener = function(a, c) {
		var d, e = this.getListenersAsObject(a),
			f = "object" == typeof c;
		for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
			listener: c,
			once: !1
		});
		return this
	}, c.on = c.addListener, c.addOnceListener = function(a, b) {
		return this.addListener(a, {
			listener: b,
			once: !0
		})
	}, c.once = c.addOnceListener, c.defineEvent = function(a) {
		return this.getListeners(a), this
	}, c.defineEvents = function(a) {
		for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
		return this
	}, c.removeListener = function(a, c) {
		var d, e, f = this.getListenersAsObject(a);
		for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
		return this
	}, c.off = c.removeListener, c.addListeners = function(a, b) {
		return this.manipulateListeners(!1, a, b)
	}, c.removeListeners = function(a, b) {
		return this.manipulateListeners(!0, a, b)
	}, c.manipulateListeners = function(a, b, c) {
		var d, e, f = a ? this.removeListener : this.addListener,
			g = a ? this.removeListeners : this.addListeners;
		if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) f.call(this, b, c[d]);
		else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
		return this
	}, c.removeEvent = function(a) {
		var b, c = typeof a,
			d = this._getEvents();
		if ("string" === c) delete d[a];
		else if ("object" === c) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
		else delete this._events;
		return this
	}, c.emitEvent = function(a, b) {
		var c, d, e, f, g = this.getListenersAsObject(a);
		for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) c = g[e][d], f = c.listener.apply(this, b || []), (f === this._getOnceReturnValue() || c.once === !0) && this.removeListener(a, g[e][d].listener);
		return this
	}, c.trigger = c.emitEvent, c.emit = function(a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(a, b)
	}, c.setOnceReturnValue = function(a) {
		return this._onceReturnValue = a, this
	}, c._getOnceReturnValue = function() {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, c._getEvents = function() {
		return this._events || (this._events = {})
	}, "function" == typeof define && define.amd ? define(function() {
		return a
	}) : "undefined" != typeof module && module.exports ? module.exports = a : this.EventEmitter = a
}.call(this),
function(a) {
	"use strict";
	var b = document.documentElement,
		c = function() {};
	b.addEventListener ? c = function(a, b, c) {
		a.addEventListener(b, c, !1)
	} : b.attachEvent && (c = function(b, c, d) {
		b[c + d] = d.handleEvent ? function() {
			var b = a.event;
			b.target = b.target || b.srcElement, d.handleEvent.call(d, b)
		} : function() {
			var c = a.event;
			c.target = c.target || c.srcElement, d.call(b, c)
		}, b.attachEvent("on" + c, b[c + d])
	});
	var d = function() {};
	b.removeEventListener ? d = function(a, b, c) {
		a.removeEventListener(b, c, !1)
	} : b.detachEvent && (d = function(a, b, c) {
		a.detachEvent("on" + b, a[b + c]);
		try {
			delete a[b + c]
		} catch (d) {
			a[b + c] = void 0
		}
	});
	var e = {
		bind: c,
		unbind: d
	};
	"function" == typeof define && define.amd ? define(e) : a.eventie = e
}(this),
function(a) {
	"use strict";

	function b(a, b) {
		for (var c in b) a[c] = b[c];
		return a
	}
	function c(a) {
		return "[object Array]" === i.call(a)
	}
	function d(a) {
		var b = [];
		if (c(a)) b = a;
		else if ("number" == typeof a.length) for (var d = 0, e = a.length; e > d; d++) b.push(a[d]);
		else b.push(a);
		return b
	}
	function e(a, c) {
		function e(a, c, g) {
			if (!(this instanceof e)) return new e(a, c);
			"string" == typeof a && (a = document.querySelectorAll(a)), this.elements = d(a), this.options = b({}, this.options), "function" == typeof c ? g = c : b(this.options, c), g && this.on("always", g), this.getImages(), f && (this.jqDeferred = new f.Deferred);
			var h = this;
			setTimeout(function() {
				h.check()
			})
		}
		function i(a) {
			this.img = a
		}
		e.prototype = new a, e.prototype.options = {}, e.prototype.getImages = function() {
			this.images = [];
			for (var a = 0, b = this.elements.length; b > a; a++) {
				var c = this.elements[a];
				"IMG" === c.nodeName && this.addImage(c);
				for (var d = c.querySelectorAll("img"), e = 0, f = d.length; f > e; e++) {
					var g = d[e];
					this.addImage(g)
				}
			}
		}, e.prototype.addImage = function(a) {
			var b = new i(a);
			this.images.push(b)
		}, e.prototype.check = function() {
			function a(a, e) {
				return b.options.debug && h && g.log("confirm", a, e), b.progress(a), c++, c === d && b.complete(), !0
			}
			var b = this,
				c = 0,
				d = this.images.length;
			if (this.hasAnyBroken = !1, !d) return void this.complete();
			for (var e = 0; d > e; e++) {
				var f = this.images[e];
				f.on("confirm", a), f.check()
			}
		}, e.prototype.progress = function(a) {
			this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded;
			var b = this;
			setTimeout(function() {
				b.emit("progress", b, a), b.jqDeferred && b.jqDeferred.notify(b, a)
			})
		}, e.prototype.complete = function() {
			var a = this.hasAnyBroken ? "fail" : "done";
			this.isComplete = !0;
			var b = this;
			setTimeout(function() {
				if (b.emit(a, b), b.emit("always", b), b.jqDeferred) {
					var c = b.hasAnyBroken ? "reject" : "resolve";
					b.jqDeferred[c](b)
				}
			})
		}, f && (f.fn.imagesLoaded3 = function(a, b) {
			var c = new e(this, a, b);
			return c.jqDeferred.promise(f(this))
		});
		var j = {};
		return i.prototype = new a, i.prototype.check = function() {
			var a = j[this.img.src];
			if (a) return void this.useCached(a);
			if (j[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
			var b = this.proxyImage = new Image;
			c.bind(b, "load", this), c.bind(b, "error", this), b.src = this.img.src
		}, i.prototype.useCached = function(a) {
			if (a.isConfirmed) this.confirm(a.isLoaded, "cached was confirmed");
			else {
				var b = this;
				a.on("confirm", function(a) {
					return b.confirm(a.isLoaded, "cache emitted confirmed"), !0
				})
			}
		}, i.prototype.confirm = function(a, b) {
			this.isConfirmed = !0, this.isLoaded = a, this.emit("confirm", this, b)
		}, i.prototype.handleEvent = function(a) {
			var b = "on" + a.type;
			this[b] && this[b](a)
		}, i.prototype.onload = function() {
			this.confirm(!0, "onload"), this.unbindProxyEvents()
		}, i.prototype.onerror = function() {
			this.confirm(!1, "onerror"), this.unbindProxyEvents()
		}, i.prototype.unbindProxyEvents = function() {
			c.unbind(this.proxyImage, "load", this), c.unbind(this.proxyImage, "error", this)
		}, e
	}
	var f = a.jQuery,
		g = a.console,
		h = "undefined" != typeof g,
		i = Object.prototype.toString;
	"function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], e) : a.imagesLoaded3 = e(a.EventEmitter, a.eventie)
}(window),
function(a, b, c, d) {
	"use strict";
	var e = [],
		f = c(a).width(),
		g = c.AdaptText = function(a, b) {
			this.element = a, this.$element = c(a), this.options = c.extend(!0, {}, g.defaults, b, this.$element.data()), this.width = this.$element.width();
			var d = this;
			c.extend(d, {
				init: function() {
					d.resize(), d.options.scrollable && d.scrollOnHover()
				},
				scrollOnHover: function() {
					d.$element.css({
						overflow: "hidden",
						"text-overflow": "ellipsis",
						"white-space": "nowrap"
					}), d.$element.hover(function() {
						var a = d.element.scrollWidth - d.$element.width();
						if (a > 0) {
							var b = Math.sqrt(a / d.width) * d.options.scrollSpeed;
							return d.$element.css("cursor", "e-resize"), d.$element.stop().animate({
								"text-indent": -a
							}, b, function() {
								return d.$element.css("cursor", "text")
							})
						}
					}, function() {
						return d.$element.stop().animate({
							"text-indent": 0
						}, d.options.scrollResetSpeed)
					})
				}
			}), this.init(), e.push(this)
		};
	g.defaults = {
		compression: 10,
		max: Number.POSITIVE_INFINITY,
		min: Number.NEGATIVE_INFINITY,
		scrollable: !1,
		scrollSpeed: 1e3,
		scrollResetSpeed: 300,
		onResizeEvent: !0
	}, g.prototype = {
		constructor: g,
		resize: function() {
			this.width = this.$element.width(), 0 !== this.width && this.$element.css("font-size", Math.floor(Math.max(Math.min(this.width / this.options.compression, parseFloat(this.options.max)), parseFloat(this.options.min))))
		}
	}, g.resize = function(b) {
		(b || c(a).width() !== f) && (f = c(a).width(), c.each(e, function() {
			this.options.onResizeEvent && this.resize()
		}))
	}, c.fn.adaptText = function(a) {
		if ("string" == typeof a) {
			var b = a,
				e = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : d;
			return this.each(function() {
				var a = c.data(this, "adaptText");
				"function" == typeof a[b] && a[b].apply(a, e)
			})
		}
		return this.each(function() {
			c.data(this, "adaptText") || c.data(this, "adaptText", new g(this, a))
		})
	}, a.addEventListener ? a.addEventListener("resize", g.resize, !1) : a.attachEvent && a.attachEvent("onresize", g.resize)
}(window, document, jQuery),
function(a) {
	function b(a, b) {
		return a.toFixed(b.decimals)
	}
	a.fn.countTo = function(b) {
		return b = b || {}, a(this).each(function() {
			function c() {
				k += g, j++, d(k), "function" == typeof e.onUpdate && e.onUpdate.call(h, k), j >= f && (i.removeData("countTo"), clearInterval(l.interval), k = e.to, "function" == typeof e.onComplete && e.onComplete.call(h, k))
			}
			function d(a) {
				var b = e.formatter.call(h, a, e);
				i.text(b)
			}
			var e = a.extend({}, a.fn.countTo.defaults, {
				from: a(this).data("from"),
				to: a(this).data("to"),
				speed: a(this).data("speed"),
				refreshInterval: a(this).data("refresh-interval"),
				decimals: a(this).data("decimals")
			}, b),
				f = Math.ceil(e.speed / e.refreshInterval),
				g = (e.to - e.from) / f,
				h = this,
				i = a(this),
				j = 0,
				k = e.from,
				l = i.data("countTo") || {};
			i.data("countTo", l), l.interval && clearInterval(l.interval), l.interval = setInterval(c, e.refreshInterval), d(k)
		})
	}, a.fn.countTo.defaults = {
		from: 0,
		to: 0,
		speed: 1e3,
		refreshInterval: 100,
		decimals: 0,
		formatter: b,
		onUpdate: null,
		onComplete: null
	}
}(jQuery),
function(a, b) {
	"object" == typeof exports ? module.exports = b(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], b) : b(a.jQuery)
}(this, function(a) {
	var b = function(a, b) {
		var c, d = document.createElement("canvas");
		a.appendChild(d), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
		var e = d.getContext("2d");
		d.width = d.height = b.size;
		var f = 1;
		window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
		var g = (b.size - b.lineWidth) / 2;
		b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
			return +new Date
		};
		var h = function(a, b, c) {
			c = Math.min(Math.max(-1, c || 0), 1);
			var d = 0 >= c ? !0 : !1;
			e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
		}, i = function() {
			var a, c;
			e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
			for (var d = 24; d > 0; --d) d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
			e.restore()
		}, j = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
				window.setTimeout(a, 1e3 / 60)
			}
		}(),
			k = function() {
				b.scaleColor && i(), b.trackColor && h(b.trackColor, b.lineWidth, 1)
			};
		this.getCanvas = function() {
			return d
		}, this.getCtx = function() {
			return e
		}, this.clear = function() {
			e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
		}, this.draw = function(a) {
			b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
			var d;
			d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
		}.bind(this), this.animate = function(a, c) {
			var d = Date.now();
			b.onStart(a, c);
			var e = function() {
				var f = Math.min(Date.now() - d, b.animate.duration),
					g = b.easing(this, f, a, c - a, b.animate.duration);
				this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e)
			}.bind(this);
			j(e)
		}.bind(this)
	}, c = function(a, c) {
		var d = {
			barColor: "#ef1e25",
			trackColor: "#f9f9f9",
			scaleColor: "#dfe0e0",
			scaleLength: 5,
			lineCap: "round",
			lineWidth: 3,
			size: 110,
			rotate: 0,
			animate: {
				duration: 1e3,
				enabled: !0
			},
			easing: function(a, b, c, d, e) {
				return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
			},
			onStart: function() {},
			onStep: function() {},
			onStop: function() {}
		};
		if ("undefined" != typeof b) d.renderer = b;
		else {
			if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
			d.renderer = SVGRenderer
		}
		var e = {}, f = 0,
			g = function() {
				this.el = a, this.options = e;
				for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
				e.easing = "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? jQuery.easing[e.easing] : d.easing, "number" == typeof e.animate && (e.animate = {
					duration: e.animate,
					enabled: !0
				}), "boolean" != typeof e.animate || e.animate || (e.animate = {
					duration: 1e3,
					enabled: e.animate
				}), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
			}.bind(this);
		this.update = function(a) {
			return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
		}.bind(this), this.disableAnimation = function() {
			return e.animate.enabled = !1, this
		}, this.enableAnimation = function() {
			return e.animate.enabled = !0, this
		}, g()
	};
	a.fn.easyPieChart = function(b) {
		return this.each(function() {
			var d;
			a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
		})
	}
}),
function(a) {
	function b(b, c, d) {
		var f, g = this,
			h = b.add(this),
			i = b.find(d.tabs),
			j = c.jquery ? c : b.children(c);
		i.length || (i = b.children()), j.length || (j = b.parent().find(c)), j.length || (j = a(c)), a.extend(this, {
			click: function(b, c) {
				var j = i.eq(b);
				if ("string" == typeof b && b.replace("#", "") && (j = i.filter("[href*=" + b.replace("#", "") + "]"), b = Math.max(i.index(j), 0)), d.rotate) {
					var k = i.length - 1;
					if (0 > b) return g.click(k, c);
					if (b > k) return g.click(0, c)
				}
				if (!j.length) {
					if (f >= 0) return g;
					b = d.initialIndex, j = i.eq(b)
				}
				return b === f ? g : (c = c || a.Event(), c.type = "onBeforeClick", h.trigger(c, [b]), c.isDefaultPrevented() ? void 0 : (e[d.effect].call(g, b, function() {
					f = b, c.type = "onClick", h.trigger(c, [b])
				}), i.removeClass(d.current), j.addClass(d.current), g))
			},
			getConf: function() {
				return d
			},
			getTabs: function() {
				return i
			},
			getPanes: function() {
				return j
			},
			getCurrentPane: function() {
				return j.eq(f)
			},
			getCurrentTab: function() {
				return i.eq(f)
			},
			getIndex: function() {
				return f
			},
			next: function() {
				return g.click(f + 1)
			},
			prev: function() {
				return g.click(f - 1)
			},
			destroy: function() {
				return i.unbind(d.event).removeClass(d.current), j.find("a[href^=#]").unbind("click.T"), g
			}
		}), a.each("onBeforeClick,onClick".split(","), function(b, c) {
			a.isFunction(d[c]) && a(g).bind(c, d[c]), g[c] = function(b) {
				return b && a(g).bind(c, b), g
			}
		}), d.history && a.fn.history && (a.tools.history.init(i), d.event = "history"), i.each(function(b) {
			a(this).bind(d.event, function(a) {
				return g.click(b, a), a.preventDefault()
			})
		}), j.find("a[href^=#]").bind("click.T", function(b) {
			g.click(a(this).attr("href"), b)
		}), location.hash && "a" == d.tabs && b.find("[href=" + location.hash + "]").length ? g.click(location.hash) : (0 === d.initialIndex || d.initialIndex > 0) && g.click(d.initialIndex)
	}
	a.tools = a.tools || {
		version: "dev"
	}, a.tools.tabs = {
		conf: {
			tabs: "a",
			current: "current",
			onBeforeClick: null,
			onClick: null,
			effect: "default",
			initialIndex: 0,
			event: "click",
			rotate: !1,
			slideUpSpeed: 400,
			slideDownSpeed: 400,
			history: !1
		},
		addEffect: function(a, b) {
			e[a] = b
		}
	};
	var c, d, e = {
		"default": function(a, b) {
			this.getPanes().hide().eq(a).show(), b.call()
		},
		fade: function(a, b) {
			var c = this.getConf(),
				d = c.fadeOutSpeed,
				e = this.getPanes();
			d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
		},
		slide: function(a, b) {
			var c = this.getConf();
			this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
		},
		ajax: function(a, b) {
			this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
		}
	};
	a.tools.tabs.addEffect("horizontal", function(b, e) {
		if (!c) {
			var f = this.getPanes().eq(b),
				g = this.getCurrentPane();
			d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
				width: 0
			}, {
				step: function(a) {
					f.css("width", d - a)
				},
				complete: function() {
					a(this).hide(), e.call(), c = !1
				}
			}), g.length || (e.call(), c = !1)
		}
	}), a.fn.tabs = function(c, d) {
		var e = this.data("tabs");
		return e && (e.destroy(), this.removeData("tabs")), a.isFunction(d) && (d = {
			onBeforeClick: d
		}), d = a.extend({}, a.tools.tabs.conf, d), this.each(function() {
			e = new b(a(this), c, d), a(this).data("tabs", e)
		}), d.api ? e : this
	}
}(jQuery),
function(a) {
	function b(a) {
		if (a) {
			var b = d.contentWindow.document;
			b.open().close(), b.location.hash = a
		}
	}
	var c, d, e, f;
	a.tools = a.tools || {
		version: "dev"
	}, a.tools.history = {
		init: function(g) {
			f || (a.browser.msie && a.browser.version < "8" ? d || (d = a("<iframe/>").attr("src", "javascript:false;").hide().get(0), a("body").prepend(d), setInterval(function() {
				var b = d.contentWindow.document,
					e = b.location.hash;
				c !== e && a(window).trigger("hash", e)
			}, 100), b(location.hash || "#")) : setInterval(function() {
				var b = location.hash;
				b !== c && a(window).trigger("hash", b)
			}, 100), e = e ? e.add(g) : g, g.click(function(c) {
				var e = a(this).attr("href");
				return d && b(e), "#" != e.slice(0, 1) ? (location.href = "#" + e, c.preventDefault()) : void 0
			}), f = !0)
		}
	}, a(window).bind("hash", function(b, d) {
		d ? e.filter(function() {
			var b = a(this).attr("href");
			return b == d || b == d.replace("#", "")
		}).trigger("history", [d]) : e.eq(0).trigger("history", [d]), c = d
	}), a.fn.history = function(b) {
		return a.tools.history.init(this), this.bind("history", b)
	}
}(jQuery);
var swfobject = function() {
	function a() {
		if (!T && document.getElementsByTagName("body")[0]) {
			try {
				var a, b = r("span");
				b.style.display = "none", a = M.getElementsByTagName("body")[0].appendChild(b), a.parentNode.removeChild(a), a = null, b = null
			} catch (c) {
				return
			}
			T = !0;
			for (var d = P.length, e = 0; d > e; e++) P[e]()
		}
	}
	function b(a) {
		T ? a() : P[P.length] = a
	}
	function c(a) {
		if (typeof L.addEventListener != E) L.addEventListener("load", a, !1);
		else if (typeof M.addEventListener != E) M.addEventListener("load", a, !1);
		else if (typeof L.attachEvent != E) t(L, "onload", a);
		else if ("function" == typeof L.onload) {
			var b = L.onload;
			L.onload = function() {
				b(), a()
			}
		} else L.onload = a
	}
	function d() {
		var a = M.getElementsByTagName("body")[0],
			b = r(F);
		b.setAttribute("style", "visibility: hidden;"), b.setAttribute("type", I);
		var c = a.appendChild(b);
		if (c) {
			var d = 0;
			! function f() {
				if (typeof c.GetVariable != E) try {
					var g = c.GetVariable("$version");
					g && (g = g.split(" ")[1].split(","), X.pv = [s(g[0]), s(g[1]), s(g[2])])
				} catch (h) {
					X.pv = [8, 0, 0]
				} else if (10 > d) return d++, void setTimeout(f, 10);
				a.removeChild(b), c = null, e()
			}()
		} else e()
	}
	function e() {
		var a = Q.length;
		if (a > 0) for (var b = 0; a > b; b++) {
			var c = Q[b].id,
				d = Q[b].callbackFn,
				e = {
					success: !1,
					id: c
				};
			if (X.pv[0] > 0) {
				var j = q(c);
				if (j) if (!u(Q[b].swfVersion) || X.wk && X.wk < 312) if (Q[b].expressInstall && g()) {
					var k = {};
					k.data = Q[b].expressInstall, k.width = j.getAttribute("width") || "0", k.height = j.getAttribute("height") || "0", j.getAttribute("class") && (k.styleclass = j.getAttribute("class")), j.getAttribute("align") && (k.align = j.getAttribute("align"));
					for (var l = {}, m = j.getElementsByTagName("param"), n = m.length, o = 0; n > o; o++) "movie" != m[o].getAttribute("name").toLowerCase() && (l[m[o].getAttribute("name")] = m[o].getAttribute("value"));
					h(k, l, c, d)
				} else i(j), d && d(e);
				else w(c, !0), d && (e.success = !0, e.ref = f(c), e.id = c, d(e))
			} else if (w(c, !0), d) {
				var p = f(c);
				p && typeof p.SetVariable != E && (e.success = !0, e.ref = p, e.id = p.id), d(e)
			}
		}
	}
	function f(a) {
		var b = null,
			c = q(a);
		return c && "OBJECT" === c.nodeName.toUpperCase() && (b = typeof c.SetVariable !== E ? c : c.getElementsByTagName(F)[0] || c), b
	}
	function g() {
		return !U && u("6.0.65") && (X.win || X.mac) && !(X.wk && X.wk < 312)
	}
	function h(a, b, c, d) {
		var e = q(c);
		if (c = p(c), U = !0, A = d || null, B = {
			success: !1,
			id: c
		}, e) {
			"OBJECT" == e.nodeName.toUpperCase() ? (y = j(e), z = null) : (y = e, z = c), a.id = J, (typeof a.width == E || !/%$/.test(a.width) && s(a.width) < 310) && (a.width = "310"), (typeof a.height == E || !/%$/.test(a.height) && s(a.height) < 137) && (a.height = "137");
			var f = X.ie ? "ActiveX" : "PlugIn",
				g = "MMredirectURL=" + encodeURIComponent(L.location.toString().replace(/&/g, "%26")) + "&MMplayerType=" + f + "&MMdoctitle=" + encodeURIComponent(M.title.slice(0, 47) + " - Flash Player Installation");
			if (typeof b.flashvars != E ? b.flashvars += "&" + g : b.flashvars = g, X.ie && 4 != e.readyState) {
				var h = r("div");
				c += "SWFObjectNew", h.setAttribute("id", c), e.parentNode.insertBefore(h, e), e.style.display = "none", n(e)
			}
			l(a, b, c)
		}
	}
	function i(a) {
		if (X.ie && 4 != a.readyState) {
			a.style.display = "none";
			var b = r("div");
			a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(j(a), b), n(a)
		} else a.parentNode.replaceChild(j(a), a)
	}
	function j(a) {
		var b = r("div");
		if (X.win && X.ie) b.innerHTML = a.innerHTML;
		else {
			var c = a.getElementsByTagName(F)[0];
			if (c) {
				var d = c.childNodes;
				if (d) for (var e = d.length, f = 0; e > f; f++) 1 == d[f].nodeType && "PARAM" == d[f].nodeName || 8 == d[f].nodeType || b.appendChild(d[f].cloneNode(!0))
			}
		}
		return b
	}
	function k(a, b) {
		var c = r("div");
		return c.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + a + "'>" + b + "</object>", c.firstChild
	}
	function l(a, b, c) {
		var d, e = q(c);
		if (c = p(c), X.wk && X.wk < 312) return d;
		if (e) {
			var f, g, h, i = r(X.ie ? "div" : F);
			typeof a.id == E && (a.id = c);
			for (h in b) b.hasOwnProperty(h) && "movie" !== h.toLowerCase() && m(i, h, b[h]);
			X.ie && (i = k(a.data, i.innerHTML));
			for (f in a) a.hasOwnProperty(f) && (g = f.toLowerCase(), "styleclass" === g ? i.setAttribute("class", a[f]) : "classid" !== g && "data" !== g && i.setAttribute(f, a[f]));
			X.ie ? R[R.length] = a.id : (i.setAttribute("type", I), i.setAttribute("data", a.data)), e.parentNode.replaceChild(i, e), d = i
		}
		return d
	}
	function m(a, b, c) {
		var d = r("param");
		d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
	}
	function n(a) {
		var b = q(a);
		b && "OBJECT" == b.nodeName.toUpperCase() && (X.ie ? (b.style.display = "none", function c() {
			if (4 == b.readyState) {
				for (var a in b) "function" == typeof b[a] && (b[a] = null);
				b.parentNode.removeChild(b)
			} else setTimeout(c, 10)
		}()) : b.parentNode.removeChild(b))
	}
	function o(a) {
		return a && a.nodeType && 1 === a.nodeType
	}
	function p(a) {
		return o(a) ? a.id : a
	}
	function q(a) {
		if (o(a)) return a;
		var b = null;
		try {
			b = M.getElementById(a)
		} catch (c) {}
		return b
	}
	function r(a) {
		return M.createElement(a)
	}
	function s(a) {
		return parseInt(a, 10)
	}
	function t(a, b, c) {
		a.attachEvent(b, c), S[S.length] = [a, b, c]
	}
	function u(a) {
		a += "";
		var b = X.pv,
			c = a.split(".");
		return c[0] = s(c[0]), c[1] = s(c[1]) || 0, c[2] = s(c[2]) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
	}
	function v(a, b, c, d) {
		var e = M.getElementsByTagName("head")[0];
		if (e) {
			var f = "string" == typeof c ? c : "screen";
			if (d && (C = null, D = null), !C || D != f) {
				var g = r("style");
				g.setAttribute("type", "text/css"), g.setAttribute("media", f), C = e.appendChild(g), X.ie && typeof M.styleSheets != E && M.styleSheets.length > 0 && (C = M.styleSheets[M.styleSheets.length - 1]), D = f
			}
			C && (typeof C.addRule != E ? C.addRule(a, b) : typeof M.createTextNode != E && C.appendChild(M.createTextNode(a + " {" + b + "}")))
		}
	}
	function w(a, b) {
		if (V) {
			var c = b ? "visible" : "hidden",
				d = q(a);
			T && d ? d.style.visibility = c : "string" == typeof a && v("#" + a, "visibility:" + c)
		}
	}
	function x(a) {
		var b = /[\\\"<>\.;]/,
			c = null != b.exec(a);
		return c && typeof encodeURIComponent != E ? encodeURIComponent(a) : a
	} {
		var y, z, A, B, C, D, E = "undefined",
			F = "object",
			G = "Shockwave Flash",
			H = "ShockwaveFlash.ShockwaveFlash",
			I = "application/x-shockwave-flash",
			J = "SWFObjectExprInst",
			K = "onreadystatechange",
			L = window,
			M = document,
			N = navigator,
			O = !1,
			P = [],
			Q = [],
			R = [],
			S = [],
			T = !1,
			U = !1,
			V = !0,
			W = !1,
			X = function() {
				var a = typeof M.getElementById != E && typeof M.getElementsByTagName != E && typeof M.createElement != E,
					b = N.userAgent.toLowerCase(),
					c = N.platform.toLowerCase(),
					d = /win/.test(c ? c : b),
					e = /mac/.test(c ? c : b),
					f = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
					g = "Microsoft Internet Explorer" === N.appName,
					h = [0, 0, 0],
					i = null;
				if (typeof N.plugins != E && typeof N.plugins[G] == F) i = N.plugins[G].description, i && typeof N.mimeTypes != E && N.mimeTypes[I] && N.mimeTypes[I].enabledPlugin && (O = !0, g = !1, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), h[0] = s(i.replace(/^(.*)\..*$/, "$1")), h[1] = s(i.replace(/^.*\.(.*)\s.*$/, "$1")), h[2] = /[a-zA-Z]/.test(i) ? s(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0);
				else if (typeof L.ActiveXObject != E) try {
					var j = new ActiveXObject(H);
					j && (i = j.GetVariable("$version"), i && (g = !0, i = i.split(" ")[1].split(","), h = [s(i[0]), s(i[1]), s(i[2])]))
				} catch (k) {}
				return {
					w3: a,
					pv: h,
					wk: f,
					ie: g,
					win: d,
					mac: e
				}
			}();
		! function() {
			X.w3 && ((typeof M.readyState != E && ("complete" === M.readyState || "interactive" === M.readyState) || typeof M.readyState == E && (M.getElementsByTagName("body")[0] || M.body)) && a(), T || (typeof M.addEventListener != E && M.addEventListener("DOMContentLoaded", a, !1), X.ie && (M.attachEvent(K, function b() {
				"complete" == M.readyState && (M.detachEvent(K, b), a())
			}), L == top && ! function c() {
				if (!T) {
					try {
						M.documentElement.doScroll("left")
					} catch (b) {
						return void setTimeout(c, 0)
					}
					a()
				}
			}()), X.wk && ! function d() {
				return T ? void 0 : /loaded|complete/.test(M.readyState) ? void a() : void setTimeout(d, 0)
			}()))
		}()
	}
	P[0] = function() {
		O ? d() : e()
	};
	! function() {
		X.ie && window.attachEvent("onunload", function() {
			for (var a = S.length, b = 0; a > b; b++) S[b][0].detachEvent(S[b][1], S[b][2]);
			for (var c = R.length, d = 0; c > d; d++) n(R[d]);
			for (var e in X) X[e] = null;
			X = null;
			for (var f in swfobject) swfobject[f] = null;
			swfobject = null
		})
	}();
	return {
		registerObject: function(a, b, c, d) {
			if (X.w3 && a && b) {
				var e = {};
				e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, Q[Q.length] = e, w(a, !1)
			} else d && d({
				success: !1,
				id: a
			})
		},
		getObjectById: function(a) {
			return X.w3 ? f(a) : void 0
		},
		embedSWF: function(a, c, d, e, f, i, j, k, m, n) {
			var o = p(c),
				q = {
					success: !1,
					id: o
				};
			X.w3 && !(X.wk && X.wk < 312) && a && c && d && e && f ? (w(o, !1), b(function() {
				d += "", e += "";
				var b = {};
				if (m && typeof m === F) for (var p in m) b[p] = m[p];
				b.data = a, b.width = d, b.height = e;
				var r = {};
				if (k && typeof k === F) for (var s in k) r[s] = k[s];
				if (j && typeof j === F) for (var t in j) if (j.hasOwnProperty(t)) {
					var v = W ? encodeURIComponent(t) : t,
						x = W ? encodeURIComponent(j[t]) : j[t];
					typeof r.flashvars != E ? r.flashvars += "&" + v + "=" + x : r.flashvars = v + "=" + x
				}
				if (u(f)) {
					var y = l(b, r, c);
					b.id == o && w(o, !0), q.success = !0, q.ref = y, q.id = y.id
				} else {
					if (i && g()) return b.data = i, void h(b, r, c, n);
					w(o, !0)
				}
				n && n(q)
			})) : n && n(q)
		},
		switchOffAutoHideShow: function() {
			V = !1
		},
		enableUriEncoding: function(a) {
			W = typeof a === E ? !0 : a
		},
		ua: X,
		getFlashPlayerVersion: function() {
			return {
				major: X.pv[0],
				minor: X.pv[1],
				release: X.pv[2]
			}
		},
		hasFlashPlayerVersion: u,
		createSWF: function(a, b, c) {
			return X.w3 ? l(a, b, c) : void 0
		},
		showExpressInstall: function(a, b, c, d) {
			X.w3 && g() && h(a, b, c, d)
		},
		removeSWF: function(a) {
			X.w3 && n(a)
		},
		createCSS: function(a, b, c, d) {
			X.w3 && v(a, b, c, d)
		},
		addDomLoadEvent: b,
		addLoadEvent: c,
		getQueryParamValue: function(a) {
			var b = M.location.search || M.location.hash;
			if (b) {
				if (/\?/.test(b) && (b = b.split("?")[1]), null == a) return x(b);
				for (var c = b.split("&"), d = 0; d < c.length; d++) if (c[d].substring(0, c[d].indexOf("=")) == a) return x(c[d].substring(c[d].indexOf("=") + 1))
			}
			return ""
		},
		expressInstallCallback: function() {
			if (U) {
				var a = q(J);
				a && y && (a.parentNode.replaceChild(y, a), z && (w(z, !0), X.ie && (y.style.display = "block")), A && A(B)), U = !1
			}
		},
		version: "2.3"
	}
}();
! function(a) {
	function b(b, c, d, e) {
		var f = a();
		return a.each(g, function(a, g) {
			var h = g.offset().top,
				i = g.offset().left,
				j = i + g.width(),
				k = h + g.height(),
				l = !(i > c || e > j || h > d || b > k);
			l && f.push(g)
		}), f
	}
	function c() {
		++j;
		var c = f.scrollTop(),
			d = f.scrollLeft(),
			e = d + f.width(),
			g = c + f.height(),
			i = b(c + k.top, e + k.right, g + k.bottom, d + k.left);
		a.each(i, function(a, b) {
			var c = b.data("scrollSpy:ticks");
			"number" != typeof c && b.triggerHandler("scrollSpy:enter"), b.data("scrollSpy:ticks", j)
		}), a.each(h, function(a, b) {
			var c = b.data("scrollSpy:ticks");
			"number" == typeof c && c !== j && (b.triggerHandler("scrollSpy:exit"), b.data("scrollSpy:ticks", null))
		}), h = i
	}
	function d() {
		f.trigger("scrollSpy:winSize")
	}
	function e(a, b, c) {
		var d, e, f, g = null,
			h = 0;
		c || (c = {});
		var i = function() {
			h = c.leading === !1 ? 0 : l(), g = null, f = a.apply(d, e), d = e = null
		};
		return function() {
			var j = l();
			h || c.leading !== !1 || (h = j);
			var k = b - (j - h);
			return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), d = e = null) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
		}
	}
	var f = a(window),
		g = [],
		h = [],
		i = !1,
		j = 0,
		k = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}, l = Date.now || function() {
			return (new Date).getTime()
		};
	a.scrollSpy = function(b, d) {
		b = a(b), b.each(function(b, c) {
			g.push(a(c))
		}), d = d || {
			throttle: 100
		}, k.top = d.offsetTop || 0, k.right = d.offsetRight || 0, k.bottom = d.offsetBottom || 0, k.left = d.offsetLeft || 0;
		var h = e(c, d.throttle || 100),
			j = function() {
				a(document).ready(h)
			};
		return i || (f.on("scroll", j), f.on("resize", j), i = !0), setTimeout(j, 0), b
	}, a.winSizeSpy = function(b) {
		return a.winSizeSpy = function() {
			return f
		}, b = b || {
			throttle: 100
		}, f.on("resize", e(d, b.throttle || 100))
	}, a.fn.scrollSpy = function(b) {
		return a.scrollSpy(a(this), b)
	}
}(jQuery), jQuery.noConflict(), document.documentElement.className = document.documentElement.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2");
var themeUpdateImages = function(a) {
	function b(a) {
		return a.complete ? "undefined" != typeof a.naturalWidth && 0 == a.naturalWidth ? !1 : !0 : !1
	}
	a.each(function() {
		var a = jQuery(this),
			c = a.attr("data-thumbnail");
		if (c) {
			var d = a.width(),
				e = a.height(),
				f = a.data("images"),
				g = d + "." + e;
			if (f || (f = []), 0 === d || 0 === e) return;
			b(a[0]) && (d === a[0].naturalWidth && e === a[0].naturalHeight ? f[g] = a.attr("src") : "undefined" != typeof f[g] ? a.attr("src", f[g]) : jQuery.post(window.location.href, {
				imageAjax: !0,
				width: d,
				height: e,
				thumbnail_id: c
			}, function(b) {
				var c = new Image;
				c.onload = function() {
					a.attr("src", b), f[g] = b, a.data("images", f)
				}, c.src = b
			}))
		}
	})
};
jQuery(document).ready(function($) {
	function splitTable(a) {
		a.wrap("<div class='table-wrapper' />");
		var b = a.clone();
		b.find("td:not(:first-child), th:not(:first-child)").css("display", "none"), b.removeClass("responsive"), a.closest(".table-wrapper").prepend(b), b.wrap("<div class='pinned' />"), a.wrap("<div class='scrollable' />"), setCellHeights(a, b)
	}
	function unsplitTable(a) {
		a.closest(".table-wrapper").find(".pinned").remove(), a.unwrap(), a.unwrap()
	}
	function updateVideos() {
		isMobile && $(".video_frame").each(function() {
			var a = $(this).data("ratio");
			if (a) {
				var b = $(this).width() / a;
				$(this).css("height", b)
			}
		})
	}
	function setCellHeights(a, b) {
		var c = a.find("tr"),
			d = b.find("tr"),
			e = [];
		c.each(function(a) {
			var b = $(this),
				c = b.find("th, td");
			c.each(function() {
				var b = $(this).outerHeight(!0);
				e[a] = e[a] || 0, b > e[a] && (e[a] = b)
			})
		}), d.each(function(a) {
			$(this).height(e[a])
		})
	}
	function updateImages() {
		themeUpdateImages($(".image_styled img, .product-thumbnail, .woocommerce-main-image img"))
	}
	function fillBrokenImage(a, b) {
		var c = document.createElement("canvas");
		return c.width = a, c.height = b, c.toDataURL()
	}
	function preloader(a) {
		a.each(function() {
			$(this).addClass("image-on-loading")
		}).imagesLoaded3(function(a) {
			$.each(a.images, function(a, b) {
				var c = $(b.img);
				setTimeout(function() {
					var a = c.closest(".image_frame"),
						b = c.closest("a");
					a.is(".effect-grayscale") ? enable_image_grayscale_hover(b) : a.is(".effect-icon") && enable_image_hover(b), c.css("visibility", "visible"), c.removeClass("image-on-loading")
				}, 200 * (a + 1))
			})
		}).progress(function(a, b) {
			if (!b.isLoaded) {
				var c = $(b.img);
				c.addClass("image-is-broken"), c.attr("broken_src", c.attr("src"));
				var d = c.attr("width"),
					e = c.attr("height");
				c.attr("src", theme_url + "/includes/broken.php?width=" + d + "&height=" + e)
			}
		})
	}
	if ($(".form-submit #submit").addClass("button white"), $("#navigation > ul").nav({
		child: {
			beforeFirstRender: function() {
				$(this).find(".cufon").length > 0 && Cufon.replace($("> a", this))
			}
		},
		root: {
			afterHoverIn: function() {},
			afterHoverOut: function() {},
			beforeHoverIn: function() {
				$(this).addClass("hover"), $(this).find(".cufon").length > 0 && Cufon.replace($("> a", this))
			},
			beforeHoverOut: function() {
				$(this).removeClass("hover"), $(this).find(".cufon").length > 0 && Cufon.replace($("> a", this))
			}
		}
	}), $("body").is(".responsive")) {
		$(".table_style table").addClass("responsive");
		var isMobile = $("body").is(".isMobile");
		enquire.register("screen and (min-width: 980px)", {
			match: function() {
				updateImages(), updateVideos()
			}
		}).register("screen and (min-width: 768px) and (max-width: 979px)", {
			match: function() {
				updateImages(), updateVideos()
			}
		}).register("screen and (min-width: 568px) and (max-width: 767px)", {
			match: function() {
				updateImages(), updateVideos()
			}
		}).register("screen and (min-width: 480px) and (max-width: 567px)", {
			match: function() {
				updateImages(), updateVideos()
			}
		}).register("screen and (max-width: 479px)", {
			match: function() {
				updateImages(), updateVideos()
			}
		}).register("screen and (max-width: 767px)", {
			match: function() {
				$("table.responsive").each(function(a, b) {
					splitTable($(b))
				})
			},
			unmatch: function() {
				$("table.responsive").each(function(a, b) {
					unsplitTable($(b))
				})
			}
		}), $("#navigation > ul").navToSelect({
			namespace: "nav2select",
			activeClass: "current_page_item",
			indentString: nav2select_indentString,
			placeholder: nav2select_defaultText,
			indentSpace: !0,
			itemFilter: function(a) {
				return !a.is(".not_show_in_mobile")
			},
			getItemLabel: function(a) {
				var b = a.find(this.options.linkSelector).clone();
				return b.find(".menu-subtitle").remove(), b.text()
			}
		})
	}
	$("#sidebar_content .widget:last-child").css("margin-bottom", "20px"), $(".home #sidebar_content .widget:last-child").css("margin-bottom", "0px"), $(".top a").click(function() {
		return $("html, body").animate({
			scrollTop: 0
		}, "slow"), !1
	}), $("body").is(".scroll-to-top") && ($("body").append($("body").is(".scroll-to-top-square") ? '<a href="#top" class="style-square" id="back-to-top">Back To Top</a>' : '<a href="#top" id="back-to-top">Back To Top</a>'), $(function() {
		$(window).scroll(function() {
			$(this).scrollTop() > 100 ? $("#back-to-top").fadeIn() : $("#back-to-top").fadeOut()
		}), $("#back-to-top").click(function() {
			var a = $(window).scrollTop();
			return $("body,html").animate({
				scrollTop: 0
			}, 500 * Math.atan(a / 3e3)), !1
		})
	})), $(".milestone_number").on("scrollSpy:enter", function() {
		$(this).data("visibled") || ($(this).data("visibled", 1), $(this).countTo({
			refreshInterval: 25
		}))
	}).scrollSpy(), $(".pie_progress_wrap").on("scrollSpy:enter", function() {
		if (!$(this).data("visibled")) {
			$(this).data("visibled", 1);
			var a = $(this),
				b = 150,
				c = 7,
				d = pie_progress_track_color,
				e = pie_progress_bar_color;
			a.is(".pie_progress_small") ? (b = 120, c = 6) : a.is(".pie_progress_large") && (b = 180, c = 8), a.data("trackcolor") && (d = a.data("trackcolor")), a.data("barcolor") && (e = a.data("barcolor")), a.find(".pie_progress").easyPieChart({
				size: b,
				scaleLength: 0,
				trackColor: d,
				barColor: e,
				lineCap: "square",
				lineWidth: c
			})
		}
	}).scrollSpy(), $(".progress").on("scrollSpy:enter", function() {
		if (!$(this).data("visibled")) {
			$(this).data("visibled", 1);
			var a = $(this).data("meter");
			$(this).find(".progress-meter").animate({
				width: a + "%"
			}, 1500)
		}
	}).scrollSpy(), $(".icon_email").each(function() {
		void 0 !== $(this).attr("href") && $(this).attr("href", $(this).attr("href").replace("*", "@")), $(this).html($(this).html().replace("*", "@"))
	}), $(".tabs_container").each(function() {
		var a = $(this).attr("data-history");
		a = void 0 !== a && "true" === a ? !0 : !1;
		var b = $(this).attr("data-initialIndex");
		void 0 === b && (b = 0), $("ul.tabs, ul.theme_tabs", this).tabs("div.panes > div, div.theme_panes > div", {
			tabs: "a",
			effect: "fade",
			fadeOutSpeed: -400,
			history: a,
			initialIndex: b
		})
	}).addClass("tabs_inited"), $(".vertical_tabs_container").each(function() {
		var a = $(this).attr("data-history");
		a = void 0 !== a && "true" === a ? !0 : !1;
		var b = $(this).attr("data-initialIndex");
		void 0 === b && (b = 0), $("ul.vertical_tabs, ul.theme_vertical_tabs", this).tabs("div.panes > div, div.theme_panes > div", {
			tabs: "a",
			effect: "fade",
			fadeOutSpeed: -400,
			history: a,
			initialIndex: b
		}), $("div.panes, div.theme_panes", this).css("min-height", $("ul.vertical_tabs, ul.theme_vertical_tabs", this).height())
	}).addClass("tabs_inited"), $(".mini_tabs_container").each(function() {
		var a = $(this).attr("data-history");
		a = void 0 !== a && "true" === a ? !0 : !1;
		var b = $(this).attr("data-initialIndex");
		void 0 === b && (b = 0), $("ul.mini_tabs, ul.theme_mini_tabs", this).tabs("div.panes > div, div.theme_panes > div", {
			tabs: "a",
			effect: "fade",
			fadeOutSpeed: -400,
			history: a,
			initialIndex: b
		})
	}).addClass("tabs_inited"), void 0 !== $.tools && void 0 !== $.tools.tabs && $.tools.tabs.addEffect("slide", function(a, b) {
		this.getPanes().slideUp(), this.getPanes().eq(a).slideDown(function() {
			b.call()
		})
	}), $(".accordion, .theme_accordion").each(function() {
		var a = $(this).attr("data-initialIndex");
		void 0 === a && (a = 0), $(this).tabs("div.pane, div.theme_pane", {
			tabs: ".tab, .theme_tab",
			effect: "slide",
			initialIndex: a
		})
	}), $(".toggle_title").click(function() {
		var a = $(this).parent(".toggle");
		a.is(".toggle_active") ? (a.removeClass("toggle_active"), $(this).siblings(".toggle_content").slideUp("fast"), $(this).trigger("toggle::close")) : (a.addClass("toggle_active"), $(this).siblings(".toggle_content").slideDown("fast"), $(this).trigger("toggle::open"))
	}), $(".responsive_text").each(function() {
		var a = $(this).parents(".tabs_container,.mini_tabs_container,.accordion, .theme_accordion"),
			b = $(this).parents(".toggle"),
			c = this;
		0 != a.length ? a.each(function() {
			var a = null;
			a = $(this).is(".accordion, .theme_accordion") ? $(this).data("tabs") : $(this).find(".tabs, .theme_tabs, .mini_tabs, .theme_mini_tabs").data("tabs"), a.onClick(function() {
				$.data(c, "adaptText") ? $(c).adaptText("resize", !0) : $(c).adaptText()
			})
		}) : 0 != b.length ? b.find(".toggle_title").on("toggle::open", function() {
			$.data(c, "adaptText") ? $(c).adaptText("resize", !0) : $(c).adaptText()
		}) : $(this).adaptText()
	}), $(".button, .theme_button").hover(function() {
		var a = $(this).attr("data-hoverBg"),
			b = $(this).attr("data-hoverColor");
		void 0 !== a && $(this).css("background-color", a), void 0 !== b && $("span", this).css("color", b)
	}, function() {
		var a = $(this).attr("data-hoverBg"),
			b = $(this).attr("data-hoverColor"),
			c = $(this).attr("data-bg"),
			d = $(this).attr("data-color");
		void 0 !== a && (void 0 !== c ? $(this).css("background-color", c) : $(this).css("background-color", "")), void 0 !== b && (void 0 !== d ? $("span", this).css("color", d) : $("span", this).css("color", ""))
	}), $(".testimonials").each(function() {
		function update(a) {
			$content.hide().html(a.content).fadeIn(), $name.hide().html(a.author).fadeIn(), a.meta ? a.link ? $meta.hide().html('<a href="' + a.link + '" target="_blank">' + a.meta + "</a>").fadeIn() : $meta.hide().html(a.meta).fadeIn() : $meta.html(), $avatar.attr("src", a.avatar), autoplay === !0 && (clearTimeout(autoplay_timeout), autoplay_timeout = setTimeout(function() {
				next()
			}, duration))
		}
		function previous() {
			0 == current ? current = items.length - 1 : current -= 1, update(items[current])
		}
		function next() {
			current == items.length - 1 ? current = 0 : current += 1, update(items[current])
		}
		var autoplay = $(this).data("autoplay"),
			duration = $(this).data("duration");
		eval("var items = testimonials_" + $(this).data("items"));
		var current = 0,
			$content = $(this).find(".testimonial_content > div"),
			$name = $(this).find(".testimonial_name"),
			$meta = $(this).find(".testimonial_meta"),
			$avatar = $(this).find(".testimonial_avatar"),
			autoplay_timeout;
		autoplay === !0 && (autoplay_timeout = setTimeout(function() {
			next()
		}, duration)), $(this).find(".testimonial_previous").on("click", function() {
			return previous(), !1
		}), $(this).find(".testimonial_next").on("click", function() {
			return next(), !1
		})
	});
	var enable_lightbox = function(a, b) {
		if (!$("body").is(".no_fancybox")) {
			var c = {
				width: fancybox_options.width,
				height: fancybox_options.height,
				autoSize: fancybox_options.autoSize,
				autoWidth: fancybox_options.autoWidth,
				autoHeight: fancybox_options.autoHeight,
				fitToView: fancybox_options.fitToView,
				aspectRatio: fancybox_options.aspectRatio,
				arrows: fancybox_options.arrows,
				closeBtn: fancybox_options.closeBtn,
				closeClick: fancybox_options.closeClick,
				nextClick: fancybox_options.nextClick,
				autoPlay: fancybox_options.autoPlay,
				playSpeed: fancybox_options.playSpeed,
				preload: fancybox_options.preload,
				loop: fancybox_options.loop,
				iframe: {
					preload: !1
				},
				beforeLoad: function() {
					if (this.element.is(".fancyaudio")) {
						var a, b, c = this.element.data("loop"),
							d = this.element.data("autoplay"),
							e = this.element.data("source");
						a = "false" !== c ? ' loop="true"' : ' loop="false"', b = "false" !== d ? " autoplay" : "";
						var f = Math.round(1e4 * Math.random() + 1);
						this.content = '<div class="audio_frame" style="width:380px;height:100%"><audio id="audio' + f + '" width="100%" height="100%" controls="controls"' + a + ' type="audio/mp3" src="' + e + '"/></div>', this.wrapCSS = this.wrapCSS + " skin-audio", this.arrows = !1, this.width = 380, this.height = 30, this.minHeight = 30, this.scrolling = "no";
						var g;
						this.beforeShow = function() {
							void 0 !== MediaElementPlayer && (g = new MediaElementPlayer("#audio" + f), "false" !== d && g.play())
						}, this.helpers.media = !1, this.beforeChange = function() {
							g && (g.pause(), g.remove())
						}, this.beforeClose = function() {
							g && (g.pause(), g.remove())
						}
					} else if (this.element.is(".fancyvideo")) {
						var b, h, e = this.element.data("source"),
							d = this.element.data("autoplay");
						"false" !== d ? (b = " autoplay", h = "autoplay=true&amp;", this.helpers.media = {}) : (b = "", h = "", this.helpers.media = {
							youtube: {
								params: {
									autoplay: 0
								}
							},
							vimeo: {
								params: {
									autoplay: 0
								}
							}
						}), this.width = parseInt(this.element.data("width"), 10), this.height = parseInt(this.element.data("height"), 10), isMobile && this.width > $("body").width() && (this.height = parseInt(($("body").width() - 20) * this.height / this.width, 10), this.width = $("body").width() - 20);
						var i = this.width,
							j = this.height,
							f = Math.round(1e4 * Math.random() + 1),
							k = "";
						k = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) ? ' preload="none"' : "", this.content = '<div class="video_frame" style="width:' + this.width + 'px"><video id="video' + f + '" width="' + this.width + '" height="' + this.height + '" autoplay="' + d + '" controls="controls"' + k + '><source type="video/mp4" src="' + e + '" /></video></div>', this.wrapCSS = this.wrapCSS + " skin-video", this.scrolling = "no";
						var l;
						this.beforeShow = function() {
							return this.element.is(".fancymobile") || void 0 === MediaElementPlayer ? void $("#video" + f).css("height", j) : void(l = new MediaElementPlayer("#video" + f, {
								defaultVideoWidth: i,
								defaultVideoHeight: j,
								pluginWidth: i,
								pluginHeight: j,
								enableAutosize: !1
							}))
						}, this.helpers.media = !1, this.beforeChange = function() {
							l && l.pause()
						}, this.beforeClose = function() {
							l && l.pause()
						}
					} else this.closeBtn = fancybox_options.closeBtn, this.arrows = fancybox_options.arrows, this.width = fancybox_options.width, this.height = fancybox_options.height, this.minHeight = 100, this.beforeShow = null, this.scrolling = "auto", this.beforeChange = null, this.beforeClose = null, this.wrapCSS = "theme" === fancybox_options.skin ? "skin-theme" : "skin-fancybox";
					this.element.data("width") && (this.width = parseInt(this.element.data("width"), 10)), this.element.data("height") && (this.height = parseInt(this.element.data("height"), 10)), void 0 !== this.element.attr("data-autoSize") && (this.autoSize = "true" === this.element.attr("data-autoSize") ? !0 : !1), void 0 !== this.element.attr("data-autowidth") && (this.autoWidth = "false" === this.element.attr("data-autowidth") ? !1 : !0), void 0 !== this.element.attr("data-autoheight") && (this.autoHeight = "false" === this.element.attr("data-autoheight") ? !1 : !0), void 0 !== this.element.attr("data-fittoview") && (this.fitToView = "false" === this.element.attr("data-fittoview") ? !1 : !0), void 0 !== this.element.attr("data-aspectratio") && (this.aspectRatio = "false" === this.element.attr("data-aspectratio") ? !1 : !0), void 0 !== this.element.attr("data-close") && (this.closeBtn = "true" === this.element.attr("data-close") ? !0 : !1), void 0 !== this.element.attr("data-closeclick") && (this.closeClick = "true" === this.element.attr("data-closeclick") ? !0 : !1);
					var m = this.element.data("type");
					"iframe" === m && (this.type = m), ("inline" === m || "html" === m || "ajax" === m) && (this.element.data("width") && (this.autoWidth = !1), this.element.data("height") && (this.autoHeight = !1))
				},
				helpers: {
					media: {},
					title: {
						type: fancybox_options.title_type
					}
				}
			};
			"theme" === fancybox_options.skin ? (c.padding = 0, c.wrapCSS = "skin-theme") : c.wrapCSS = "skin-fancybox", fancybox_options.thumbnail && (c.helpers.thumbs = {
				width: fancybox_options.thumbnail_width,
				height: fancybox_options.thumbnail_height,
				position: fancybox_options.thumbnail_position,
				source: function(a) {
					var b;
					return a.element && (b = a.element.data("thumb") ? a.element.data("thumb") : $(a.element).find("img").attr("src")), !b && "image" === a.type && a.href && (b = a.href), b
				}
			}), $(b).find(a).fancybox(c)
		}
	};
	$(".wp_lightbox").each(function() {
		var a = $(this);
		a.attr("title") || a.attr("title", a.children("img").attr("alt"))
	}), enable_lightbox(".lightbox, .wp_lightbox", document), enable_lightbox(".fancybox, .colorbox", document), enable_lightbox("a[rel^='prettyPhoto']", document), enable_lightbox(".woocommerce a.zoom", document), enable_lightbox(".woocommerce a.show_review_form", document);
	var enable_image_grayscale_hover = function() {}, enable_image_hover = function(a) {
		a.is(".image_icon_zoom,.image_icon_play,.image_icon_doc,.image_icon_link") && ($.browser.msie && parseInt($.browser.version, 10) < 7 || ($.browser.msie && parseInt($.browser.version, 10) < 9 ? a.hover(function() {
			$(".image_overlay", this).css("visibility", "visible")
		}, function() {
			$(".image_overlay", this).css("visibility", "hidden")
		}).children("img").after('<span class="image_overlay"></span>') : (a.hover(function() {
			$(".image_overlay", this).animate({
				opacity: "1"
			}, "fast")
		}, function() {
			$(".image_overlay", this).animate({
				opacity: "0"
			}, "fast")
		}), 0 == a.find(".image_overlay").length && a.children("img").after($('<span class="image_overlay"></span>').css({
			opacity: "0",
			visibility: "visible"
		})))))
	};
	$(".image_no_link").click(function() {
		return !1
	}), $(".portfolios").each(function() {
		var $section = $(this),
			$pagenavi = $(".wp-pagenavi", this),
			$ajax = !1;
		if (void 0 !== $section.attr("data-options")) eval("var $options = " + $section.attr("data-options")), $ajax = !0;
		else var $options = {};
		var $cufon = !1;
		if ($section.find(".portfolio_title .cufon").length > 0 && ($cufon = !0), $section.is(".sortable")) {
			var $preferences = {
				duration: 1e3,
				adjustHeight: !1,
				adjustWidth: !1,
				easing: "easeInOutQuad",
				attribute: function(a) {
					return $(a).attr("data-id")
				},
				enhancement: function() {
					"undefined" != typeof Cufon && $cufon === !0 && ($.browser.msie && $(".portfolio_title").each(function() {
						$(this).html($(this).text())
					}), Cufon.replace(".portfolio_title"))
				}
			}, $list = $("ul", this),
				$data = $list.clone();
			$data.find(".image_frame img").css("visibility", "visible"), "undefined" != typeof Cufon && $cufon === !0 && $data.find(".portfolio_title").each(function() {
				$("a", this).length > 0 ? $("a", this).html(this.textContent) : $(this).html(this.textContent)
			});
			var $column;
			$list.is(".portfolio_one_column") ? $column = 1 : $list.is(".portfolio_two_columns") ? $column = 2 : $list.is(".portfolio_three_columns") ? $column = 3 : $list.is(".portfolio_four_columns") && ($column = 4);
			var $callback = function() {
				enable_lightbox(".lightbox", $list), $list.find(".image_frame").css("background-image", "none"), $list.find(".image_frame").each(function() {
					$(this).is(".effect-grayscale") ? 0 === $(this).find(".grayscale-wrapper").length && 0 === $(this).find(".image-on-loading").length && enable_image_grayscale_hover($("a", this)) : $(this).is(".effect-icon") && enable_image_hover($("a", this))
				}), "undefined" != typeof Cufon && $cufon === !0 && $.browser.msie && parseInt($.browser.version, 10) < 7 && ($list.find(".portfolio_title").each(function() {
					$("a", this).length > 0 ? $("a", this).html($(this).text()) : $(this).html($(this).text())
				}), Cufon.replace(".portfolio_title"))
			}, $ajax_callback = function(a) {
				var b = $(a);
				b.find(".image_frame img").css("visibility", "visible");
				var c = b.find(".wp-pagenavi");
				$list.quicksand(b.find(".portfolio_item"), $preferences, $callback), $.browser.msie && parseInt($.browser.version, 10) < 7 && $callback(), c.length > 0 ? ($pagenavi = $section.find(".wp-pagenavi"), $pagenavi.length > 0 ? $pagenavi.html(c.html()) : c.appendTo($section)) : $section.find(".wp-pagenavi").remove()
			};
			$ajax && $(this).on("click", ".wp-pagenavi a", function(a) {
				var b = "all";
				$section.find(".sort_by_cat a.current").length > 0 && (b = $section.find(".sort_by_cat a.current").attr("data-value")), $.post(window.location.href, {
					portfolioAjax: !0,
					portfolioOptions: $options,
					category: b,
					portfolioPage: $(this).attr("data-page")
				}, $ajax_callback), a.preventDefault()
			}), $(".sort_by_cat a", this).click(function(a) {
				if ($(this).siblings(".current").removeClass("current"), $(this).addClass("current"), $ajax) {
					var b = $(this).attr("data-value");
					$.post(window.location.href, {
						portfolioAjax: !0,
						portfolioOptions: $options,
						category: b
					}, $ajax_callback)
				} else {
					var c;
					c = "all" === $(this).attr("data-value") ? $data.find(".portfolio_item").clone() : $data.find(".portfolio_item[data-cat*=" + $(this).attr("data-value") + "]").clone(), $list.quicksand(c, $preferences, $callback), $.browser.msie && parseInt($.browser.version, 10) < 7 && $callback()
				}
				a.preventDefault()
			})
		} else $ajax && $(this).on("click", ".wp-pagenavi a", function(a) {
			$.post(window.location.href, {
				portfolioAjax: !0,
				portfolioOptions: $options,
				portfolioPage: $(this).attr("data-page")
			}, function(a) {
				$section.html(a), enable_lightbox(".lightbox", $section), "undefined" != typeof Cufon && $cufon === !0 && Cufon.replace(".portfolio_title"), preloader($section.find(".portfolio_image .image_frame img"))
			}), a.preventDefault()
		})
	}), preloader($(".portfolios").find(".portfolio_image .image_frame img")), preloader($("body").find(".image_styled:not(.portfolio_image) .image_frame img")), $(".gallery .gallery-image").imagesLoaded3(function(a) {
		$.each(a.images, function(a, b) {
			var c = $(b.img);
			setTimeout(function() {
				c.css("visibility", "visible").animate({
					opacity: 1
				}, 500, function() {
					$(this).parent().is(".effect-grayscale") ? enable_image_grayscale_hover($(this).parent()) : enable_image_hover($(this).parent())
				})
			}, 100 * (a + 1))
		})
	}), $(".contact_info_wrap .icon_email").each(function() {
		$(this).attr("href", $(this).attr("href").replace("*", "@")), $(this).html($(this).html().replace("*", "@"))
	}), void 0 !== $.tools.validator && ($.tools.validator.addEffect("contact_form", function(a) {
		$.each(a, function(a, b) {
			var c = b.input;
			c.addClass("invalid")
		})
	}, function(a) {
		a.removeClass("invalid")
	}), $(".widget_contact_form .contact_form").validator({
		effect: "contact_form"
	}).submit(function(a) {
		var b = $(this);
		a.isDefaultPrevented() || ($.post(this.action, {
			theme_contact_form_submit: 1,
			to: $('input[name="contact_to"]').val().replace("*", "@"),
			name: $('input[name="contact_name"]').val(),
			email: $('input[name="contact_email"]').val(),
			content: $('textarea[name="contact_content"]').val()
		}, function() {
			b.fadeOut("fast", function() {
				$(this).siblings("p").show()
			}).delay(3e3).fadeIn("fast", function() {
				$(this).find('input[name="contact_name"]').val(""), $(this).find('input[name="contact_email"]').val(""), $(this).find('textarea[name="contact_content"]').val(""), $(this).siblings("p").hide()
			})
		}), a.preventDefault())
	}), $(".contact_form_wrap .contact_form").validator({
		effect: "contact_form"
	}).submit(function(a) {
		var b = $(this);
		if (!a.isDefaultPrevented()) {
			var c = b.find('input[name="contact_widget_id"]').val();
			$.post(this.action, {
				theme_contact_form_submit: 1,
				to: $('input[name="contact_' + c + '_to"]').val().replace("*", "@"),
				name: $('input[name="contact_' + c + '_name"]').val(),
				email: $('input[name="contact_' + c + '_email"]').val(),
				content: $('textarea[name="contact_' + c + '_content"]').val()
			}, function() {
				b.fadeOut("fast", function() {
					$(this).siblings(".success").show()
				}).delay(3e3).fadeIn("fast", function() {
					$(this).find('input[name="contact_' + c + '_name"]').val(""), $(this).find('input[name="contact_' + c + '_email"]').val(""), $(this).find('textarea[name="contact_' + c + '_content"]').val(""), $(this).siblings(".success").hide()
				})
			}), a.preventDefault()
		}
	}))
});
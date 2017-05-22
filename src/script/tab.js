// 为避免$别名与其他库发生冲突，可以使用jQuery， 或者在立即调用的函数表达式（ IIFE）中传入$，使其成为一个局部变量，这么做也可以防止污染全局命名空间。
;(function($, window, document, undefined) { // 将window/document等系统变量作为参数传递到插件内部，这样在需要访问这些系统变量的时候就可以访问这些参数，也就是访问局部变量，比访问全局变量速度更快，有少许性能提升
	/*用面向对象的方式重写，然后封装成jquery插件*/
	function Tab (el, opts) {
		// body...
		this.opts = $.extend({}, Tab.DEFAULTS, opts);
	    this.$el = $(el);
	    this.tabs = this.$el.find('.' + this.opts.tabClass);
	    var tabs = this.tabs;
	    this.contents = this.$el.find('.' + this.opts.contentClass);
	    var contents = this.contents;
	    var trigger = this.opts.trigger;
	    var that = this;
	    // 设定默认显示第几个tab
	    if (this.opts.invoke > 1) {
	    	this._tabSwitch(this.opts.invoke - 1);
	    }
	    // 控制自动切换
	    if (this.opts.autoPlay === true) {
	    	if (this.timerAuto) {
				clearInterval(this.timerAuto);
				this.timerAuto = null;
			}
	    	this._autoPlay();
	    	// 鼠标移入tab区域停止自动切换，移出恢复
	    	this.$el.hover(function(event) {
				/* Act on the event */
				clearInterval(that.timerAuto);
				that.timerAuto = null;
			}, function(event) {
					event.preventDefault();
					/* Act on the event */
					that._autoPlay();
				}
	    	);
	    }
	    // 切换触发方式
	    if (trigger === 'click') {
	    	tabs.on(trigger, function(e) {
	    		/* Act on the event */
	    		e.preventDefault();
	    		that.curIndex = tabs.index($(this));
	    		that._tabSwitch(that.curIndex);
	    		
	    	});
	    }
	    if (trigger === 'mouseenter') {
	    	tabs.on(trigger, function(e) {
	    		/* Act on the event */
	    		that.curIndex = tabs.index($(this));
	    		if (that.timerDelay) {
					clearTimeout(that.timerDelay);
					that.timerDelay = null;
				}
				that.timerDelay = setTimeout(function() {
					that._tabSwitch(that.curIndex);
					that.timerDelay = null; // debounce去抖，保证清除动画队列
				}, 500);
	    	});
	    }
	}
	Tab.prototype = {
		// body...
		constructor: Tab,
		autoIndex: 0, // 用来记录自动切换的索引
		curIndex: 0, // 用来记录当前切换的tab的索引
		timerAuto: null, // 自动切换定时器
		timerDelay: null, // 延迟切换定时器
		_tabSwitch: function(pIndex) {
			// 硬切换
			if (this.opts.mode === 'none') {
				this.tabs.eq(pIndex).addClass(this.opts.tabClassCur).siblings().removeClass(this.opts.tabClassCur);
				this.contents.eq(pIndex).addClass(this.opts.contentClassCur).siblings().removeClass(this.opts.contentClassCur);
			}
			// 淡入淡出切换
			if (this.opts.mode === 'fade') {
				this.tabs.eq(pIndex).addClass(this.opts.tabClassCur).siblings().removeClass(this.opts.tabClassCur);
				this.contents.eq(pIndex).fadeIn().siblings().fadeOut();
			}
			// 鼠标移入触发切换后要改变自动切换的index值，让下次自动切换的时候从当前tab开始切换
			if (this.opts.autoPlay === true) {
	    		this.autoIndex = pIndex;
	    	}
		},
		_autoPlay: function() {
			var tabs = this.tabs;
			var that = this; // 在原型方法内部把this负值给that，而不是在原型属性里，如果在原型属性里赋值而在外层函数里没有把this负值给that，在定时器内部还是访问不到的，因为闭包里的this还是指向全局作用域（这里用到了定时器，定时器内this指向window对象），而在外层函数里把this负值给that，闭包中的匿名函数就能访问到了；这里的this在调用时就是Tab的实例
			this.timerAuto = setInterval(function() {
	    		that.autoIndex++;
				// 索引达到最大时要重新归零
				if (that.autoIndex >= tabs.length) {
					that.autoIndex = 0;
				}
	    		that._tabSwitch(that.autoIndex);
	    	}, 2000);
		}
	}
	Tab.DEFAULTS = {
		tabClass: 'tab', // tab标签类名，可自定义
		tabClassCur: 'tab-selected', // 标签选定时添加的类名，在该类名下添加标签选定状态的样式
		contentClass: 'content', // content标签类名，可自定义
		contentClassCur: 'content-current', // 内容展示时添加的类名，在该类名下添加内容展示时的样式
		trigger: 'mouseenter', // 切换触发方式，默认mouseenter，可选click
		mode: 'none', // 切换时的动画效果，可选fade，淡入淡出
		autoPlay: true, // 是否自动切换，默认true
		invoke: 1 // 初始默认显示第几个tab
	}
	// 将一个对象添加到jquery的原型上从而提供新的jquery实例方法，这里就相当于给jquery实例对象提供了一个backtop方法，这也是实现jquery插件的常用方法，对象里定义的方法名就是插件方法名
	$.fn.extend({
	    tab: function(opts) {
	        // return 是为了实现连缀，这里的this指代调用插件时用jquery选择的元素（转化成了一个jQuery对象的实例），调用each方法是因为可能会选择多个元素
	        // .each()方法的回调函数的执行环境是当前dom元素，也就是说this始终指向当前dom元素，所以下面的回掉函数就是创建一个BackTop的实例，并把当前dom元素作为参数传入
	        return this.each(function() {
	            new Tab(this, opts); // 这里的this指向dom元素
	        })
	    }
	})
})(jQuery, window, document);
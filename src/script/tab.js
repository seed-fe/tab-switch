// function $ (id) {
// 	// body... 
// 	return typeof id === 'string' ? document.getElementById(id) : id;
// }
// window.onload = function () {
// 	/* body... */
// 	// tab索引和定时器
// 	var index = 0,
// 		timer = null;
// 	// 获取鼠标滑过或点击的标签和要切换内容的元素
// 	var tabs = $('notice-title').getElementsByTagName('li'),
// 		contents = $('notice-content').getElementsByTagName('div');
// 	if (tabs.length != contents.length) {
// 		return;
// 	}
// 	/*用自定义属性方式存储索引*/
// 	// 遍历tabs
// 	// for (var i = 0; i < tabs.length; i++) {
// 	// 	// 给tab增加一个自定义属性number用来保存索引
// 	// 	tabs[i].number = i;
// 	// 	// 鼠标滑过切换
// 	// 	// tabs[i].onmouseover = function (argument) {
// 	// 	// 	/* body... */
// 	// 	// 	// 清除所有li上的class
// 	// 	// 	for (var j = 0; j < tabs.length; j++) {
// 	// 	// 		tabs[j].className = '';
// 	// 	// 		contents[j].style.display = 'none';
// 	// 	// 	}
// 	// 	// 	// 设置当前为高亮显示
// 	// 	// 	this.className = 'selected';
// 	// 	// 	contents[this.number].style.display = 'block';
// 	// 	// }
// 	// 	// 鼠标点击切换
// 	// 	tabs[i].onclick = function (argument) {
// 	// 		/* body... */
// 	// 		// 清除所有li上的class
// 	// 		for (var j = 0; j < tabs.length; j++) {
// 	// 			tabs[j].className = '';
// 	// 			// 通过className来操作内容的显示切换，避免内联样式代码
// 	// 			contents[j].className = 'mod';
// 	// 		}
// 	// 		// 设置当前为高亮显示
// 	// 		this.className = 'selected';
// 	// 		contents[this.number].className = 'mod mod-current';
// 	// 	}
// 	// }
// 	用立即执行匿名函数和闭包的方式存储索引
// 	/*for (var i = 0; i < tabs.length; i++) {
// 		(function (e) {
// 			tabs[e].onclick = function() {
// 				// 清除所有li上的class
// 				for (var j = 0; j < tabs.length; j++) {
// 					tabs[j].className = '';
// 					// 通过className来操作内容的显示切换，避免内联样式代码
// 					contents[j].className = 'mod';
// 				}
// 				// 设置当前为高亮显示
// 				this.className = 'selected';
// 				contents[e].className = 'mod mod-current';
// 			}
// 		})(i);
// 	}*/
// 	/*延迟切换用mouseover*/
// 	/*for (var i = 0; i < tabs.length; i++) {
// 		(function (e) {
// 			tabs[e].onmouseover = function() {
// 				// setTimeout时window对象的方法，里面的函数执行环境就是window，因此this对象就是window，所以这里要将当前this对象（鼠标滑过的li）取出来
// 				var that = this;
// 				// 如果存在准备执行的定时器，立刻清除，只有在当前选项卡上停留时间大于500ms时才执行tab切换，因为给定时器的延迟时间就是500ms
// 				if (timer) {
// 					clearTimeout(timer);
// 					console.log(timer);
// 					timer = null;
// 					console.log(timer);
// 				}
// 				timer = setTimeout(function() {
// 					// 清除所有li上的class
// 					for (var j = 0; j < tabs.length; j++) {
// 						tabs[j].className = '';
// 						// 通过className来操作内容的显示切换，避免内联样式代码
// 						contents[j].className = 'mod';
// 					}
// 					// 设置当前为高亮显示
// 					console.log(that);
// 					that.className = 'selected';
// 					contents[e].className = 'mod mod-current';
// 				}, 500);
// 			}
// 		})(i);
// 	}*/
// }
/*自动切换*/
// window.onload = tab;
// $(document).ready(function() {
// 	// tab();
// 	// body...
// 	var index = 0, //当前显示的tab的索引，初值是0，表示一开始显示第一个
// 		timer = null,
// 		timer1 = null;
// 	var tabDiv = $('#notice');
// 	var tabs = $('#notice-title li'),
// 		contents = $('#notice-content div');
// 	if (tabs.length != contents.length) {
// 		return;
// 	}
// 	for (var i = 0; i < tabs.length; i++) {
// 		(function (e) {
// 			tabs[e].onmouseover = function() { // mouseover 触发时应该延迟切换，这样比较
// 			// tabs[e].onmouseenter = function() {
// 			// tabs[e].onclick = function() {
// 				if (timer1) {
// 					clearTimeout(timer1);
// 					console.log(timer1);
// 					timer1 = null;
// 					console.log(timer1);
// 				}
// 				// 判断当前tab对应的内容是否正在显示，如果正在显示就不执行切换函数，否则就执行切换函数
// 				// if (contents[e].style.display === 'block') {
// 				// 	return;
// 				// } else {
// 					timer1 = setTimeout(function() {
// 						tabSwitch(e);
// 					}, 500);
					
// 				// }
// 			}
// 		})(i);
// 	}
// 	// 鼠标移入整个tab模块时清除定时器，解除自动切换
// 	tabDiv.on('mouseover', function(event) {
// 		event.preventDefault();
// 		/* Act on the event */
// 		clearInterval(timer);
// 		timer = null;
// 	});
// 	tabDiv.on('mouseout', function(event) {
// 		event.preventDefault();
// 		/* Act on the event */
// 		timer = setInterval(autoPlay, 2000);
// 	});
// 	// tabDiv.onmouseover = function() {
// 	// 	clearInterval(timer);
// 	// }
// 	// 鼠标移出整个tab模块时恢复自动切换
// 	// tabDiv.onmouseout = function() {
		
// 	// }
// 	if (timer) {
// 		clearInterval(timer);
// 		timer = null;
// 	}
// 	// 添加间歇调用，改变当前高亮的索引
// 	timer = setInterval(autoPlay, 2000);
// 	// 自动切换索引自增函数封装
// 	function autoPlay() {
// 		// body...
// 		index++;
// 		// 索引达到最大时要重新归零
// 		if (index >= tabs.length) {
// 			index = 0;
// 		}
// 		tabSwitch(index);
// 	}
// 	// tab切换函数封装
// 	// function tabSwitch(curIndex) {
// 	// 	for (var j = 0; j < tabs.length; j++) {
// 	// 		tabs[j].className = '';
// 	// 		// 通过className来操作内容的显示切换，避免内联样式代码
// 	// 		contents[j].className = 'mod';
// 	// 	}
// 	// 	tabs[curIndex].className = 'selected';
// 	// 	contents[curIndex].className = 'mod mod-current';
// 	// 	index = curIndex;
// 	// }
// 	// fade切换
// 	// function tabSwitch(curIndex) {
// 	// 	for (var j = 0; j < tabs.length; j++) {
// 	// 		contents[j].style.display = 'none';
// 	// 	}
// 	// 	// 内容切换完成后才切换tab选项
// 	// 	$(contents[curIndex]).fadeIn('500', function() {
// 	// 		for (var k = 0; k<tabs.length; k++) {
// 	// 			tabs[k].className = '';
// 	// 		}
// 	// 		tabs[curIndex].className = 'selected';
// 	// 	});
// 	// 	// 内容切换开始就切换tab选项
// 	// 	$(contents[curIndex]).fadeIn({
// 	// 		duration: '100', 
// 	// 		start: function() {
// 	// 			for (var k = 0; k<tabs.length; k++) {
// 	// 				tabs[k].className = '';
// 	// 			}
// 	// 			tabs[curIndex].className = 'selected';
// 	// 		}
// 	// 	});
// 	// 	index = curIndex;
// 	// }
// 	// opacity切换
// 	function tabSwitch(curIndex) {
// 		// body...
// 		for (var k = 0; k<tabs.length; k++) {
// 			tabs[k].className = '';
// 		}
// 		tabs[curIndex].className = 'selected';
// 		contents.stop(true);
// 		$(contents[curIndex]).fadeIn().siblings().fadeOut();
// 		index = curIndex; // 执行了切换要把index值也修改为切换后的值，否则如果继续执行自从切换就会从之前的index往下切换
// 	}
// });
// function tab () {
	
// }		

// 为避免$别名与其他库发生冲突，可以使用jQuery， 或者在立即调用的函数表达式（ IIFE）中传入$，使其成为一个局部变量。
;(function($) {
	/*用面向对象的方式重写，然后封装成jquery插件*/
	function Tab (el, opts) {
		// body...
		this.opts = $.extend({}, Tab.DEFAULTS, opts);
	    this.$el = $(el);
	    this.tabs = this.$el.find(this.opts.tabClass);
	    var tabs = this.tabs;
	    this.contents = this.$el.find(this.opts.contentClass);
	    var contents = this.contents;
	    var index = 0;
	    this.curIndex = 0;
	    var timerAuto = null;
	    var timerDelay = null;
	    var that = this;
	  //   if (this.opts.autoPlay === true) {
	  //   	if (timerAuto) {
			// 	clearInterval(timerAuto);
			// 	timerAuto = null;
			// }
	  //   	timerAuto = setInterval($.proxy(this._autoPlay(index), that), 2000);
	  //   	this.$el.on('mouseover', function(event) {
			// 	event.preventDefault();
			// 	/* Act on the event */
			// 	clearInterval(timerAuto);
			// 	timerAuto = null;
			// });
			// this.$el.on('mouseout', function(event) {
			// 	event.preventDefault();
			// 	/* Act on the event */
			// 	timerAuto = setInterval(this._autoPlay(index), 2000);
			// });
	  //   }
	    if (this.opts.trigger === 'click') {
	    	tabs.on('click', function(e) {
	    		/* Act on the event */
	    		alert(1);
	    		curIndex = tabs.index($(this));
	    		that._tabSwitch(curIndex);
	    	});
	    }
	    // console.log(this.tabs);
	    if (this.opts.trigger === 'mouseenter') {
	    	tabs.on('mouseenter', function(e) {
	    		/* Act on the event */
	    		console.log(tabs);
	    		// console.log(1);

	    		this.curIndex = tabs.index($(this));
	    		console.log(this.curIndex);
	    		if (timerDelay) {
					clearTimeout(timerDelay);
					timerDelay = null;
				}
				// 判断当前tab对应的内容是否正在显示，如果正在显示就不执行切换函数，否则就执行切换函数
				// if (contents[e].style.display === 'block') {
				// 	return;
				// } else {
					timerDelay = setTimeout(that._tabSwitch(this.curIndex), 500);
				// }
	    	});
	    }
	}
	Tab.prototype = {
		// body...
		constructor: Tab,
		_tabSwitch: function(curIndex) {
			if (this.opts.mode === 'none') {
				// console.log(1);
				console.log(curIndex);
				this.tabs.eq(curIndex).addClass(this.opts.tabClassCur).siblings(this.opts.tabClass).removeClass(this.opts.tabClassCur);
				console.log(this.tabs.eq(curIndex));
				// var index = tabs.index($(this));
				this.contents.eq(curIndex).addClass(this.opts.contentClassCur).siblings(this.opts.contentClass).removeClass(this.opts.contentClassCur);
			}
			if (this.opts.mode === 'fade') {
				this.tabs.eq(curIndex).addClass(this.opts.tabClassCur).siblings(this.opts.tabClass).removeClass(this.opts.tabClassCur);
				this.contents.eq(curIndex).fadeIn().siblings().fadeOut();
			}
		},
		/*_autoPlay: function(index) {
			index++;
			// 索引达到最大时要重新归零
			if (index >= tabs.length) {
				index = 0;
			}
			this._tabSwitch(index);
		}*/
	}
	Tab.DEFAULTS = {
		tabClass: '.tab', // tab标签类名，可自定义
		tabClassCur: '.tab-selected', // 标签选定时添加的类名，在该类名下添加标签选定状态的样式
		contentClass: '.content', // content标签类名，可自定义
		contentClassCur: '.content-current', // 内容展示时添加的类名，在该类名下添加内容展示时的样式
		trigger: 'mouseenter', // 切换触发方式，默认mouseenter，可选click
		mode: 'none', // 切换时的动画效果，可选fade，淡入淡出
		autoPlay: true, // 是否自动切换，默认true
		invoke: 1
	}
	// 将一个对象添加到jquery的原型上从而提供新的jquery实例方法，这里就相当于给jquery实例对象提供了一个backtop方法，这也是实现jquery插件的常用方法，对象里定义的方法名就是插件方法名
	$.fn.extend({
	    tab: function(opts) {
	        // return 是为了实现连缀，这里的this指代调用插件时用jquery选择的元素，调用each方法是因为可能会选择多个元素
	        // console.log(this); // 回到顶部按钮元素
	        // .each()方法的回调函数的执行环境是当前dom元素，也就是说this始终指向当前dom元素，所以下面的回掉函数就是创建一个BackTop的实例，并把当前dom元素作为参数传入
	        return this.each(function() {
	            new Tab(this, opts);
	        })
	    }
	})
})(jQuery)
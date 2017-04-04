function $ (id) {
	// body... 
	return typeof id === 'string' ? document.getElementById(id) : id;
}
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
window.onload = tab;
function tab () {
	// body...
	var index = 0, //当前显示的tab的索引，初值是0，表示一开始显示第一个
		timer = null;
	var tabDiv = $('notice');
	var tabs = $('notice-title').getElementsByTagName('li'),
		contents = $('notice-content').getElementsByTagName('div');
	if (tabs.length != contents.length) {
		return;
	}
	for (var i = 0; i < tabs.length; i++) {
		(function (e) {
			tabs[e].onmouseover = function() {
				// 清除自动切换的定时器
				clearInterval(timer);
				// 清除所有li上的class
				tabSwitch(e);
			}
		})(i);
	}
	// 鼠标移入整个tab模块时清除定时器，解除自动切换
	tabDiv.onmouseover = function() {
		clearInterval(timer);
	}
	// 鼠标移出整个tab模块时恢复自动切换
	tabDiv.onmouseout = function() {
		timer = setInterval(autoPlay, 2000);
	}
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
	// 添加间歇调用，改变当前高亮的索引
	timer = setInterval(autoPlay, 2000);
	// 索引自增函数封装
	function autoPlay(argument) {
		// body...
		index++;
		// 索引达到最大时要重新归零
		if (index >= tabs.length) {
			index = 0;
		}
		tabSwitch(index);
	}
	// tab切换函数封装
	function tabSwitch(curIndex) {
		for (var j = 0; j < tabs.length; j++) {
			tabs[j].className = '';
			// 通过className来操作内容的显示切换，避免内联样式代码
			contents[j].className = 'mod';
		}
		tabs[curIndex].className = 'selected';
		contents[curIndex].className = 'mod mod-current';
		index = curIndex;
	}
}		

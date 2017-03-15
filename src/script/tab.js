function $ (id) {
	// body... 
	return typeof id === 'string' ? document.getElementById(id) : id;
}
window.onload = function () {
	/* body... */
	// 获取鼠标滑过或点击的标签和要切换内容的元素
	var tabs = $('notice-title').getElementsByTagName('li'),
		contents = $('notice-content').getElementsByTagName('div');
	if (tabs.length != contents.length) {
		return;
	}
	// 遍历tabs
	for (var i = 0; i < tabs.length; i++) {
		// 给tab增加一个自定义属性number用来保存索引
		tabs[i].number = i;
		// 鼠标滑过切换
		// tabs[i].onmouseover = function (argument) {
		// 	/* body... */
		// 	// 清除所有li上的class
		// 	for (var j = 0; j < tabs.length; j++) {
		// 		tabs[j].className = '';
		// 		contents[j].style.display = 'none';
		// 	}
		// 	// 设置当前为高亮显示
		// 	this.className = 'selected';
		// 	contents[this.number].style.display = 'block';
		// }
		// 鼠标点击切换
		tabs[i].onclick = function (argument) {
			/* body... */
			// 清除所有li上的class
			for (var j = 0; j < tabs.length; j++) {
				tabs[j].className = '';
				contents[j].className = 'mod';
			}
			// 设置当前为高亮显示
			this.className = 'selected';
			contents[this.number].className = 'mod mod-current';
		}
	}
}
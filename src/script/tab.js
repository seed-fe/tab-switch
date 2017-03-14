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
		// 给tab增加一个自定义属性用来保存序号
		tabs[i].id = i;
	}
}
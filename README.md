# tab-switch
tab切换插件
## 介绍（Introduction）
简单的tab切换JQuery插件。
功能：支持鼠标点击切换，鼠标划过切换，自动切换，切换效果包括直接切换，淡入淡出切换。
## 快速使用（Quick Start）
1. 构造tab 选项卡HTML结构并编写基本的CSS样式，示例：
```
<div id="notice" class="notice">
    <ul id="notice-title" class="notice-title">
        <li class="tab tab-selected"><a href="#">公告</a></li>
        <li class="tab"><a href="#">规则</a></li>
        <li class="tab"><a href="#">论坛</a></li>
        <li class="tab"><a href="#">安全</a></li>
        <li class="tab"><a href="#">公益</a></li>
    </ul>
    <div id="notice-content" class="notice-content">
        <div class="content content-current">
            <p>内容1</p>
        </div>
        <div class="content">
            <p>内容2</p>
        </div>
        <div class="content">
            <p>内容3</p>
        </div>
        <div class="content">
            <p>内容4</p>
        </div>
        <div class="content">
            <p>内容5</p>
        </div>
    </div>
</div>
```
2. 引入JQuery；
3. 引入tab.js；
4. 在tab选项卡容器上调用插件`$('#notice').tab()`
## 插件配置项（Options）
option|type|default|description
------|----|-------|-----------
tabClass|string|'tab'|tab标签类名，在该类名下添加标签未选定状态的样式
tabClassCur|string|'tab-selected'|标签选定时添加的类名，在该类名下添加标签选定状态的样式
contentClass|string|'content'|选项卡内容标签类名
contentClassCur|string|'content-current'|内容展示时添加的类名，在该类名下添加内容展示时的样式
trigger|string|'mouseenter'|切换触发方式，默认mouseenter，可选click，出于用户体验考虑，mouseenter方式下会延迟切换
mode|string|'none'|切换时的动画效果，默认无动画效果，可选fade，淡入淡出
autoPlay|boolean|true|是否自动切换，默认true
invoke|number|1|初始化显示第几个tab的内容
## 示例（Demos）
https://seed-fe.github.io/tab-switch/ 可以看到不同配置项的效果
## 兼容性（Compatibility）
IE8+
## License

Licensed under the MIT License

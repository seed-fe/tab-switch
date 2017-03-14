requirejs.config({
    paths: {
        jquery: '//cdn.bootcss.com/jquery/3.1.1/jquery.min'
    }
});
/*引入模块，第一个参数是要引入的模块，第二个参数是一个回调函数，回调函数依赖于第一个参数里加载的模块，要等到第一个参数里的模块都加载完成才会执行*/
/*这里和node.js用的commonjs规范模块加载方式不同，commonjs里模块是同步加载，必须先加载完再执行后面的语句，requirejs用的是AMD(asynchronous module definition)异步模块定义规范，模块加载不影响浏览器加载页面（页面不会失去响应），但是模块加载里的回调函数要等到依赖的模块全部加载完成才会运行*/
// requirejs(['jquery', 'scrollto'], function($, scrollto) {
//     var scroll = new scrollto.ScrollTo({
//         dest: 0,
//         speed: 2000
//     })
//     var backTop = $('#backTop'),
//         Window = $(window);
//     // 回到顶部功能
//     backTop.on('click', $.proxy(scroll.move, scroll));
//     // 页面的滚动条属于document，滚动的页面其实是document，document的滚动事件冒泡被window捕获到
//     Window.on('scroll', function() {
//         // 滚过一屏以后出现回到顶部按钮，window.innerHeigh表示浏览器视口大小
//         checkPosition (window.innerHeight);
//     });
//     大部分浏览器（firefox和IE9+）滚动条位于html元素上，chrome的滚动条则位于body
//     /*页面滚动条是属于document的，但是通过window、document.body、html（document.documentElement），可以控制它滚动到指定的位置。*/
//     function move() {
//         $('html, body').animate({
//             scrollTop: 0
//         }, 800);
//     }
//     // 没有动画，直接到顶部
//     function go () {
//         $('html, body').scrollTop(0);
//     }
//     function checkPosition(pos) {
//         if (Window.scrollTop() > pos) {
//             backTop.fadeIn().css('display', 'block');
//         } else {
//             backTop.fadeOut();
//         }
//     }
// })
/*直接引入backtop模块，注意模块就是文件名，不是文件里面构造函数的名称*/
requirejs(['jquery', 'backtop'], function($, backtop) {
    // new backtop.BackTop($('#backTop'), {
    //     mode: 'go'
    //     // pos: 50,
    //     // speed: 2000
    // });
    $('#backTop').backtop({
        // el
        mode: 'move',
        speed: 400
    })
})
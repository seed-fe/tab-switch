define(['jquery'], function($) {
    // 不用scrollto模块了，直接在move和go方法中操作html和body的scrollTop
    var scrollObject = $('html, body');
    function BackTop (el, opts) {
        // body...
        this.opts = $.extend({}, BackTop.DEFAULTS, opts);
        this.$el = $(el);
        // this.scroll = new scrollto.ScrollTo({
        //     dest: 0,
        //     speed: this.opts.speed
        // });
        if (this.opts.mode == 'move') {
            // jquery的proxy方法相当于原生的bind方法，改变函数的执行环境，这里this原本是指向BackTop的实例(因为是调用BackTop的原型方法)，调用proxy方法后指向this.$el
            this.$el.on('click', $.proxy(this._move, this));
        } else {
            this.$el.on('click', $.proxy(this._go, this));
        }
        $(window).on('scroll', $.proxy(this._checkPosition, this));
        // this._checkPositionOnload();
        this._checkPosition();
    }
    BackTop.DEFAULTS = {
        // 回到顶部的方式
        mode: 'move',
        // 回到顶部的终点
        dest: 0,
        // 表示回到顶部按钮显示隐藏切换的位置
        pos: $(window).height(),
        speed: 800
    }
    /*BackTop.prototype._move = function() {
        this.scroll.move();
    }
    BackTop.prototype._go = function() {
        this.scroll.go();
    }
    BackTop.prototype._checkPosition = function() {
        var $el = this.$el;
        if ($(window).scrollTop() > this.opts.pos) {
            $el.fadeIn().css('display', 'block');
        } else {
            $el.fadeOut();
        }
    }*/
    /*用字面量语法重写原型对象*/
    BackTop.prototype = {
        constructor: BackTop,
        _move: function() {
            console.log('move executed~')
            var opts = this.opts,
            dest = opts.dest;
            // console.log(this)
            console.log(dest);
            if ($(window).scrollTop() != dest) {
                if (!scrollObject.is(':animated')) {
                    console.log(1);
                    console.log(scrollObject);
                    scrollObject.animate({
                        scrollTop: dest
                    }, opts.speed);
                }
            }        
        },
        _go: function() {
            var dest = this.opts.dest;
            if ($(window).scrollTop() != dest) {
               scrollObject.scrollTop(dest); 
            }       
        },
        _checkPosition: function() {
            // console.log('checkPosition executed~');
            var $el = this.$el;
            if ($(window).scrollTop() > this.opts.pos) {
                $el.fadeIn().css('display', 'block');
            } else {
                $el.fadeOut();
            }
        }
        /*,
        _checkPositionOnload: function () {
            var $el = this.$el;
            if ($(window).scrollTop() > this.opts.pos) {
                $el.css('display', 'block');
            }
        }*/
    }
    // 将一个对象添加到jquery的原型上从而提供新的jquery实例方法，这里就相当于给jquery实例对象提供了一个backtop方法，这也是实现jquery插件的常用方法，对象里定义的方法名就是插件方法名
    $.fn.extend({
        backtop: function(opts) {
            // return 是为了实现连缀，这里的this指代调用插件时用jquery选择的元素，调用each方法是因为可能会选择多个元素
            // console.log(this); // 回到顶部按钮元素
            // .each()方法的回调函数的执行环境是当前dom元素，也就是说this始终指向当前dom元素，所以下面的回掉函数就是创建一个BackTop的实例，并把当前dom元素作为参数传入
            return this.each(function() {
                new BackTop(this, opts);
            })
        }
    })
    return {
        BackTop: BackTop
    }
})
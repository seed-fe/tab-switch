const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const gutil = require('gulp-util');
const cleanCSS = require('gulp-clean-css');
const combiner = require('stream-combiner2');
const rev = require('gulp-rev');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const handleError = function(err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};
/*开发阶段可以做SASS的编译*/
/*开发阶段，不用gulp-clean-css进行压缩*/
/*配置SASS任务*/
gulp.task('watchsass', function() {
    /*监听Sass文件，并在修改后自动编译成CSS，然后通知浏览器并注入CSS*/
    gulp.watch('src/sass/**/*.scss', function (event) {
        var paths = plugins.watchPath(event, 'src/sass/', 'src/css/');
        // 文件操作的事件类型
        gutil.log('File ' + paths.srcPath + ' was ' + gutil.colors.green(event.type));
        // 文件输出路径
        gutil.log('Dist ' + paths.distPath);
        // 用stream-combiner2合并多个stream，只需添加一个错误监听，而且不会让gulp停止运行
        var combined = combiner.obj([
            // 从src/Sass/取得Sass文件
            gulp.src(paths.srcPath),
            // 这里开启sourcemap后会生成sourcemap文件，可以在firefox（要在开发者工具的设置里样式编辑器部分勾选显示原始来源）和chrome（同样要在开发者工具的设置里勾选enable JavaScript sourcemaps和enable css sourcemaps）自带的开发者工具里直接调试Sass了
            plugins.sourcemaps.init(),
            // 编译SASS，outputStyle选项表示输出CSS的风格，默认是nested，对sass里的嵌套在编译成CSS后也会缩进，expanded会在输出CSS的每一个选择器设置之间空一行，compact也在每个选择器之间空一行，但是每个选择器的样式设置都只写在一行里—（就是花括号里的所有样式设置都写在一行），compressed输出压缩后的CSS
            plugins.sass({outputStyle: 'expanded'}),
            // 添加浏览器前缀，注意这一步要放到编译Sass的后面，否则Sass文件中'//'开头的注释编译会报错
            plugins.autoprefixer(['last 2 Chrome versions', 'Firefox > 20', 'ie 6-8', 'last 2 Opera versions', 'last 2 Safari versions']),
            plugins.sourcemaps.write('./'),
            // 输出到src/css
            gulp.dest(paths.distDir),
            // 调用Browsersync的reload方法通知浏览器文件修改并注入CSS
            reload({ stream: true })
        ])
        // 对合并后的stream添加事件监听
        combined.on('error', handleError)
        return combined;
    })
});
// 先执行监听和编译Sass的任务，然后启动Browsersync，并监听src/路径下所有html、css和js文件（js文件还需要js-hint等前置的任务，可以防止watchjs任务里）
gulp.task('reload',['watchsass'], function() {
    browserSync.init({
        // 设置监听的文件，以baseDir设置的根目录为起点，单个文件就用字符串，多个文件就用数组
        files: ["src/*.html", "src/css/*.css", "src/script/*.js"],
        // 启动静态服务器，默认监听3000端口，设置文件监听路径为src/
        server: {
            baseDir: "./src"
        },
        // 在不同浏览器上镜像点击、滚动和表单，即所有浏览器都会同步
        ghostMode: {
            clicks: true,
            scroll: true
        },
        // 更改控制台日志前缀
        logPrefix: "sass & requirejs with gulp",
        // 设置监听时打开的浏览器
        browser: "firefox",
        // 设置服务器监听的端口号
        port: 8080
    });
});
gulp.task('default', ['reload'], function() {
    console.log('gulp is running~');
});

/*发布阶段，css、js的合并压缩，image的压缩等（合并，重命名，防缓存……）*/
/*如果开发阶段各种调试测试没问题了，就一次性压缩所有文件*/
/*一次压缩所有CSS文件*/
gulp.task('minifycss', function() {
    return gulp.src('src/css/**/*.css')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.autoprefixer({
        // 设置支持的浏览器，这里是主要浏览器的最新两个版本
        browsers: 'last 2 versions'
      }))
      .pipe(cleanCSS())
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/css/'));
});
// 需要一次编译所有js文件就用这个
gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('src/script/**/*.js'),
        plugins.sourcemaps.init(),
        plugins.uglify(),
        // plugins.rev(),
        plugins.sourcemaps.write('./'),
        gulp.dest('dist/script/'),
        // plugins.rev.manifest(),
        // gulp.dest('rev/script')
    ]);
    combined.on('error', handleError);
    return combined;
});
// 压缩所有图片
gulp.task('image', function () {
    return gulp.src('src/images/**/*')
        .pipe(plugins.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/image/'));
});
/*复制HTML*/
gulp.task('html',['minifycss', 'image', 'uglifyjs'], function() {
    return gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'));
});
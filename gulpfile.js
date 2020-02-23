var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('serve', function(done){
    browserSync.init({
        server: "src/",
        notify: false,
    })

    gulp.watch("src/sass/*.scss", gulp.series('sass'));
    gulp.watch("src/*.html", gulp.series('reload'));
    gulp.watch("src/*.js", gulp.series('reload'));
    done();
});

gulp.task('sass', function(){
    return gulp.src("./src/sass/*.scss").pipe(sass()).pipe(gulp.dest("./src/")).pipe(browserSync.stream());
});

gulp.task('build', function(done){
    gulp.series['sass'];
    gulp.src("./src/*.css").pipe(cleanCSS()).pipe(gulp.dest("./dist/"));
    gulp.src("./src/*.html").pipe(htmlmin({collapseWhitespace: true})).pipe(gulp.dest("./dist/"));
    gulp.src("./src/*.js").pipe(gulp.dest("./dist"));
    gulp.src(["./src/res/**/*", "./src/fonts/**/*"], {base: "src"}).pipe(gulp.dest("./dist/"));
    done();
})

gulp.task('default', gulp.series('serve'));
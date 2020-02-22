var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

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
    done();
});

gulp.task('sass', function(){
    return gulp.src("./src/sass/*.scss").pipe(sass()).pipe(gulp.dest("./src/")).pipe(browserSync.stream());
});

gulp.task('default', gulp.series('serve'));
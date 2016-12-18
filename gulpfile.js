const gulp = require('gulp')
const sass = require('gulp-sass')
const autoPrefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')

// compile index.pug files to index.html files
gulp.task('pug', () => {
  return gulp.src('./index.pug')
    .pipe(pug({
      locals: {
        pageTitle: 'Yakima Teng | 滕运锋'
      }
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
})

// compile .scss files to corresponding .css files & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src('./styles/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoPrefixer({
      browsers: [ 'last 20 versions' ],
      cascade: true
    }))
    // .pipe(gulp.dest('./styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./styles'))
    .pipe(browserSync.stream())
})

// static server & files watching
gulp.task('serve', ['sass', 'pug'], () => {
  browserSync.init({ server: './' })

  gulp.watch('./styles/*.scss', ['sass'])
  gulp.watch('./*.pug', ['pug'])
  gulp.watch('./index.html').on('change', browserSync.reload)
})

gulp.task('dev', ['serve'])

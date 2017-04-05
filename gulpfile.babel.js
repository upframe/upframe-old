'use strict'

import gulp from 'gulp'
import cp from 'child_process'
import gutil from 'gulp-util'
import postcss from 'gulp-postcss'
import cssImport from 'postcss-import'
import cssnext from 'postcss-cssnext'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import webpackConfig from './webpack.conf'

const browserSync = BrowserSync.create()
const hugoBin = 'hugo'
const hugoArgs = ['-b', '/', '-d', '../dist', '-s', 'site', '-v', '--buildDrafts', '--buildFuture']

gulp.task('build', ['css', 'js'])
gulp.task('hugo', (cb) => {
  return cp.spawn(hugoBin, hugoArgs, {stdio: 'inherit'}).on('close', (code) => {
    if (code === 0) {
      browserSync.reload()
      cb()
    } else {
      browserSync.notify('Hugo build failed :(')
      cb('Hugo build failed')
    }
  })
})

gulp.task('css', () => (
gulp.src('./src/css/*.css')
  .pipe(postcss([cssnext(), cssImport({from: './src/css/main.css'})]))
  .pipe(gulp.dest('./site/static/css'))
  .pipe(browserSync.stream())
))

gulp.task('js', (cb) => {
  const myConfig = Object.assign({}, webpackConfig)

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }))
    browserSync.reload()
    cb()
  })
})

gulp.task('server', ['hugo', 'css', 'js'], () => {
  browserSync.init({
    port: 80,
    server: {
      baseDir: './dist',
      middleware: function (req, res, next) {
        if (req.url === '/pay' || req.url.startsWith('/pay?')) {
          req.url = req.url.replace('/pay', '/pay.html', 1)
        }

        return next()
      },
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  })

  gulp.watch('./site/**/*', ['hugo'])
  gulp.watch('./src/js/**/*.js', ['js'])
  gulp.watch('./src/css/**/*.css', ['css'])
})

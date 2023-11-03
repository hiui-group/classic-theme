const gulp = require('gulp')
const babel = require('gulp-babel')
const path = require('path')
const through2 = require('through2')
const merge2 = require('merge2')
const runSequence = require('run-sequence')
const transformSass = require('./build/transformSass')
const rimraf = require('rimraf')

const cwd = process.cwd()
const libDir = path.join(cwd, 'lib')
const esDir = path.join(cwd, 'es')

const compile = (modules) => {
  rimraf.sync(modules === false ? esDir : libDir)

  const sass = gulp
    .src(['src/**/*.scss', '!src/**/_*.scss'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        // this.push(file.clone())
        if (file.path.match(/\/style\/.*\.scss$/)) {
          transformSass(file.path)
            .then((css) => {
              // 将 css 内容中多余的 @use 'sass:map'; 内容删除
              file.contents = Buffer.from(css.replace(/@use 'sass:map';/g, ''))
              file.path = file.path.replace(/\.scss$/, '.css')
              this.push(file)
              next()
            })
            .catch((e) => {
              console.error(e)
            })
        } else {
          next()
        }
      })
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir))

  const assets = gulp
    .src(['src/**/*.@(png|svg|eot|ttf|woff|woff2|otf)'])
    .pipe(gulp.dest(modules === false ? esDir : libDir))

  const js = gulp
    .src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(
      babel({
        presets: [
          ...(modules === false
            ? [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ]
              ]
            : ['@babel/preset-env']),
          '@babel/preset-react'
        ],
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]]
      })
    )
    .pipe(
      through2.obj(function (file, encoding, next) {
        if (file.path.match(/\/.*\.js$/)) {
          const cssContent = file.contents.toString().replace(/\.scss/g, '.css')
          file.contents = Buffer.from(cssContent)
          this.push(file)
          next()
        } else {
          this.push(file)
          next()
        }
      })
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir))
  return merge2([sass, assets, js])
}

gulp.task('compile', () => {
  // 构建 cjs 模块
  compile(true)
  // 构建 esm 模块
  compile(false)
})

gulp.task('default', () => {
  runSequence('compile')
})

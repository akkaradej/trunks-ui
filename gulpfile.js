// generated on 2018-11-13 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const tildeImporter = require('node-sass-tilde-importer');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = false;

// 

const html = gulp.series(gulp.parallel(styles, scripts), htmlFunc);
const build = gulp.series(gulp.parallel(lint, html, images, fonts, extras), buildFunc);
const buildLib = gulp.series(cleanLib, stylesLib);
const defaultAction = gulp.series(clean, build, size);
const serveDist = gulp.series(defaultAction, serveDistFunc);
const serveTest = gulp.series(scripts, serveTestFunc);

function styles() {
  return gulp.src('app/assets/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      importer: tildeImporter,
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/assets/styles'))
    .pipe(reload({ stream: true }));
}

function scripts() {
  return gulp.src('app/assets/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/assets/scripts'))
    .pipe(reload({ stream: true }));
}

function linter(files) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({ stream: true, once: true }))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

function lint() {
  return linter('app/assets/scripts/**/*.js')
    .pipe(gulp.dest('app/assets/scripts'));
}

function lintTest() {
  return linter('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
}

function htmlFunc() {
  return gulp.src('app/**/*.html')
    .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
    .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
    .pipe($.if(/\.css$/, $.cssnano({ safe: true, autoprefixer: false })))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: { compress: { drop_console: true } },
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('dist'));
}

function images() {
  return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/assets/images'));
}

function fonts() {
  return gulp.src([
    'app/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    'node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'
  ])
    .pipe($.if(dev, gulp.dest('.tmp/assets/fonts'), gulp.dest('dist/assets/fonts')));
}

function extras() {
  return gulp.src([
    'app/*',
    '!app/*.html',
    '!app/assets',
    '!app/src',
  ], {
    dot: true
  }).pipe(gulp.dest('dist/assets'));
}

function clean() {
  return del(['.tmp', 'dist']);
}

function cleanLib() {
  return del(['.tmp', 'dist-lib']);
}

function serve() {
  gulp.series(clean, gulp.parallel(styles, scripts, fonts), (done) => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    });

    gulp.watch(
      [
        'app/*.html',
        'app/templates/**/*.html',
        'app/assets/images/**/*',
        '.tmp/assets/fonts/**/*'
      ]
    ).on('change', reload);

    gulp.watch('app/src/**/*.scss', gulp.series(styles));
    gulp.watch('app/assets/styles/**/*.scss', gulp.series(styles));
    gulp.watch('app/assets/scripts/**/*.js', gulp.series(scripts));
    gulp.watch('app/assets/fonts/**/*', gulp.series(fonts));

    done();
  });
}

function serveDistFunc(done) {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

  done();
}

function serveTestFunc(done) {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/assets/scripts',
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch('app/assets/scripts/**/*.js', gulp.series(scripts));
  gulp.watch(gulp.series('test/spec/**/*.js', 'test/index.html')).on('change', reload);
  gulp.watch('test/spec/**/*.js', gulp.series(lintTest));

  done();
}

function size() {
  return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
}

function buildFunc() {
  return gulp.src('.tmp/**/*').pipe(gulp.dest('dist'));
}

function stylesLib() {
  return gulp.src([
    'package.json',
    'app/src/**/*',
  ]).pipe($.plumber())
    .pipe(gulp.dest('dist-lib'))
    .pipe(reload({ stream: true }));
}


exports.default = defaultAction;

exports.styles = styles;
exports.scripts = scripts;
exports.lint = lint;
exports.lintTest = lintTest;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.extras = extras;
exports.clean = clean;
exports.cleanLib = cleanLib;
exports.size = size;
exports.stylesLib = stylesLib;

exports.serve = serve;
exports.serveDist = serveDist;
exports.serveTest = serveTest;

exports.build = build;
exports.buildLib = buildLib;


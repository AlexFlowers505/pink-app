const gulp                                  = require("gulp");
const {src, dest, parallel, series, watch}  = require("gulp");
const server                                = require("browser-sync").create();
const concat                                = require("gulp-concat");
const uglify                                = require("gulp-uglify-es").default;
const sass                                  = require("gulp-sass");
const autoprefixer                          = require("gulp-autoprefixer");
const minifyCSS                             = require("gulp-clean-css");
const imagemin                              = require("gulp-imagemin");
const newer                                 = require("gulp-newer");
const del                                   = require("del");
const sourcemap                             = require("gulp-sourcemaps");
const plumber                               = require("gulp-plumber");
const webp                                  = require("gulp-webp");
const rename                                = require("gulp-rename");
const svgstore                              = require("gulp-svgstore");

function startDevServer() {
  server.init({
    server: {baseDir: "source/"},
    notify: false,
    https: true,
    online: true
  })
}

function startUserServer() {
  server.init({
    server: {baseDir: "dist/"},
    notify: false,
    https: true,
    online: true
  })
}

function optimizeScripts() {
  return src("source/js/app.js")
        .pipe(plumber())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest("source/js/"))
        .pipe(server.stream())
}

function optimizeStyles() {
  return src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(concat("app.min.css"))
        .pipe(sass())
        .pipe(autoprefixer({overrideBrowsersList: ["last 10 versions"], grid: true}))
        .pipe(minifyCSS(({level:{1:{specialComments: 0}}/*, format: "beautify"*/ })))
        .pipe(sourcemap.write())
        .pipe(dest('source/css/'))
        .pipe(server.stream())
}

function optimizeImages() {
  return src("source/img/source/**/*.{jpg,png,svg}")
        .pipe(newer("source/img/dest"))
        .pipe(plumber())
        .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.mozjpeg({progressive: true}),
          imagemin.svgo()
        ]))
        .pipe(dest('source/img/dest/'))
}

function doWebP() {
  return src("source/img/dest/**/*.{jpg,png}")
        .pipe(webp({quality: 90}))
        .pipe(dest('source/img/dest/'))
}

function createIconsSprite() {
  return src("source/img/source/**/icon-*.svg")
        .pipe(svgstore())
        // .pipe(imagemin(imagemin.svgo()))
        .pipe(rename("icon-sprite.svg"))
        .pipe(dest("source/img/dest/"))
}

function delDestIcons() {
  return del(["source/img/dest/**/icon-*.svg", "!source/img/dest/**/icon-sprite.svg"])
}

function delOptImages() {
  return del("source/img/dest/**", {force: true})
}

function delDistContents() {
  return del("dist/*", {force: true})
}

function assembleUserBuild() {
  return src([
    "source/css/**/*.min.css",
    "source/js/**/*.min.js",
    "source/img/dest/**/*",
    "source/**/*.html"
  ], {base:"source"})
  .pipe(dest("dist"));
}

function startWatch () {
  watch('source/sass/**/*.scss', optimizeStyles);
  watch(['source/js/**/*.js', '!source/js/**/*.min.js'], optimizeScripts);
  watch('source/*.html').on('change', server.reload);
}

exports.startDevServer = startDevServer;
exports.optimizeScripts = optimizeScripts;
exports.optimizeStyles = optimizeStyles;
exports.doWebP = doWebP;
exports.optimizeImages = series(optimizeImages, doWebP, createIconsSprite);
exports.createIconsSprite = createIconsSprite;
exports.delOptImages = delOptImages;
exports.delDistContents = delDistContents;
exports.delDestIcons = delDestIcons;
exports.default = parallel(delDistContents, optimizeStyles, optimizeScripts, startDevServer, startWatch);
exports.build = series(optimizeStyles, optimizeScripts, optimizeImages, assembleUserBuild, startUserServer);























// const autoprefixer = require("autoprefixer");

// Styles

// const styles = () => {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     // .pipe(postcss([
//     //   autoprefixer()
//     // ]))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("source/css"))
//     .pipe(sync.stream());
// }
//
// exports.styles = styles;
//
// // Server
//
// const server = (done) => {
//   sync.init({
//     server: {
//       baseDir: 'source'
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }
//
// exports.server = server;
//
// // Watcher
//
// const watcher = () => {
//   gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
//   gulp.watch("source/*.html").on("change", sync.reload);
// }
//
// exports.default = gulp.series(
//   styles, server, watcher
// );

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import del from 'del';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';

// Styles

export const styles = () => {
  return gulp.src('source/styles/styles.css', { sourcemaps: true })
    .pipe(plumber())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}

// Images

const optimizeImages = () => {
  return gulp.src('source/images/**/*.{jpeg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'))
}

const copyImages = () => {
  return gulp.src('source/images/**/*.{jpeg,png}')
  .pipe(gulp.dest('build/images'))
}


// SVG

const svg = () =>
gulp.src(['source/images/**/*.svg',])
  .pipe(svgo())
  .pipe(gulp.dest('build/images'));


//Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
    done();
}

// Clean

const clean =() => {
  return del ('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/styles/**/*.css', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts, reload));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg
  ),
  gulp.series(
    server,
    watcher
  )
);

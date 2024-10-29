const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
// import uglify from 'gulp-uglify';
// const imagemin = require('gulp-imagemin');
// const webp = require('imagemin-webp');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'app/css/',
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'app/js/',
    },
    img: {
        src: 'src/img/**/*.{jpg,jpeg,png,gif,webp,svg}',
        dest: 'app/img/',
    },
    html: {
        src: 'src/*.html',
        dest: 'app/',
    },
};

const clean = () => del(['app/*']);

const html = () => {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
};

const styles = () => {
    return src(paths.styles.src, { sourcemaps: true })
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
        .pipe(browserSync.stream());
};

const scripts = () => {
    return src(paths.scripts.src)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
};

const img = () => {
    return src(paths.img.src)
        .pipe(newer(paths.img.dest))
        .pipe(dest(paths.img.dest))
        .pipe(browserSync.stream());
};


const webP = () => {
    return src('src/img/**/*.{jpg,jpeg,png}')
        .pipe(imagemin([
            webp({ quality: 50 })
        ]))
        .pipe(dest(paths.img.dest))
        .pipe(browserSync.stream());
};

const follow = () => {
    browserSync.init({
        server: './app',
    });

    watch(paths.styles.src, styles);
    watch(paths.scripts.src, scripts);
    watch(paths.html.src, html);
    // watch(paths.img.src, series(webP));
    watch(paths.img.src, series(img));
};

exports.default = series(
    clean,
    img,
    // webP,
    parallel(styles, scripts, html),
    follow
);

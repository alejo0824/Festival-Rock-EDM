//**************************************************** */
//                  Tareas Generales                   */
//**************************************************** */

const { src, dest, watch, parallel } = require("gulp");
const plumber = require("gulp-plumber");

//**************************************************** */
//                    Tareas CSS                       */
//**************************************************** */
const sass = require('gulp-sass')(require("sass"));

//**************************************************** */
//                    Tareas Imagenes                  */
//**************************************************** */
const cache = require('gulp-cache');
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");

//----------------------------------------------------- */
//----------------------------------------------------- */
function versionwebp(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}


function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function css(done) {
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))
    done();
}

function js(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    done();
}

//----------------------------------------------------- */
//----------------------------------------------------- *

exports.css = css;
exports.js = js;
exports.versionwebp = versionwebp;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, dev, js);
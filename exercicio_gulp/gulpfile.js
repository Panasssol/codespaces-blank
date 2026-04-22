/**
 * Gulpfile.js
 * -------------------------------------------------------------
 * Tarefas automatizadas:
 *   1. Compilação do SASS  -> task "styles"
 *   2. Compressão de imagens -> task "images"
 *   3. Compressão (minificação) do JavaScript -> task "scripts"
 *
 * Uso:
 *   npx gulp          -> executa todas as tarefas (default)
 *   npx gulp styles   -> compila apenas o SASS
 *   npx gulp images   -> comprime apenas as imagens
 *   npx gulp scripts  -> minifica apenas o JavaScript
 *   npx gulp watch    -> observa mudanças nos arquivos
 * -------------------------------------------------------------
 */

const { src, dest, watch, series, parallel } = require('gulp');

// Plugins para SASS
const sass = require('gulp-sass')(require('sass'));

// Plugin para compressão de imagens
const imagemin = require('gulp-imagemin');

// Plugin para compressão de JavaScript
const uglify = require('gulp-uglify');

// Plugin para renomear arquivos (adicionar .min)
const rename = require('gulp-rename');

/* =============================================================
 * 1) TAREFA: COMPILAÇÃO DO SASS
 * =============================================================
 * Lê os arquivos .scss da pasta src/sass, compila para CSS
 * minificado e salva em dist/css.
 */
function styles() {
    return src('./src/sass/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/css'));
}

/* =============================================================
 * 2) TAREFA: COMPRESSÃO DE IMAGENS
 * =============================================================
 * Lê todas as imagens da pasta src/images (jpg, jpeg, png, gif
 * e svg), comprime e salva em dist/images.
 */
function images() {
    return src('./src/images/*.{jpg,jpeg,png,gif,svg}', { encoding: false })
        .pipe(imagemin())
        .pipe(dest('./dist/images'));
}

/* =============================================================
 * 3) TAREFA: COMPRESSÃO DO JAVASCRIPT
 * =============================================================
 * Lê os arquivos .js da pasta src/js, minifica com uglify e
 * salva em dist/js com o sufixo .min.js
 */
function scripts() {
    return src('./src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/js'));
}

/* =============================================================
 * WATCH - Observa mudanças nos arquivos fonte
 * =============================================================
 */
function watchFiles() {
    watch('./src/sass/**/*.scss', styles);
    watch('./src/js/**/*.js', scripts);
    watch('./src/images/**/*', images);
}

// Exportações das tarefas individuais
exports.styles  = styles;
exports.images  = images;
exports.scripts = scripts;
exports.watch   = watchFiles;

// Tarefa padrão: executa tudo em paralelo
exports.default = parallel(styles, images, scripts);
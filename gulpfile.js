// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js"

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { clear } from "./gulp/tasks/clear.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svgsprite } from "./gulp/tasks/svgsprite.js";
import { otfToTtf, ttfToWoff, fontsStyles } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Отслеживаем изменения в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.svgsprite, svgsprite);
}

// Сценарии выполнения задач
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyles)
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgsprite));
const dev = gulp.series(clear, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clear, mainTasks);
const createZIP = gulp.series(clear, mainTasks, zip)
const uploadFTP = gulp.series(clear, mainTasks, ftp)

export { dev }
export { build }
export { createZIP }
export { uploadFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
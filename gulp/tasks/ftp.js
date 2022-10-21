import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';
import { path } from '../config/path.js';

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.create(configFTP);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				messege: "Error: <%= error.message %>"
			})
		))
		.pipe(ftpConnect.dest(`/${app / path.ftp}/${app.path.rootFolder}`));
}
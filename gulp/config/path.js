import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/images/`,
		svgsprite: `${buildFolder}/images/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
		ico: `${buildFolder}/`,
	},
	src: {
		js: `${srcFolder}/js/script.js`,
		images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,ico,webp}`,
		svg: `${srcFolder}/images/**/*.svg`,
		svgsprite: `${srcFolder}/svg-sprite/**/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		ico: `${srcFolder}/*.ico`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		svgsprite: `${srcFolder}/svg-sprite/**/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
		ico: `${srcFolder}/*.ico`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test`
}
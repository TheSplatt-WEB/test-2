import svgSprite from "gulp-svg-sprite";

export const svgsprite = () => {
	return app.gulp.src(app.path.src.svgsprite)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVGSPRITE",
				messege: "Error: <%= error.message %>"
			})
		))
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
			shape: {
				transform: [
					{
						svgo: {
							plugins: [
								// {
								// 	removeAttrs: {
								// 		attrs: ['class', 'data-name', 'fill', 'stroke.*']
								// 	}
								// },
								{ removeXMLNS: true },
							]
						}
					}
				]
			}
		}))
		.pipe(app.gulp.dest(app.path.build.svgsprite))
		.pipe(app.plugins.browsersync.stream())
}
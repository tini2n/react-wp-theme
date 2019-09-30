const webpackStream = require('webpack-stream');

module.exports = (gulp, config, plugins) => () => gulp.src(config.src.js.common)
    .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError(err => ({
            title: 'js',
            message: err.message
        }))
    }))
    .pipe(plugins.debug({
        title: 'js:'
    }))
    .pipe(webpackStream(require('../webpack.config')))
    .pipe(gulp.dest(config.build.js));
module.exports = {
    src: {
        dir: 'assets/src',
        fonts: 'assets/src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
        js: {
            common: 'assets/src/js/common.js',
            admin: 'assets/src/js/admin.js',
        },
        sass: 'assets/src/sass/*.{sass,scss}',
        html: 'assets/src/html/*.html',
        img: [
            'assets/src/img/**/*.{jpg,png,gif,svg}',
            '!assets/src/img/sprite/*.*'
        ],
        images: 'assets/src/img',
        icons: 'assets/src/img/icons',
        sprite: 'assets/src/img/sprite/*.svg'
    },
    watch: {
        fonts: 'assets/src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
        js: 'assets/src/js/**/*.{js,jsx}',
        sass: 'assets/src/sass/**/*.{sass,scss}',
        html: 'assets/src/html/**/*.html',
        img: [
            'assets/src/img/**/*.{jpg,png,gif,svg}',
            '!assets/src/img/sprite/*.*'
        ],
        sprite: 'assets/src/img/sprite/*.svg'
    },
    build: {
        publicJs: '/wp-content/themes/tgn/assets/build/js/',
        dir: 'assets/build',
        fonts: 'assets/build/fonts',
        js: 'assets/build/js',
        css: 'assets/build/css',
        html: 'assets/build/html',
        img: 'assets/build/img',
        all: 'assets/build/**/*.*',
        sprite: 'assets/build/img/sprite',
        icons: 'assets/build/img/icons'
    },
    local: 'http://localhost'
};
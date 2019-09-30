const webpack = require('webpack');
const config = require('./config');
const path = require('path');

const env = process.env.NODE_ENV;
const isProd = env === 'production';

console.log('isProd: ', isProd);

const loaders = [
    {
        loader: 'babel-loader',
        options: {
            presets: [['es2015', {
                loose: true
            }], 'react', 'stage-0', 'es2016', 'es2017'],
            plugins: ['transform-decorators-legacy']
        }
    },
];

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: loaders
    },
    {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['@svgr/webpack']
    },
    {
        test: /\.(png|jpg|gif)$/i,
        use: [{ loader: 'url-loader' }]
    }
];

const plugins = [
    // new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    // })
];

if (isProd) {
    loaders.push('eslint-loader');
}

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        common: path.resolve(config.src.js.common),
        admin: path.resolve(config.src.js.admin)
    },
    output: {
        publicPath: config.build.publicJs,
        path: path.resolve(config.build.js),
        filename: `[name]${isProd ? '.min' : ''}.js`
    },
    stats: {
        errors: true,
        errorDetails: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            components: path.resolve(config.src.dir + '/js/app/components'),
            containers: path.resolve(config.src.dir + '/js/app/containers'),
            constants: path.resolve(config.src.dir + '/js/app/constants'),
            storage: path.resolve(config.src.dir + '/js/app/storage'),
            services: path.resolve(config.src.dir + '/js/app/services'),
            utils: path.resolve(config.src.dir + '/js/app/utils'),
            icons: path.resolve(config.build.icons),
            images: path.resolve(config.src.images),
        },
    },
    module: {
        rules: rules
    },
    plugins,
    devtool: !isProd ? '#source-map' : false
};
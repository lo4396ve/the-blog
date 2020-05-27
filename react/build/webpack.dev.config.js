// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const webpackDevServer = require('webpack-dev-server');
const baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');

const devConfig = {
    mode: 'development',
    entry: {
        index: path.resolve(process.cwd(), 'react/src/index.js')
    },
    output: {
        filename: 'bundle.js',
        // path: path.resolve(__dirname, 'dist')
    },
    
    devServer: {
        hot: true,
        // noInfo: true,
        stats: 'minimal',
        open: true,
        // historyApiFallback: true
        // hotOnly: true,
        // compress: true,
        // color: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'react/public/index.html'),
            filename: 'index.html'
        })
    ]
}
const config = merge(devConfig, baseConfig);
module.exports = config;
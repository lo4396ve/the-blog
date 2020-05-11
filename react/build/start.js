const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.config');

const compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    // hot: true
})
const app = new webpackDevServer(compiler, devServerOptions)

app.listen('8080', () => {
    console.log('Starting server on http://localhost:8080');
})

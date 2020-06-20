// const webpack = require('webpack');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: path.resolve(process.cwd(), 'react/src'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(process.cwd(), 'react/src'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                include: path.resolve(process.cwd(), 'react/src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            // name: 'static/image/[name].[ext]',
                            // publicPath: '/static'
                        }
                    }
                ]
            }
        ]
    },
}
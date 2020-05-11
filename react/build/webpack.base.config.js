const webpack = require('webpack');
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
            }
        ]
    },
}
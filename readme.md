# 从零搭建react环境
## 基础环境搭建
### 创建项目 安装react react-dom
```
yarn init -y
yarn add react react-dom
```
### 基础环境搭建

借助webpack和babel把react(jsx)代码编译成浏览器可执行的js代码。webpack中rules使用babel-loader去编译js(jsx)文件，babel-loader会自动读取.babelr并使用配置的presets和plugins。
#### 1、安装webpack和babel相关依赖
```
yarn add webpack webpack-cli -D
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```
#### 2、创建.babelrc
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
}
```
#### 3、创建webpack配置文件
* webpack.base.config.js：
```
test: /\.(js|mjs|jsx|ts|tsx)$/,
use: [
    {
        loader: 'babel-loader'
    }
]
```
* webpack.dev.config.js:
配置entry入口文件地址，output输出文件名字以及地址，利用HtmlWebpackPlugin插件自动生成html文件，并引入webpack输出的bundle.js
```
const devConfig = {
    mode: 'development',
    entry: {
        index: path.resolve(process.cwd(), '入口文件地址')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true,
        stats: 'minimal',
        open: true
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
```
#### 4、build/start.js
build.js的作用是执行webpack配置文件
* package.json添加启动命令
```
"scripts": {
    "start": "node build/start.js",
},
```
* build/start.js内容：
```
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.config');

const compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    hot: true
})
const app = new webpackDevServer(compiler, devServerOptions)

app.listen('8080', () => {
    console.log('Starting server on http://localhost:8080');
})
```
> 到此，一个简单的react开发环境搭建成功，yarn start即可启动react本地开发环境

### 团队规范
#### 1、安装eslint相关依赖
```
yarn add eslint eslint-plugin-html eslint-plugin-react babel-eslint -D
```
#### 2、创建.eslintrc.js
```
module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        },
        "ecmaVersion": 11,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "html"
    ],
    "rules": {
        "no-unused-vars": "warn",
        "react/prop-types": "warn",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
```
#### 3、husky+pre-commit钩子，代码提交前检查代码规范
* 安装husky
```
yarn add husky -D
```
* package.json添加以下配置
```
"scripts": {
    "lint": "node_modules/.bin/eslint 'react/**' 'node/**'",
},
"husky": {
    "hooks": {
        "pre-commit": "yarn run lint",
        "commit-msg": "commitlint -e $GIT_PARAMS"
    }
}
```
每次执行git commit 之前会自动执行”scripts“=>"lint"，如果eslint检查代码未通过，会终止代码的提交

#### 4、规范的commit message
* 安装commitizen和cz-conventional-changelog
```
yarn add commitizen cz-conventional-changelog -D
```
* package.json添加下面配置代码：
```
"config": {
    "commitizen": {
        "path": "./node_modules/cz-conventional-changelog"
    }
  },
```
commitizen提供git cz命令代替git commit命令，cz-conventional-changelog提供一个符合Angular团队规范的模板，每次执行git cz会按照指定的规范帮助生成commit message。

[参考文档](https://juejin.im/post/5afc5242f265da0b7f44bee4#heading-3)

### 功能扩展
#### 添加路由
* 安装react-router-dom
```
yarn add react-router-dom
```


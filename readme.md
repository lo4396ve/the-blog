
# 基础环境搭建
## 创建项目 安装react react-dom
```
yarn init -y
yarn add react react-dom
```
## 基础环境搭建

借助webpack和babel把react(jsx)代码编译成浏览器可执行的js代码。webpack中rules使用babel-loader去编译js(jsx)文件，babel-loader会自动读取.babelr并使用配置的presets和plugins。
### 1、安装webpack和babel相关依赖
```
yarn add webpack webpack-cli -D
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```
### 2、创建.babelrc
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
}
```
### 3、创建webpack配置文件
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
### 4、build/start.js
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

## 团队规范
### 1、安装eslint相关依赖
```
yarn add eslint eslint-plugin-html eslint-plugin-react babel-eslint -D
```
### 2、创建.eslintrc.js
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
### 3、husky+pre-commit钩子，代码提交前检查代码规范
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

### 4、规范的commit message
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

## 样式增强
### 样式预处理sass，(还有less、stylus同类方案可选)
* 安装sass依赖
```
yarn add sass-loader node-sass style-loader css-loader -D
```
* webpack配置css文件处理规则
```
{
    test: /\.(sass|scss)$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}
```
### postcss
* postcss常用插件依赖安装
```
yarn add postcss-loader postcss-preset-env postcss-cssnext
```
* 添加postcss.config.js配置文件
```
module.exports = {
    plugins: {
        'postcss-preset-env': {},
        "postcss-cssnext": {},
        "cssnano": {
            autoprefixer: false,
            "postcss-zindex": false
        }
    }
}
```
* webpack添加postcss-loader
```
{
    test: /\.(sass|scss)$/,
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
}
```
### 自适应布局
移动端自适应布局方案有之前阿里的lib-flexible使用的是rem像素单位，还有基于vw的新方案。以vw为例。
> 兼容性：95.99%的完全支持度，ie8+(仅支持vw,vh)，chrome26+，Safari6+，Android Browser4.4+。参考[can i use](https://www.caniuse.com/#feat=viewport-units)

* postcss-px-to-viewport 自动px转vw
```
yarn add postcss-px-to-viewport -D
```
* postcss.config.js plugins添加：
```
'postcss-px-to-viewport': {
    viewportWidth: 750,      // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    viewportHeight: 1334,    // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    unitPrecision: 3,        // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    viewportUnit: 'vw',      // 指定需要转换成的视窗单位，建议使用vw
    selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    mediaQuery: false       // 允许在媒体查询中转换`px`
}
```
参考[移动端适配方案](https://mobilesite.github.io/2018/02/05/vm-mobile-layout/)

### 路由
* 安装react-router-dom
```
yarn add react-router-dom
```
* 路由设计
以便项目管理和全局把握所有页面的从属关系，抽离出一个路由配置文件是一个不错的方案。

#### 路由配置文件
借鉴官方文档提供的示例方案，router/index.js：
```
const routes = [
    {
      path: "/basic",
      component: Basic,
      routes: [
        {
          path: "/basic/home",
          component: Home,
        }
      ]
    },
];
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
        />
    )
}
export {
    routes,
    RouteWithSubRoutes
}
```
项目入口文件index.js：
```
import App from './app';
import {HashRouter} from 'react-router-dom';
ReactDOM.render(
  <HashRouter>
		<App />
  </HashRouter>
, document.getElementById('root'))
```
app.js:
```
import {routes, RouteWithSubRoutes} from './router/index';
const App = () => {
    return (
        <div className='app'>
            <Switch>
                {
                    routes.map(route => {
                        return (
                            <RouteWithSubRoutes {...route} key={route.path}/>
                        )
                    })
                }
                <Redirect from="/" to="/basic" />
            </Switch>
        </div>
    )
}

export default App;
```

### redux
不要为了使用redux而使用redux，滥用redux随着项目的开发，其将成为一个沉重的维护包袱。根据我自己的开发经验，建议只把全局的数据使用redux管理。

像用户基本信息(用户名、头像等)，定位信息类似这种全局数据用redux管理很合理。

还有一些虽然不是像用户基本信息那种的全局数据，但有两个及以上的业务场景会交叉使用到，而且随着开发业务范围扩大，将来可能还会有其他业务模块会使用的数据，也建议用redux管理。

授权登录信息(比如token)更多的是redux配合localstoreage和cookie管理。

> react结合redux的配置包括4步，1、创建action;2、创建reducer;3、createStore创建一个 Redux store;4、Provide组件把store注入根组件
* 安装相关依赖
```
yarn add redux react-redux redux-thunk
```
* action和action-type
根据官方的建议，action-type使用大写常量，方便统一管理
* reducer
```
const rootReducer = combineReducers({
    global,
    其他的reducer
})
export default rootReducer;
```
* createStore
```
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)

export default store;
```
* Provider
根组件注入store，搭配路由还有其他方式，比如使用connect-react-router插件
```
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  
, document.getElementById('root'))
```

### 代码分割
#### 动态导入
react官方介绍了三种代码分割方法：
1：动态import()语法
2：React.lazy 和 Suspense动态引入组件，不支持服务端渲染
3：（官方推荐）@loadable/component库动态引入组件，支持服务端渲染
无论采用哪种动态导入方法，都需要结合打包工具（webpack、Rollup、Browserify等）才能实现。
#### 分割策略
分割颗粒度太细和太粗都不好，太细了分割的文件太多，遍地的动态组件，增加用户交互动作体验差，太粗了又达不到代码分割的效果。

总结了两条个人建议：
1：根据路由分割，同一路由页面初始化就用到的组件打包在一块
2：交互不频繁的二级页面（比如弹层）单独打包
利用webpack提供的chunkFilename和动态引入提供的/* webpackChunkName: 'custom-name' */ 可以控制打包的颗粒度，哪些包要打包在一块，只需要使用相同的custom-name即可。

* 安装相关依赖
```
yarn add @loadable/component
```
* webpack添加chunkFilename配置
```
output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    chunkFilename: '[name].bundle.js'
},
```
* 基于路由的代码分割

```
const Home = loadable(() => import(/* webpackChunkName: 'home' */ './xxx/Home'));
const About = loadable(() => import(/* webpackChunkName: 'about' */ './xxx/About'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```



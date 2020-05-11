const article = require('./article');
const Router = require('koa-router');
const router = new Router();

module.exports = app => {
    router.use('/article', article.routes(), article.allowedMethods())
    app.use(router.routes())
}
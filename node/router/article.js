const Router = require('koa-router');
const articleController = require('../controller/article')

const articleRoute = new Router();
articleRoute.get('/list', (ctx, next) => {
    ctx.body = 'Hello Koa';
})
articleRoute.get('/add', (ctx, next) => {
    console.log('articleController', articleController)
    articleController.addArticle()
})

module.exports = articleRoute;
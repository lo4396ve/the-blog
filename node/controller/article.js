const ArticleModel = require('../models/article')

function addArticle(data) {
    try{
        ArticleModel.addArticle(data);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    addArticle,
}
const ArticleModel = require('../models/article')

function addArticle(data) {
    return new Promise(async (resolve, reject) => {
        try{
            const result = await ArticleModel.addArticle(data);
            resolve(result)
        }
        catch(err) {
            reject(err)
        }
    })
}

module.exports = {
    addArticle,
}
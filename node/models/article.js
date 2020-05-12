'use strict';

const mongoose = require('mongoose');
const chalk = require("chalk");

const articleSchema = new mongoose.Schema({
    auth_name: { type: String, default: ''}, // 作者名字
    auth_head_img: { type: String, default: ''}, // 作者头像
    create_time: { type: String, default: new Date().getTime().toString() }, // 写作时间戳
    type: { type: String }, // 文章类型 前端、后端
    content: { type: String},   // 文章内容
    origin: { type: String},    // 文章来源出处
    origin_url: { type: String}, // 第三方文章外链接
    // 文章活跃信息
    activeInfo: {
        browse_num: { type: Number},    // 浏览次数
        like_num: { type: Number},    // 点赞次数
        collect_num: { type: Number}, // 收藏次数
    },
    
})



articleSchema.statics.findByArticleId = function(id) {
    return new Promise((resolve, reject) => {
        try {
            this.find({article_id: id}, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            });
        }
        catch(err) {
            reject(err);
        }
    })
}
articleSchema.statics.addArticle = function(obj) {
    return new Promise((resolve, reject) => {
        if(!obj) {
            obj = {
                auth_name: 'name', // 作者名字
                auth_head_img: 'img', // 作者头像
                create_time: new Date().getTime().toString(), // 写作时间戳
                type: 'fe', // 文章类型 前端、后端
                content: 'test',   // 文章内容
                origin: 'me',    // 文章来源出处
                origin_url: '', // 第三方文章外链接
                // 文章活跃信息
                activeInfo: {
                    browse_num: 0,    // 浏览次数
                    like_num: 0,    // 点赞次数
                    collect_num: 0, // 收藏次数
                },
            }
        }
        try {
            const articleItem = new Article(obj);
            const result = articleItem.save();
            result.then(() => {
                resolve(true)
            }).catch((err) => {
                reject(err)
            })
        }
        catch (err) {
            reject(err);
        }
    })
}
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
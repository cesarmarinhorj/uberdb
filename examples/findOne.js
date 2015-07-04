// once you run npm install uberDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['articles']);
var article = {
    title : 'uberDB rocks',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
//var foundArticles = db.articles.findOne();
var foundArticles = db.articles.findOne({rating : '5 stars'});

console.log(foundArticles);

// run : node findOne.js
// once you run npm install uberDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['articles']);
var article = {
    title : 'uberDB rocks',
    published : 'today',
    rating : '5 stars'
}

var article2 = {
    title : 'uberDB rocks',
    published : 'yesterday',
    rating : '5 stars'
}

var article3 = {
    title : 'uberDB rocks',
    published : 'today',
    rating : '4 stars'
}

//var savedArticle = db.articles.save(article);
//var savedArticle = db.articles.save([article]);
var savedArticle = db.articles.save([article, article2, article3]);

console.log(savedArticle);

// run : node saveCollection.js
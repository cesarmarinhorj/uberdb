// once you run npm install diskDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['articles']);
var article = {
    title : 'diskDB rocks',
    published : 'today',
    rating : '5 stars'
}
var savedArticle = db.articles.save(article);
console.log(db.articles.count()); // will be 1

// run : node count.js
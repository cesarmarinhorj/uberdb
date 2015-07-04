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

var query = {
	title : 'uberDB rocks'
};

var dataToBeUpdate = {
	title : 'uberDB rocks again!',
};

var options = {
	 multi: false,
	 upsert: false
};

var updated = db.articles.update(query, dataToBeUpdate, options);
console.log(updated); // { updated: 1, inserted: 0 }

// run : node update.js
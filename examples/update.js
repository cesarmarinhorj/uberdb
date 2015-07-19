// once you run npm install uberDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['posts']);
var post = {
    title : 'Hello uberDB',
    published : 'today',
    rating : '5 stars'
}
var savedPost = db.posts.save(post);

var query = {
	title : 'Hello uberDB'
};

var dataToBeUpdate = {
	title : 'Hello uberDB again!',
};

var options = {
	 multi: false,
	 upsert: false
};

var updated = db.posts.update(query, dataToBeUpdate, options);
console.log(updated); // { updated: 1, inserted: 0 }

// run : node update.js
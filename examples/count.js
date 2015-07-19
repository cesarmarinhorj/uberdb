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
console.log(db.posts.count()); // will be 1

// run : node count.js
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
//var foundPosts = db.posts.findOne();
var foundPosts = db.posts.findOne({rating : '5 stars'});

console.log(foundPosts);

// run : node findOne.js
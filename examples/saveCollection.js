// once you run npm install uberDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['posts']);
var post = {
    title : 'Hello uberDB',
    published : 'today',
    rating : '5 stars'
}

var post2 = {
    title : 'Hello uberDB',
    published : 'yesterday',
    rating : '5 stars'
}

var post3 = {
    title : 'Hello uberDB',
    published : 'today',
    rating : '4 stars'
}

//var savedPost = db.posts.save(post);
//var savedPost = db.posts.save([post]);
var savedPost = db.posts.save([post, post2, post3]);

console.log(savedPost);

// run : node saveCollection.js
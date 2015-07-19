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
console.log(db.posts.count());
//db.posts.remove();
//db.posts.remove({rating : '5 stars'});
//db.posts.remove({rating : '5 stars'}, true);
db.posts.remove({rating : '5 stars'}, false);
console.log(db.posts.count());
// run : node remove.js
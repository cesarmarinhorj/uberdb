// once you run npm install uberDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['posts']);
var post = {
    title : 'Hello uberDB',
    published : 'today',
    rating : '5 stars'
}
//save
var savedPost = db.posts.save(post);
console.log(savedPost);

var post = {
    title : 'Hello uberDB Yesterday',
    published : 'yesterday',
    rating : '5 stars'
}
//save
var savedPost = db.posts.save(post);
console.log(savedPost);


//findAll
var foundPosts = db.posts.find();
console.log(foundPosts);

console.log('----------------');
console.log('5 stars');

foundPosts = db.posts.find({rating : '5 stars'});
console.log(foundPosts);

console.log('----------------');
console.log('5 stars and published today:');

foundPosts = db.posts.find({rating : '5 stars',published:'today'});
console.log(foundPosts);

console.log('----------------');

//findOne
var foundPosts = db.posts.findOne();
console.log(foundPosts);

console.log('----------------');

foundPosts = db.posts.findOne({rating : '5 stars'});
console.log(foundPosts);

console.log('----------------');

//update
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
console.log(updated);

console.log('----------------');

// after update
foundPosts = db.posts.findOne({rating : '5 stars'});
console.log(foundPosts);

console.log('----------------');

//count 
console.log(db.posts.count());

console.log('----------------');

//remove
db.posts.remove({rating : '5 stars'});
db.posts.remove();

// db.posts does not exist anymore!

// run : node all.js
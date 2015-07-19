// once you run npm install uberDB,
// var db = require('uberdb'); instead of
var db = require('../lib/uberdb.js');

db.connect('db', ['posts']);
var postComments = {
        title: 'Hello uberDB',
        published: '2 days ago',
        comments: [{
            name: 'john doe',
            comment: 'this is cool',
            rating: 2
        }, {
            name: 'brian doe',
            comment: 'this is super',
            rating: 3
        }, {
            name: 'jason doe',
            comment: 'this is great',
            rating: 2
        }]
    },
    postComments2 = {
        title: 'Hello uberDB again',
        published: '3 days ago',
        comments: [{
            name: 'john doe',
            comment: 'this is cool',
            rating: 1
        }, {
            name: 'brian doe',
            comment: 'this is super',
            rating: 1
        }, {
            name: 'jason doe',
            comment: 'this is great',
            rating: 2
        }]
    },
    postCommentsL3 = {
        title: 'Hello uberDB again',
        published: '3 days ago',
        comments: [{
            name: 'john doe',
            comment: 'this is cool',
            rating: 2,
            comments: [{
                name: 'joe doe',
                comment: 'A reply',
                rating: 1
            }]
        }, {
            name: 'brian doe',
            comment: 'this is super',
            rating: 2
        }, {
            name: 'jason doe',
            comment: 'this is great',
            rating: 2
        }]
    };

var savedPost = db.posts.save([postComments, postComments2, postCommentsL3]);
var foundPosts = db.posts.find();
var foundPosts = db.posts.find({rating : 1});

console.log(foundPosts);

// run : node nestedFindAll.js

# uberDB 

[![NPM](https://nodei.co/npm/uberdb.png?downloads=true&stars=true&nocache=trueplease)](https://nodei.co/npm/uberdb/)

A Lightweight Disk based JSON Database with a MongoDB like API for Node.


##Contents

* [Getting Started](#getting-started)
* [Documentation](#documentation)
  * [Connect](#connect-to-db)
  * [Load Collections](#load-collections)
  * [Write/Save](#writesave-to-collection)
  * [Read](#read-from-collection)
  * [Update](#update-collection)
  * [Remove](#remove-collection)
  * [Count](#count)
* [Examples](#examples)
* [Release History](#release-history)

## Getting Started
Install the module locally :  
```bash
$ npm install uberdb
```

```js
var db = require('uberdb');
db = db.connect('/path/to/db-folder', ['collection-name']);
// you can access the traditional JSON DB methods here
```

## Documentation
### Connect to DB
```js
db.connect(pathToFolder, ['filename']);
```
Filename will be the name of the JSON file. You can omit the extension, uberDB will take care of it for you.

```js
var db = require('uberdb');
db = db.connect('/examples/db', ['posts']);
// or simply
db.connect('/examples/db', ['posts']);
```

This will check for a directory at given path, if it does not exits, uberDB will throw an error and exit. 

If the directory exists but the file/collection does not exist, uberDB will create it for you. 

**Note** : If you have manually created an empty JSON file, please make sure that it contains at least an empty array.

```js
[]
```

Or else it will throw an error like

```bash
undefined:0

^
SyntaxError: Unexpected end of input
```

### Load Collections 

Alternatively you can also load collections like 

```js
var db = require('uberdb');
// this
db = db.connect('/examples/db');
db.loadCollections(['posts']);
//or
db.connect('/examples/db');
db.loadCollections(['posts']);
//or
db.connect('/examples/db').loadCollections(['posts']);
//or
db.connect('/examples/db', ['posts']);
```

#### Load Multiple Collections

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts','comments','users']);
```

### Write/Save to Collection

```js
db.collectioName.save(object);
```
Once you have loaded a collection, you can access the collection's methods using the dot notation like

```js
db.[collectionName].[methodname]
```

To save the data, you can use

```js
var db = require('uberdb');
db.connect('db', ['posts']);
var post = {
    title : "Hello uberDB",
    published : "today",
    rating : "5 stars"
}
db.posts.save(post);
// or
db.posts.save([post]);
```

The saved data will be 

```js
[
    {
        "title": "Hello uberDB",
        "published": "today",
        "rating": "5 stars",
        "_id": "0f6047c6c69149f0be0c8f5943be91be"
    }
]
```

You can also save multiple objects at once like

```js
var db = require('uberdb');
db.connect('db', ['posts']);
var post1 = {
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
db.posts.save([post1, post2, post3]);
```

And this will return the inserted objects

```js
[ { title: 'Hello uberDB',
    published: 'today',
    rating: '4 stars',
    _id: 'b1cdbb3525b84e8c822fc78896d0ca7b' },
  { title: 'Hello uberDB',
    published: 'yesterday',
    rating: '5 stars',
    _id: '42997c62e1714e9f9d88bf3b87901f3b' },
  { title: 'Hello uberDB',
    published: 'today',
    rating: '5 stars',
    _id: '4ca1c1597ddc4020bc41b4418e7a568e' } ]
```

### Read from Collection

There are 2 methods available for reading the JSON collection
* db.collectioName.find(query)
* db.collectioName.findOne(query)

#### db.collectioName.find() 

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.find();
```

This will return all the records

```js
[{ 
    title: 'Hello uberDB',
    published: 'today',
    rating: '5 stars',
    _id: '0f6047c6c69149f0be0c8f5943be91be' 
}]
```

You can also query with a criteria like

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.find({rating : "5 stars"});
```

This will return all the posts which have a rating of 5. 

Nested JSON : 

```js
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
}
```

```js
var savedPost = db.posts.save([postComments);
foundPosts = db.posts.find({rating : 2});
```

Keep in mind that since uberDB is mostly for light weight data storage, avoid nested structures and huge datasets.

#### db.collectioName.findOne(query)

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.findOne();
```

If you do not pass a query, uberDB will return the first post in the collection. If you pass a query, it will return first post in the filtered data. 

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.findOne({_id: '0f6047c6c69149f0be0c8f5943be91be'});
```
### Update Collection

```js
db.collectioName.update(query, data, options);
```

You can also update one or many objects in the collection

```js
options = {
    multi: false, // update multiple - default false
    upsert: false // if object is not found, add it (update-insert) - default false
}
```

Usage 

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);

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
```

### Remove Collection

```js
db.collectioName.remove(query, multi);
```

You can remove the entire collection (including the file) or you can remove the matched objects by passing in a query. When you pass a query, you can either delete all the matched objects or only the first one by passing `multi` as `false`. The default value of `multi` is `true`.

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.remove({rating : "5 stars"});
```

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.remove({rating : "5 stars"}, true); // remove all matched. Default - multi = true
```

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.remove({rating : "5 stars"}, false); // remove only the first match
```

Using remove without any params will delete the file and will remove the db instance.

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.remove();
```

After the above operation `db.posts` is `undefined`.

### Count

```js
db.collectioName.count();
```

Will return the count of objects in the Collection

```js
var db = require('uberdb');
db.connect('/examples/db', ['posts']);
db.posts.count(); // will give the count
```

## Examples

Refer to the [examples](https://github.com/freekrai/uberDB/tree/master/examples) folder.

## Release History
* 1.0.x
  * Base Module with
    * Connect to a Folder
    * Access a Collection/File
    * Create Read Update Delete on JSON object
    * Minor fixes and tests
    * Performance improvements

## License
Copyright (c) 2015 Roger Stringer. Licensed under the MIT license.

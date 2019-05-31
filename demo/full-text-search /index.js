const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const assert = require('assert')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const dbURL = 'mongodb://localhost/full-text-search'
var db

MongoClient.connect(dbURL, (err, database) => {
    db = database
    db.collection('textstore', {}, (err, collection) => {
        if (err) {
            db.createCollection('textstore', (err, result) => {
                assert.equal(null, err)
            })
        }
        db.ensureIndex('textstore', {
            document: 'text'
        }, (err, indexname) => {
            assert.equal(null, err)
        })
        app.listen(3000)
    })
})

app.get("/", function (req, res) {
    res.sendfile("./views/index.html");
});

app.get("/add", function (req, res) {
    res.sendfile('./views/add.html');
});

app.post("/add", function (req, res) {
    db.collection('textstore').insert({
        document: req.body.newDocument,
        created: new Date()
    }, function (err, result) {
        if (err == null) {
            res.sendfile("./views/add.html")
        } else {
            res.send("Error:" + err)
        }
    })
})

app.get("/search", function (req, res) {
    res.sendfile('./views/search.html');
});

app.post("/search", function (req, res) {
    db.collection('textstore').find({
        "$text": {
            "$search": req.body.query
        }
    }, {
            document: 1,
            created: 1,
            _id: 1,
            textScore: {
                $meta: "textScore"
            }
        }, {
            sort: {
                textScore: {
                    $meta: "textScore"
                }
            }
        }).toArray(function (err, items) {
            res.send(pagelist(items));
        })
});

function pagelist(items) {
    result = "<html><body><ul>";
    items.forEach(function(item) {
      itemstring = "<li>" + item._id + "<ul><li>" + item.textScore +
        "</li><li>" + item.created + "</li><li>" + item.document +
        "</li></ul></li>";
      result = result + itemstring;
    });
    result = result + "</ul></body></html>";
    return result;
}


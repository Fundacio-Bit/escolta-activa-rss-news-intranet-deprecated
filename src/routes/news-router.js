var express = require('express')
var router = express();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require ('body-parser')
var db;


router.use( bodyParser.json() )  // to support JSON-encoded bodies

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/", (err, client) =>
{
    if(err) throw err;
    db = client.db('rss_fbit_db');
});


// get all entries from news
router.get("/entries", (req, res) =>
{
    var collection = db.collection("news");
    collection.find({},{fields:{"_id":1, "published":1,"title":1, "selected":1}}).toArray((err, docs) =>
    {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            res.json({"results": docs});
        }
    });
});
  
// Add route without parameters
router.route('/news')
    .post((req, res) =>
{
    var collection = db.collection("news_discarded");
    console.log('1:' + req.body._id);
    console.log('2:' + JSON.stringify(req.body));
    collection.insertOne(req.body, function (err, results) {
        if (err)
            {
            console.log(err)
            res.status(500).send(err)
            }
    });
  
    res.json({ success: req.body._id })

});

// Add route with parameters and different CRUD operations (GET, DELETE and PUT) 
router.route('/identifier/:documentId')
    .get((req, res) =>
    {
        var o_id = new mongo.ObjectID(req.params.documentId);
        
        var collection = db.collection("news");
        collection.find({"_id": o_id}).toArray((err, docs) =>
            {
                if(err) {
                    console.log("error: " + err)
                    res.status(500).send(err)
                } else {
                    res.json({"results": docs});
                }
            });
    })
    .delete((req, res)=>
    {
        var collection = db.collection("news");
        var query = { _id: new mongo.ObjectId(req.params.documentId) };
        collection.deleteOne(query, function (err, results) {
            if (err)
                {
                console.log(err)
                res.status(500).send(err)
                }
        });
      
        res.json({ success: req.params.documentId })
    })

// Add route with parameters and different CRUD operations (GET, DELETE and PUT) 
router.route('/identifier/:documentId/selected/:selected')
    .put((req, res)=>{
        var collection = db.collection("news");
        var query = {'_id': new mongo.ObjectID(req.params.documentId)};
        var newvalues = { $set: {selected: (req.params.selected === 'true') } };
        collection.updateOne(query, newvalues, function (err, results) {
            if (err)
                {
                console.log(err)
                res.status(500).send(err)
                }
            else {
                res.json({ success: req.params.documentId })
            }
        })
    })

// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.   
        
module.exports = router
var express = require('express')
var router = express();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require ('body-parser')
var db;


router.use( bodyParser.json() )  // to support JSON-encoded bodies

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/",  { useNewUrlParser: true }, (err, client) =>
{
    if(err) throw err;
    db = client.db('rss_fbit_db');
});


// get all topics from news
router.get("/topics", (req, res) =>
{
    var collection = db.collection("news");
    collection.find({"topics":{$exists: true}}, {
            fields: {
                "_id": 0,
                "topics": 1
            }
        }).toArray((err, docs) =>
    {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            var topics = docs.map(function (doc) {return doc.topics.split(",")});
             var merged_topics = [].concat(...topics);
            var unique_topics = [...new Set(merged_topics)]; 
            res.json({"results": unique_topics});
        }
    });
});
  

// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.   
        
module.exports = router
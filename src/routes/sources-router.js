var express = require('express')
var router = express();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/", (err, client) =>
{
    if(err) throw err;
    db = client.db('rss_fbit_db');
});


// Reuse database object in request handlers
router.get("/sources", (req, res) =>
{
    var collection = db.collection("rss_feeds");
    collection.find({},{fields:{"_id":1, "source_name":1, "source_id":1, "is_active":1, "section":1, "news_counter":1}}).toArray((err, docs) =>
    {
        if(err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            res.json({"results": docs});
        }
    });
});
  
// // Add route without parameters
// router.route('/')
//     .get((req, res) =>
//         {
//         // mongoDocument.find({}, (err, mongoDocs) =>
//         //     {
//         //     if(err)
//         //         {
//         //         console.log(err)
//         //         res.status(500).send(err)
//         //         }
//         //     else
//         //         {
//         //         res.json({"results": mongoDocs})
//         //         }
//         //     })
//         const query = {};
//         const projection = {};
//         db.collection("rss_sources").find(query, projection).toArray(function(err, results) {
//             if(err)
//                 {
//                 console.log(err)
//                 res.status(500).send(err)
//                 }
//             else
//                 {
//                 console.log('results: ' + results)
//                 res.json({"results": results})
//                 }
//             })
//     })

// Add route with parameters and different CRUD operations (GET, DELETE and PUT) 
router.route('/identifier/:sourceId')
    .get((req, res) =>
    {
        var o_id = new mongo.ObjectID(req.params.documentId);
        
        var collection = db.collection("rss_feeds");
        collection.find({"source_id": req.params.sourceId}).toArray((err, docs) =>
            {
                if(err) {
                    console.log("error: " + err)
                    res.status(500).send(err)
                } else {
                    res.json({"results": docs});
                }
            });
    })
    // .delete((req, res)=>
    // {
    //     var collection = db.collection("news");
    //     var query = { _id: new mongo.ObjectId(req.params.documentId) };
    //     collection.deleteOne(query, function (err, results) {
    //         if (err)
    //             {
    //             console.log(err)
    //             res.status(500).send(err)
    //             }
    //     });
      
    //     res.json({ success: req.params.documentId })
    // })


// Add route with parameters and different CRUD operations (GET, DELETE and PUT) 
router.route('/country/:countryISOCode')
    .get((req, res) =>
    {     
        
        var collection = db.collection("rss_feeds");
        collection.find({"source_id": {$regex: 'RSS_'+ req.params.countryISOCode}},{fields:{"_id":0, "name":1, "source_id":1}}).toArray((err, docs) =>
            {
                if(err) {
                    console.log("error: " + err)
                    res.status(500).send(err)
                } else {
                    res.json({"results": docs});
                }
            });
    })

// Add route with parameters and different CRUD operations (GET, DELETE and PUT) 
router.route('/identifier/:feedId/active/:active')
    .put((req, res)=>{
        var collection = db.collection("rss_feeds");
        var query = {'_id': new mongo.ObjectID(req.params.feedId)};
        var newvalues = { $set: {is_active: (req.params.active === 'true') } };
        collection.updateOne(query, newvalues, function (err, results) {
            if (err)
                {
                console.log(err)
                res.status(500).send(err)
                }
            else {
                res.json({ success: req.params.feedId })
            }
        })
    })

// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.   
        
module.exports = router
var express = require('express')
var router = express();

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/", (err, client) =>
{
    if(err) throw err;
    db = client.db('rss_fbit_db');
});

// Reuse database object in request handlers
router.get("/", (req, res) =>
{
    var collection = db.collection("news");
    results = []
    collection.find({},{fields:{"_id":0, "published":1,"title":1}}).toArray((err, docs) =>
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

// // Add route with parameters and different CRUD operations (GET, DELETE and PUT) 
// router.route('/identifier/:documentId')
//     .get((req, res) =>
//         {
//         mongoDocument.find({"_id": req.params.documentId}, (err, retrievedDoc) =>
//             {
//             if(err)
//                 {
//                 console.log(err)
//                 res.status(500).send(err)
//                 }
//             else
//                 {
//                 res.json(retrievedDoc)
//                 }
//             })
//         })
//     .delete((req, res)=>
//         {
//         mongoDocument.findById(req.params.documentId, (err, retrievedDoc) =>
//             {
//             if (err)
//                 {
//                 console.log(err)
//                 res.status(500).send(err)
//                 }
//             else
//                 {
//                 if (retrievedDoc)
//                     {
//                     retrievedDoc.remove(err => {
//                         if(err)
//                             {
//                             res.status(500).send(err)
//                             }
//                         else
//                             {
//                             res.status(204).send('removed')
//                             }
//                         })                
//                     }
//                 else
//                     {
//                     console.log('Not found')
//                     }
//                 }
//             })
//         })
//     .put((req, res)=>{ // add a title to an existing document
//         mongoDocument.findById(req.params.documentId, (err, retrievedDoc) =>
//             {
//             if (err)
//                 {
//                 console.log(err)
//                 res.status(500).send(err)
//                 }
//             else
//                 {
//                 if (retrievedDoc)
//                     {                      
//                         retrievedDoc.title = "An updated title"
//                         retrievedDoc.save()
//                         res.status(201).send(retrievedDoc)                                  
//                     }
//                 else
//                     {
//                     console.log('Document not found')
//                     }
//                 }
//             })
//         })

// // Add route with parameters to POST a new document with a title
// mongoDocumentsRouter.route('/title/:docTitle')
//         .post((req, res)=>{
//             let documentToUpload = new mongoDocument()
//             documentToUpload.title = req.params.docTitle
//             documentToUpload.save()
//             res.status(201).send(documentToUpload) 
//             })




// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.   
        
module.exports = router
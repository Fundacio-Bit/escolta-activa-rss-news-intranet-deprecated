var express = require("express");
var router = express();
var MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb");
var bodyParser = require("body-parser");
var db;

router.use( bodyParser.json() )  // to support JSON-encoded bodies

// Initialize connection once
MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    db = client.db("rss_fbit_db");
  }
);

// Reuse database object in request handlers
router.get("/terms", (req, res) => {
  var collection = db.collection("dictionary");
  collection
    .find(
      {},
      {
        _id: 1,
        term: 1,
        search_mode: 1,
      }
    )
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.json({ results: docs });
      }
    });
});

router.
  route("/terms").post((req, res) => {
    console.log("req.body: ", req.body)
    var collection = db.collection("dictionary");
    collection.insertOne(req.body, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
    res.json({ success: req.body._id });
  });

  router.
    route("/identifier/:documentId").delete((req, res) => {
      var id = req.params.documentId
      var collection = db.collection("dictionary");
      var query = { _id: new mongo.ObjectID(id) };
      // console.log("Deleting " + new mongo.ObjectID(id))
      collection.deleteOne(query, function (err, results) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      });
      res.json({ success: id });
  });

  module.exports = router;

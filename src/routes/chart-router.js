var express = require("express");
var router = express();
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var db;

router.use(bodyParser.json({ limit: "50mb", extended: true })); // to support JSON-encoded bodies

// Initialize connection once
MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    db = client.db("rss_fbit_db");
  }
);

// get all entries from news and filter by topic
router.get("/topics/barchart/:topic", (req, res) => {
  queryTopic = req.params.topic;
  var collection = db.collection("news");
  collection
    .find(
      {},
      {
        _id: 1,
        published: 1,
        extraction_date: 1,
        brand: 1,
        title: 1,
        topics: 1,
        link: 1,
        summary: 1,
        description: 1,
        section: 1,
        source_id: 1,
        source_name: 1,
      }
    )
    .sort({ published: -1 })
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        monthsWithNews = docs.map((doc) => {
          let aDate = new Date(doc.published);
          let monthsCatalan = [
            "gener",
            "febrer",
            "març",
            "abril",
            "maig",
            "juny",
            "juliol",
            "agost",
            "setembre",
            "octubre",
            "novembre",
            "desembre",
          ];
          return monthsCatalan[aDate.getMonth()] + "-" + aDate.getFullYear();
        });

        console.log(new Set(monthsWithNews));
        // console.log(docs);

        res.json({ results: docs });
      }
    });
});

module.exports = router;

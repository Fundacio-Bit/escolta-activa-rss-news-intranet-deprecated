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
router.get("/topics/barchart/month/:month/topic/:topic", (req, res) => {
  let queryTopic = req.params.topic.toLowerCase();
  //remove month leading zero
  let queryMonth =
    req.params.month[5] == "0"
      ? req.params.month.replace("-0", "-")
      : req.params.month;
  console.log(queryMonth);
  let mongoQuery = {};
  let mongoProjection = {
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
  };
  let collection = db.collection("news");

  const filterByTopic = (doc) => {
    if (
      doc.hasOwnProperty("topics") &&
      doc.topics.toLowerCase().indexOf(queryTopic) !== -1
    ) {
      return true;
    } else return false;
  };

  collection
    .find(mongoQuery, mongoProjection)
    .sort({ published: -1 })
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        let includedDocs =
          queryTopic === "all" ? docs : docs.filter(filterByTopic);
        let monthsWithNews = docs.map((doc) => {
          let aDate = new Date(doc.published);
          return aDate.getFullYear() + "-" + aDate.getMonth();
        });

        let monthsWithFilteredNews = includedDocs.map((doc) => {
          let aDate = new Date(doc.published);
          return aDate.getFullYear() + "-" + aDate.getMonth();
        });

        let uniqueMonthsWithNews = [...new Set(monthsWithNews)].reverse();
        let monthIndex = uniqueMonthsWithNews.indexOf(queryMonth);

        let countsPerMonth = new Array(uniqueMonthsWithNews.length).fill(0);

        monthsWithFilteredNews.forEach((monthWithFilteredNews) => {
          let monthPosition = uniqueMonthsWithNews.indexOf(
            monthWithFilteredNews
          );
          countsPerMonth[monthPosition] = countsPerMonth[monthPosition] + 1;
        });

        https: res.json({
          results: {
            months: uniqueMonthsWithNews,
            counts: countsPerMonth,
            selectedMonthIndex: monthIndex,
          },
        });
      }
    });
});

module.exports = router;

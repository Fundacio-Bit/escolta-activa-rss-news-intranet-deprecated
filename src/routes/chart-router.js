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
router.get("/topics/barchart/month/:month/topic/:topic/brand/:brand", (req, res) => {
  let queryTopic = req.params.topic.toLowerCase();
  var regex = new RegExp(".*" + req.params.brand + ".*");
  //remove month leading zero
  let queryMonth =
    req.params.month[5] == "0"
      ? req.params.month.replace("-0", "-")
      : req.params.month;
  let mongoQuery = 
    req.params.brand == "Tots" 
    ? {}
    : {brand :  regex};
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
        // if "all" is provided as query topic all docs will be included.
        // if not only docs that have the topic will
        let includedDocs =
          queryTopic === "all" ? docs : docs.filter(filterByTopic);

        // the x axis will cover all months with news
        let monthsWithNews = docs.map((doc) => {
          let aDate = new Date(doc.published);
          return aDate.getFullYear() + "-" + (aDate.getMonth() + 1);
        });

        // however not necessarily all months will be present in filtered news
        let monthsWithFilteredNews = includedDocs.map((doc) => {
          let aDate = new Date(doc.published);
          return aDate.getFullYear() + "-" + (aDate.getMonth() + 1);
        });

        // Array of month names (unique). It will be used as labels for the X-Axis
        let uniqueMonthsWithNews = [...new Set(monthsWithNews)].reverse();

        // The position of the query monthin the array of unique months
        let monthIndex = uniqueMonthsWithNews.indexOf(queryMonth);

        // Init an Array with 0s with length equal to the unique months Array
        let countsPerMonth = new Array(uniqueMonthsWithNews.length).fill(0);

        // Count apparitions per month in the monthsWithFilteredNews Array
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

var express = require("express");
var router = express();
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var db;
var newsContent = require("../components/utils/getNewsContent")
var deburr = require("lodash")

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

const getCategoryTerms = (text, category_terms) => {
  let matched_terms = []
  for (var i = 0; i < category_terms.length; i++) {
    // Check for exact match (search_mode should be "exacte")
    if (
      category_terms[i].search_mode === "exacte" &&
      new RegExp(
        "(\\W+|^)" + category_terms[i].term.toLowerCase + "(\\W+|$)",
        "g"
      ).test(text.toLowerCase())
    ) {
      matched_terms.push(category_terms[i].term);
    }
    // Check for partial match (search_mode should be "subcadena")
    else if (
      category_terms[i].search_mode === "subcadena" &&
      text.toLowerCase().includes(category_terms[i].term.toLowerCase())
    ) {
      matched_terms.push(category_terms[i].term);
    }
  }
  return matched_terms;
};

// get all entries from news in a daterange with no exclusion terms
router.get("/entries/yearmonth/:yearmonth", (req, res) => {
  const getNews = async (yearmonth) => {
    try {

      const collection_exclusion_terms = db.collection("dictionary_exclusion_terms");
      const exclusion_terms = await collection_exclusion_terms
      .find(
        {
        },
        {
          _id: 1,
          term: 1,
          search_mode: 1,
        }
      ).toArray();
      
      queryMonth = yearmonth.split("-")[1];
      queryYear = yearmonth.split("-")[0];
      var startDate = new Date(parseInt(queryYear), parseInt(queryMonth) - 1, 1);
      var endDate = new Date(parseInt(queryYear), parseInt(queryMonth), 1);
      var collection = db.collection("news");
      collection
        .find(
          {
            published: {
              $gte: startDate,
              $lt: endDate,
            },
          },
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
            // "selected": 1,
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
            var exclusion_terms_list = exclusion_terms.map(function(obj) {
              return obj.term;
            });
            var news_filtered = exclusion_terms_list.length > 0 
             ? docs.filter(obj => {
                const concatenatedTexts = deburr(newsContent.getText(obj));
                // Regexp to replace multiple spaces, tabs, newlines, etc with a single space.
                const has_exclusion_term = exclusion_terms_list.some( exclusion_term => concatenatedTexts.includes(deburr(exclusion_term.replace(/\s\s+/g, ' '))));
                return !has_exclusion_term
              })
            : docs
            res.json({ results: news_filtered });
          }
        });
      } catch (error) {
        console.log(err);
        res.status(500).send(err);
      } 
    };
    getNews(req.params.yearmonth);
});

// get all entries from news in a daterange with no exclusion terms
router.get("/entriesWithCategory/yearmonth/:yearmonth", (req, res) => {
  const getNews = async (yearmonth) => {
    try {

      const collection_exclusion_terms = db.collection("dictionary_exclusion_terms");
      const exclusion_terms = await collection_exclusion_terms
      .find(
        {
        },
        {
          _id: 1,
          term: 1,
          alias: 1,
          modification_date: 1,
        }
      ).toArray();
      
      const collection_dictionary = db.collection("dictionary");
      const terms = await collection_dictionary
      .find(
        {
        },
        {
          _id: 1,
          term: 1,
          search_mode: 1,
        }
      ).toArray();

      const collection_dictionary_covid = db.collection("dictionary_covid");
      const terms_covid = await collection_dictionary_covid
      .find(
        {
        },
        {
          _id: 1,
          term: 1,
          search_mode: 1,
        }
      ).toArray();

      const collection_dictionary_airlines = db.collection("dictionary_airlines");
      const terms_airlines = await collection_dictionary_airlines
      .find(
        {
        },
        {
          _id: 1,
          term: 1,
          search_mode: 1,
        }
      ).toArray();

      queryMonth = yearmonth.split("-")[1];
      queryYear = yearmonth.split("-")[0];
      var startDate = new Date(parseInt(queryYear), parseInt(queryMonth) - 1, 1);
      var endDate = new Date(parseInt(queryYear), parseInt(queryMonth), 1);
      var collection = db.collection("news");
      collection
        .find(
          {
            published: {
              $gte: startDate,
              $lt: endDate,
            },
          },
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
            // "selected": 1,
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
      
            var exclusion_terms_list = exclusion_terms.map(function(obj) {
              return obj.term;
            });
            var news_filtered = exclusion_terms_list.length > 0 
             ? docs.filter(obj => {
                const concatenatedTexts = deburr(newsContent.getText(obj));
                // Regexp to replace multiple spaces, tabs, newlines, etc with a single space.
                const has_exclusion_term = exclusion_terms_list.some( exclusion_term => concatenatedTexts.includes(deburr(exclusion_term.replace(/\s\s+/g, ' '))));
                return !has_exclusion_term
              })
            : docs
            news_filtered.map((doc) => {
              let categories = [];
              const concatenatedTexts = newsContent.getText(doc);
              const categoryTerms = getCategoryTerms(concatenatedTexts, terms);
              if ( categoryTerms.length > 0 ) {
                categories.push({"name": "tourism", "terms": categoryTerms});
              }
              const categoryTermsCovid = getCategoryTerms(concatenatedTexts, terms_covid);
              if ( categoryTerms.length > 0 && categoryTermsCovid.length > 0 ) {
                const terms = categoryTermsCovid.concat(categoryTerms);
                categories.push({"name": "covid-turisme", "terms": terms});
              }
              const categoryTermsAirlines = getCategoryTerms(concatenatedTexts, terms_airlines);
              if (categoryTermsAirlines.length > 0) {
                categories.push({"name": "airline", "terms": categoryTermsAirlines});
              }
              // console.log("categories: ", categories)
              doc.category = categories;
              return doc;
            })

            res.json({ results: news_filtered });
          }
        });
      } catch (error) {
        console.log(err);
        res.status(500).send(err);
      } 
    };
    getNews(req.params.yearmonth);
});

// get all entries from news in a daterange for brand
router.get("/entries/yearmonth/:yearmonth/brand/:brand", (req, res) => {
  const getNews = async (yearmonth, brand) => {
    try {
      queryMonth = yearmonth.split("-")[1];
      queryYear = yearmonth.split("-")[0];
      var startDate = new Date(parseInt(queryYear), parseInt(queryMonth) - 1, 1);
      var endDate = new Date(parseInt(queryYear), parseInt(queryMonth), 1);
      var regex = new RegExp(".*" + brand + ".*");
      let mongoQuery = 
        req.params.brand == "Tots" 
        ? {
          published: {
            $gte: startDate,
            $lt: endDate,
          }
        }
        : {published: {
            $gte: startDate,
            $lt: endDate,
          },
          brand : regex};
      var collection = db.collection("news");
      collection
        .find(
          mongoQuery,
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
            // "selected": 1,
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
            res.json({ results: docs });
          }
        });
    

    } catch (error) {
      console.log(err);
      res.status(500).send(err);
    } 
  };
  getNews(req.params.yearmonth, req.params.brand);
  
});

// get all entries from news in a daterange with exclusion terms
router.get("/exclusion-entries/yearmonth/:yearmonth", (req, res) => {
  const getNews = async (yearmonth) => {
    try {

      const collection_terms = db.collection("dictionary_exclusion_terms");
      const exclusion_terms = await collection_terms
      .find(
        {
        },
        {
          _id: 1,
          term: 1,
          search_mode:1,
        }
      ).toArray();

      queryMonth = req.params.yearmonth.split("-")[1];
      queryYear = req.params.yearmonth.split("-")[0];
      var startDate = new Date(parseInt(queryYear), parseInt(queryMonth) - 1, 1);
      var endDate = new Date(parseInt(queryYear), parseInt(queryMonth), 1);
      var collection = db.collection("news");
      collection
        .find(
          {
            published: {
              $gte: startDate,
              $lt: endDate,
            },
          },
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
            // "selected": 1,
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

            var exclusion_terms_list = exclusion_terms.map(function(obj) {
              return obj.term;
            });
            var news_filtered = exclusion_terms_list.length > 0 
              ? docs.filter(obj => {
                const concatenatedTexts = newsContent.getText(obj);
                // return !exclusion_terms_list.some(concatenatedTexts.includes.bind(concatenatedTexts))
                return exclusion_terms_list.some( exclusion_term => concatenatedTexts.includes(deburr(exclusion_term.replace(/\s\s+/g, ' '))) )
              })
            : []
            res.json({ results: news_filtered });
          }
        });
      } catch (error) {
        console.log(err);
        res.status(500).send(err);
      } 
    };
    getNews(req.params.yearmonth);
});

// Add route without parameters
router.
  route("/news").post((req, res) => {
    var collection = db.collection("news");
    delete req.body._id;
    req.body.published = new Date(req.body.published);
    collection.insertOne(req.body, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
    res.json({ success: req.body._id });
  });

// Add route with parameters and different CRUD operations (GET, DELETE and PUT)
router
  .route("/identifiers/:documentIds").delete((req, res) => {
    var ids = req.params.documentIds.split(',')
    var collection = db.collection("news");
    ids.forEach(id => {
      var query = { _id: new mongo.ObjectID(id) };
      collection.deleteOne(query, function (err, results) {
        // console.log("Deleting " + new mongo.ObjectID(id))
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      });
    });
    res.json({ success: ids });
  });


  // // Add route with parameters and different CRUD operations (GET, DELETE and PUT)
// router
//   .route("/identifier/:documentId")
//   .get((req, res) => {
//     var o_id = new mongo.ObjectID(req.params.documentId);

//     var collection = db.collection("news");
//     collection.find({ _id: o_id }).toArray((err, docs) => {
//       if (err) {
//         console.log("error: " + err);
//         res.status(500).send(err);
//       } else {
//         res.json({ results: docs });
//       }
//     });
//   })
//   .delete((req, res) => {
//     var collection = db.collection("news");
//     var query = { _id: new mongo.ObjectID(req.params.documentId) };
//     collection.deleteOne(query, function (err, results) {
//       if (err) {
//         console.log(err);
//         res.status(500).send(err);
//       } else {
//         res.json({ success: req.params.documentId });
//       }
//     });
//   });

  // ######## UPDATE SELECTED ##############    

  router.route('/identifier/:documentId/selected/:selected')
  .put((req, res) => {

      var collection = db.collection("news");
      var query = {
        '_id': new mongo.ObjectID(req.params.documentId)
      };
      var newvalues = {
        $set: {
          selected: (req.params.selected === 'true')
        }
      };
      collection.updateOne(query, newvalues, function (err, results) {
          if (err)
            {
              console.log(err)
              res.status(500).send(err)
            }
            else {
              res.json({
                  success: req.params.documentId
                })
            }
        })
  })

// ######## UPDATE TOPICS ##############
// Add route with parameters and different CRUD operations (GET, DELETE and PUT)
router.route("/identifier/:documentId/topics/:topics").put((req, res) => {
  var collection = db.collection("news");
  var query = { _id: new mongo.ObjectID(req.params.documentId) };
  var topicsToAssign =
    req.params.topics == " " ? "void_topics_string" : req.params.topics;
  var updatedTopics =
    topicsToAssign === "void_topics_string"
      ? { $unset: { topics: "" } }
      : { $set: { topics: topicsToAssign } };

  collection.updateOne(query, updatedTopics, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json({ success: req.params.documentId });
    }
  });
});

// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.

// get all entries from exclusion terms
router.get("/exclusion-entries", (req, res) => {
  var collection = db.collection("dictionary_exclusion_terms");
  collection
    .find(
      {
      },
      {
        _id: 1,
        term: 1,
        alias: 1,
        modification_date: 1,
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

module.exports = router;

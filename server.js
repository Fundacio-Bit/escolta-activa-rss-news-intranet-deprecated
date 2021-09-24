//Express is a routing and middleware web framework that has minimal functionality of its own.
//An Express application is essentially a series of middleware function calls.

const express = require("express");
const path = require("path");

const app = express();

// *************************************************
// *************** STATIC FILES ********************
// *************************************************

// To serve static files (images, CSS and JS) from a directory named public.
// It allows to load the files that are in the public directory. Examples:
// http://localhost:8000/static/images/my_image.jpg
// http://localhost:8000/static/css/style.css
// several directories can be used adding new equivalent sentences

app.use("/", express.static(path.join(__dirname, "build")));

// *************************************************
// *************** REST API ************************
// *************************************************

var newsRouter = require("./src/routes/news-router");

app.use("/rss-news", newsRouter);

var sourcesRouter = require("./src/routes/sources-router");

app.use("/rss-sources", sourcesRouter);

var topicsRouter = require("./src/routes/topics-router");

app.use("/rss-topics", topicsRouter);

var discardedNewsRouter = require("./src/routes/discarded-news-router");

app.use("/rss-discarded-news", discardedNewsRouter);

var chartRouter = require("./src/routes/chart-router");

app.use("/rss-chart", chartRouter);

var covidTourismRouter = require("./src/routes/covid-tourism-router");

app.use("/rss-covid-tourism", covidTourismRouter);

var airCompaniesRouter = require("./src/routes/air-companies-router");

app.use("/rss-air-companies", airCompaniesRouter);

var dictionaryRouter = require("./src/routes/dictionary-router");

app.use("/rss-dictionary", dictionaryRouter);

// *************************************************
// *************** ROUTING *************************
// *************************************************

// Get the index.html from the build folder
// It will execute the bundle.js file on the client
app.get("/", (req, res) => res.render("build/index"));

// *************************************************
// *************** SERVER **************************
// *************************************************
// Server start
// "ESCOLTA_ACTIVA_LOCAL_ENV" in process.env
//   ? console.log("*****Running in local PC*****")
//   : console.log("*****Running in production*****");
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

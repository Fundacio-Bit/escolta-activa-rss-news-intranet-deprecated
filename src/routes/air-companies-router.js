var express = require("express");
var router = express();
var bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
router.use(bodyParser.json()); // to support JSON-encoded bodies
console.log("process.env[ESCOLTA_ACTIVA_LOCAL_PATH]", process.env["ESCOLTA_ACTIVA_LOCAL_PATH"]);

var basePath =
  "ESCOLTA_ACTIVA_LOCAL_PATH" in process.env
    ? process.env["ESCOLTA_ACTIVA_LOCAL_PATH"]
    : "/home/ubuntu/fbit_projects/escolta_activa";

var foldersBasePath =
  "ESCOLTA_ACTIVA_LOCAL_PATH" in process.env
    ? process.env["ESCOLTA_ACTIVA_LOCAL_PATH"] + "/files/output/rss_news/sector_aeri"
    : "/data-mongo/files/output/rss_news/sector_aeri";

// get all available folders
router.get("/folders", (req, res) => {
  //joining path of directory
  // const directoryPath = path.join(__dirname, "Documents");
  //passsing directoryPath and callback function
  fs.readdir(foldersBasePath, function (err, contents) {
    //handling error
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      const isCsvFile = (name) => {
        return name.indexOf(".csv") > 0;
      };
      let csvFiles = contents.filter(isCsvFile);
      let csvFilesObjects = csvFiles.map((csvFile) => {
        // TODO: check if the file exists
        return {
          name: csvFile.replace("air_company_news_", "").replace(".csv", ""),
          path: path.join(foldersBasePath, csvFile),
        };
      });
      res.json({ results: csvFilesObjects });
    }
  });
});

// download CSV
router.get("/download-csv/week/:week", (req, res) => {
  // TODO check if file exists
  let week = req.params.week;

  file = fs.createReadStream(
    path.join(foldersBasePath, `air_company_news_${week}.csv`)
  );
  stat = fs.statSync(
    path.join(foldersBasePath, `air_company_news_${week}.csv`)
  );
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=air_company_news_${week}.csv`
  );
  file.pipe(res);
});

router.get("/generate-csv/week/:week", (req, res) => {
  let week = req.params.week;
  console.log("Generate CSV for week ", week);
  try {
    // var result = require('child_process').execSync('node ' + basePath + '/covid-tourism-rss-news-reporting/main.js --date ' + week + ' --mode dev').toString();
    var result = require("child_process")
      .execSync(
        "node " +
          basePath +
          "/covid-tourism-rss-news-reporting/main.js --date " +
          week +
          " --mode prod"
      )
      .toString();
    res.json({ results: result });
  } catch (error) {
    console.log(error.status + ": " + error.message);
    console.log(error.stderr.toString());
    console.log(error.stdout.toString());
    res.json({ error: error.stdout.toString() });
  }
});

module.exports = router;

var express = require("express");
var router = express();
var bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

router.use(bodyParser.json()); // to support JSON-encoded bodies
var basePath =
  "ESCOLTA_ACTIVA_LOCAL_PATH" in process.env
    ? process.env["ESCOLTA_ACTIVA_LOCAL_PATH"]
    : '.';
var foldersBasePath =
  "ESCOLTA_ACTIVA_LOCAL_PATH" in process.env
    ? process.env["ESCOLTA_ACTIVA_LOCAL_PATH"] + "/files/output/rss_news/covid_tourism"
    : null;
console.log('foldersBasePath: ' + foldersBasePath);
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
      const isZipFile = (name) => {
        return name.indexOf(".zip") > 0;
      };
      let zipFiles = contents.filter(isZipFile);
      let zipFilesObjects = zipFiles.map((zipFile) => {
        // TODO: check if the file exists
        return {
          name: zipFile
            .replace("escolta_activa_rss_news_covid_tourism_", "")
            .replace(".zip", ""),
          path: path.join(foldersBasePath, zipFile),
        };
      });
      res.json({ results: zipFilesObjects });
    }
  });
});

// download ZIP
router.get("/download-zip/week/:week", (req, res) => {
  // TODO check if file exists
  let week = req.params.week;

  file = fs.createReadStream(
    path.join(
      foldersBasePath,
      `escolta_activa_rss_news_covid_tourism_${week}.zip`
    )
  );
  stat = fs.statSync(
    path.join(
      foldersBasePath,
      `escolta_activa_rss_news_covid_tourism_${week}.zip`
    )
  );
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=escolta_activa_rss_news_covid_tourism_${week}.zip`
  );
  file.pipe(res);
});

router.get("/generate-zip/week/:week", (req, res) => {
  let week = req.params.week;
  console.log("Generate ZIP for week ", week);
  try {
    var result = require('child_process').execSync('node ' + basePath + '/covid-tourism-rss-news-reporting/main.js --date ' + week + ' --mode dev').toString();
    res.json({results: result})
  } 
  catch (error) {
    console.log(error.status + ': ' + error.message);
    console.log(error.stderr.toString());
    console.log(error.stdout.toString());
    res.json({error: error.stdout.toString()})
  }
});

module.exports = router;

var express = require("express");
var router = express();
var bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

router.use(bodyParser.json()); // to support JSON-encoded bodies

var foldersBasePath =
  "ESCOLTA_ACTIVA_LOCAL_ENV" in process.env
    ? "C:/Users/omoya/Documents/FBIT/proyectos/EscoltaActiva/COVID-turismo/output"
    : "C:/Users/omoya/Documents/FBIT/proyectos/EscoltaActiva/COVID-turismo/output";

// get all available folders
router.get("/folders", (req, res) => {
  //joining path of directory
  // const directoryPath = path.join(__dirname, "Documents");
  //passsing directoryPath and callback function
  fs.readdir(foldersBasePath, function (err, folders) {
    //handling error
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      let zipFiles = folders.map((folder) => {
        // TODO: check if the file exists
        return {
          name: folder,
          path: path.join(foldersBasePath, folder, "rss_news", "rss_news.zip"),
        };
      });
      res.json({ results: zipFiles });
    }
  });
});

// download ZIP
router.get("/download-zip/week/:week", (req, res) => {
  // TODO check if file exists
  let week = req.params.week;

  file = fs.createReadStream(
    path.join(foldersBasePath, week, "rss_news", "rss_news.zip")
  );
  stat = fs.statSync(
    path.join(foldersBasePath, week, "rss_news", "rss_news.zip")
  );
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=rss_news_${week}.zip`
  );
  file.pipe(res);
  // else
  //   res.json {error: "No existeix l'arxiu zip pel 'yearmonth': #{yearmonth}"}
});

// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.

module.exports = router;

// # ------------------------------------------------
// # EXTRAE report ZIP de Twitter de un mes concreto
// # ------------------------------------------------
// router.get '/reports/twitter/zip/yearmonth/:yearmonth', (req, res) ->
//     yearmonth = req.params.yearmonth
//     if not /^\d\d\d\d-\d\d$/.test(yearmonth) then return res.json {error: "Format de 'yearmonth' invàlid. Format vàlid: 'YYYY-MM'."}

//     zips = utils.get_zip_files(config.context.output_base_dir)  # sacamos los paths de los zip's que existen actualmente
//     if yearmonth in (x for x of zips)
//         file = fs.createReadStream zips[yearmonth]
//         stat = fs.statSync zips[yearmonth]
//         res.setHeader('Content-Length', stat.size)
//         res.setHeader('Content-Type', 'application/zip')
//         res.setHeader('Content-Disposition', "attachment; filename=escolta_activa_#{yearmonth}.zip")
//         file.pipe(res)
//     else
//         res.json {error: "No existeix l'arxiu zip pel 'yearmonth': #{yearmonth}"}

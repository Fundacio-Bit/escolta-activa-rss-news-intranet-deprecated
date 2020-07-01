var express = require("express");
var router = express();
var bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

router.use(bodyParser.json()); // to support JSON-encoded bodies

// get all available folders
router.get("/folders", (req, res) => {
  let foldersBasePath =
    "ESCOLTA_ACTIVA_LOCAL_ENV" in process.env
      ? "C:/Users/omoya/Documents/FBIT/proyectos/EscoltaActiva/COVID-turismo/output"
      : "C:/Users/omoya/Documents/FBIT/proyectos/EscoltaActiva/COVID-turismo/output";

  //joining path of directory
  // const directoryPath = path.join(__dirname, "Documents");
  //passsing directoryPath and callback function
  fs.readdir(foldersBasePath, function (err, files) {
    //handling error
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(files);
      res.send("Done");
    }
  });
});

// // TODO: add timeout to responses:
// // https://stackoverflow.com/questions/21708208/express-js-response-timeout
// // So far we have added a timeout to the whole cron job, but not to the responses of every API call.

module.exports = router;

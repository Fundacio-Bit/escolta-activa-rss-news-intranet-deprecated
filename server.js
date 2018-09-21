//Express is a routing and middleware web framework that has minimal functionality of its own.
//An Express application is essentially a series of middleware function calls.

const express = require('express')
const path = require('path')


const app = express()

// *************************************************
// *************** STATIC FILES ********************
// *************************************************

// To serve static files (images, CSS and JS) from a directory named public.
// It allows to load the files that are in the public directory. Examples:
// http://localhost:8000/static/images/my_image.jpg
// http://localhost:8000/static/css/style.css
// several directories can be used adding new equivalent sentences

app.use('/', express.static(path.join(__dirname, 'build')))

// *************************************************
// *************** REST API ************************
// *************************************************

var newsRouter = require('./src/routes/news-router')

app.use('/rss-news', newsRouter)

var sourcesRouter = require('./src/routes/sources-router')

app.use('/rss-sources', sourcesRouter)

// *************************************************
// *************** TEMPLATE ENGINE *****************
// *************************************************

// // Define template engine used to render HTML (Handlebars)
// //---------------------------------------------------------
// app.engine('handlebars', handlebars({defaultLayout: 'main'}))
// app.set('view engine', 'handlebars')

// *************************************************
// *************** ROUTING *************************
// *************************************************

// Get the index.html from the build folder
// It will execute the bundle.js file on the client
app.get('/', (req, res) => res.render('build/index'))


// *************************************************
// *************** SERVER **************************
// *************************************************
// Server start
const port = process.env.PORT || 8000
app.listen(port, () => {console.log(`http://localhost:${port}`)})
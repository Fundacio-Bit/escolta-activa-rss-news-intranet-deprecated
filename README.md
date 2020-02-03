# rss_intranet

RSS intranet
============


### Objective

Intranet to manage news extraction from RSS feeds.

### Architecture

- NodeJS (server with REST API)
- React (frontend with client-side rendering)
- MongoDB (data layer)


### Usage
**Clone this repository**
```
git clone https://eaguado_fbit@bitbucket.org/eaguado_fbit/rss_intranet.git
```

**Install dependencies**
```
npm install
```

**Build for production**

The following line should be uncommented in "webpack.config.js" to generate the bundle.js file for production:

#### **`webpack.config.js`**
```javascript
new webpack.optimize.UglifyJsPlugin()
```

Then write the building command in the console:
```
npm run build
```

This will generate a minimized bundle.js file on the `build` folder.

Execute this command after doing code modifications.

**Start the Node server**
```
node server.js
```
Open http://localhost:8000 in your browser.

Static files are served from the `build` folder, project JavaScript files are bundled from the `src` folder.

A basic GET router call example is 
http://localhost:8000/rss-news/entries

POST and DELETE operations can be tested using [POSTMAN](https://www.getpostman.com/)

**More info**

If you want further information about the project write to turisme@fundaciobit.org

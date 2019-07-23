# rss_intranet

RSS intranet
============

Project including:

- React with Webpack and Babel setup. Includes JavaScript and CSS bundling.
- A node server where operative URLs are defined.
- A set of routers updating and exposing data from MongoDB.


### Objective

To create an intranet for RSS managements, based on Node (server with REST API) and React (frontend with client-side rendering) and MongoDB (data layer). 

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
```
npm run build
```

This will generate a minimized bundle.js file on the `build` folder.

**Start the Node server**
```
node server.js
```
Open http://localhost:8000 in your browser.

Static files are served from the `build` folder, project JavaScript files are bundled from the `src` folder.

The basic router can be accesed from http://localhost:8000/RSSDocs/

POST and DELETE operations can be tested using [POSTMAN] (https://www.getpostman.com/)

**More info**

Detailed docuemntation to understand this project template can be found at: 

https://docs.google.com/document/d/11Bb2A3G1uX2eX--Kt4e_zgW8VwoMV4mq2jJ1kSJHdec/edit?usp=sharing


**DEBUG**
 
The following line in "webpack.config.js" should be uncommented to generate the bundle.js file for production:

```
new webpack.optimize.UglifyJsPlugin()
```

 
# RSS intranet

### Objective

Intranet to manage news extraction from RSS feeds.

### Architecture

- NodeJS (server with REST API)
- React (frontend with client-side rendering)
- MongoDB (data layer)

### Usage

Create environment variable ESCOLTA_ACTIVA_LOCAL_PATH=<path_to_escolta_activa_dir>

**Clone this repository**

```
git clone https://eaguado_fbit@bitbucket.org/eaguado_fbit/rss_intranet.git
```

**Install dependencies**

```
npm install
```

**Build**

Write the building command in the console for **development mode**:

```
npm run build:dev
```

This will generate a minimized bundle.js file on the `build` folder and start node server application.

Or write the building command in the console for **production mode**:

```
npm run build:prod
```

This will generate a minimized bundle.js file on the `build` folder. Production mode does an uglify (minification) and uses the ExtractText Plugin that separates the bundle into multiple files.

Then start the node server:

```
npm run start
```

Open http://localhost:8000 in your browser.

Static files are served from the `build` folder, project JavaScript files are bundled from the `src` folder.

A basic GET router call example is
http://localhost:8000/rss-news/entries

POST and DELETE operations can be tested using [POSTMAN](https://www.getpostman.com/)

**More info**

If you want further information about the project write to turisme@fundaciobit.org

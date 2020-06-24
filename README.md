# Advanced JSON Server - Updated

This is a model for an advanced JSON server which can actually handle nested requests. This version has been updated to increase the simplicity of deployment. 

&nbsp;
## Installation
You can install JSON Server either as a pnpm or npm package:

```bash
pnpm install --save json-server
```

&nbsp;
## Methods

* GET
* POST
* PATCH
* PUT
* DELETE

&nbsp;
## Start

```bash
npm start
```

&nbsp;
## Adding Routes
To add routes, add a line inside `./src/db.json` detailing the incoming request path and the file that this should then be directed to (you will need to create a new JSON file also).

Note that the key should be the exact URL coming in (must start with `/`) and the value should be a single word with a `/` before it.

Next go to `./src/server.js` and create a constant to require the file, and add that object then to the `routeObj`. 

> Note: You should set up a new route/ JSON file for each level you wish to nest data. Otherwise the edit functions won't work.

&nbsp;
## Editing Data
At present, the server doesn't support lasting changes to the data - as any changes you make are not made to the JSON files in the `dbRouteData` directory. So long as the server is running, your changes will be retained, when you restart the server the data will be refreshed to the defaults contained within the `dbRouteData` directory.

&nbsp;
## Structure

### Main File (Don't alter)
This file does not need to be edited for the server to work, even when adding new routes. The only time you may wish to edit is if you want to include additional middleware.
```js
// ./src/server.js

const jsonServer = require('json-server');
const { getRoutes, getRouteObjects } = require('./db');

const router = jsonServer.router(getRouteObjects());
const middlewares = jsonServer.defaults();
const port = 1234;
const server = jsonServer.create();

server.use(jsonServer.rewriter(getRoutes()));
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```
>Note: The order of the server.use statements **is important**, if you don't include `server.use(jsonServer.rewriter(getRoutes()));` before `server.use(router);`, the router won't work.


&nbsp;
### Route File - (Change to accommodate new routes)
This file will need to be edited as new routes are defined. You should first create the new databse JSON file, import it with a require statement and add the constant to the list of routeObjects. Finally, specify the route that should 

```js
const test = require('./dbRouteData/test.json');

function getRoutes() {
  return {
    "/api/v1/test": "/test"
    // Add new paths here - note that there must be a '/' at the beginning of the key and value, and the value should be a single word which matches the variable name you used to import the related database file.
  };
}

function getRouteObjects() {
  return {
    test
  };
}

module.exports = { getRoutes, getRouteObjects }
```
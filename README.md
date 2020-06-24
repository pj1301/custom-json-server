# Advanced JSON Server - Updated

This is a model for an advanced JSON server which can actually handle nested requests. This version has been updated to increase the simplicity of deployment. 

&nbsp;
## Installation
Install the required packages either with npm or pnpm:

```bash
pnpm i

# OR

npm i
```

This will install `json-server` and `nodemon` which will allow auto-reload on changes to the dev-server.

&nbsp;
## Start
If the routes are final and you're ready to work on the front end project, run:

```bash
npm start
```

If you need to debug the routes, use:

```bash
npm run dev
```

&nbsp;
## Adding Routes
To add routes, add a line inside `./src/db.json` detailing the incoming request path and the file that this should then be directed to (you will need to create a new JSON file also). To make sure you can access open routes (e.g. `/api/v1/posts`) as well as queried data (e.g. `/api/v1/posts/:id`), you should always include two lines, one open, one with an `:id` path variable. Refer to the `./src/db.js` file for examples.

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

&nbsp;
## API Test Calls
The following methods are available on the JSON server
* GET
* POST
* PATCH
* PUT
* DELETE

Below are provided some example API calls which you can use on the test data to experiment/confirm the server is working. All requests have been line-broken for easier reading.

&nbsp;
### GET
```bash
# test data by id (1)
curl --location --request GET 'http://localhost:1234/api/v1/test/1' \
--header 'Content-Type: application/json'

# all test data 
curl --location --request GET 'http://localhost:1234/api/v1/test' \
--header 'Content-Type: application/json'
```

&nbsp;
### POST
```bash
curl --location --request POST 'http://localhost:1234/api/v1/test' \
--header 'Content-Type: application/json' \
--data-raw '  { 
    "content": "Hello World Again!"
  }'
```

&nbsp;
### PATCH
```bash
curl --location --request PATCH 'http://localhost:1234/api/v1/test/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "Environmentally Challenged!",
    "date": "2020-06-24T15:54:38.172Z"
}'
```

&nbsp;
### PUT
```bash
curl --location --request PUT 'http://localhost:1234/api/v1/test/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "Hello World - This was a PUT request!"
}'
```

&nbsp;
### DELETE
```bash
curl --location --request DELETE 'http://localhost:1234/api/v1/test/3' \
--header 'Content-Type: application/json'
```

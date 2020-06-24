# Advanced JSON Server

This is a model for an advanced JSON server which can actually handle nested requests. 

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
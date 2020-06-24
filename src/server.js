const jsonServer = require('json-server');

const test = require('./dbRouteData/test.json');
// Add additional database JSON files here

const routes = require('./db.js');

const routeObj = { 
  test,
  // Add the object which represents new databse JSON files here
};
const router = jsonServer.router(routeObj);
const middlewares = jsonServer.defaults();
const port = 1234;
const server = jsonServer.create();

// Order is important - rewriter must come before router
server.use(jsonServer.rewriter(routes));
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const jsonServer = require('json-server');
const { getRoutes, getRouteObjects } = require('./db');

const router = jsonServer.router(getRouteObjects());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 1234;
const server = jsonServer.create();

server.use(jsonServer.rewriter(getRoutes()));
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
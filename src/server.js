const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
const db = require('./db.js');
const port = 1234;
server.use(jsonServer.router(db));

server.listen(port, () => {
  console.log(`JSON Server running on port ${port}`);
});

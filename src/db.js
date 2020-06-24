const test = require('./dbRouteData/test.json');

function getRoutes() {
  return {
    "/api/v1/test": "/test",
    "/api/v1/test/:id": "/test/:id"
    // Add new paths here - note that there must be a '/' at the beginning of the key and value, the value should go no further than a second level
  };
}

function getRouteObjects() {
  return {
    test
  };
}

module.exports = { getRoutes, getRouteObjects }

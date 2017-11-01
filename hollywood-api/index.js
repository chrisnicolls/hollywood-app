const hapi = require("hapi");

const server = new hapi.Server();

const routes = require("./routes");

server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    cors: true
  },
  router: {
    stripTrailingSlash: true
  }
});

server.route(routes);

server.start(err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at: ${server.info.uri}`);
});

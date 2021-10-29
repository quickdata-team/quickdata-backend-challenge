const { EventHttpRouter } = require("../lib/http-handler");

const usersRouter = require("./users");

const router = new EventHttpRouter({
  prefix: "api",
});

module.exports = (app) => {
  router.merge(usersRouter(app.context));
  return router;
};

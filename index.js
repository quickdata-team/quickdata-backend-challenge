/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { EventHttpHandler, EventHttpErrors } = require("./lib/http-handler");
const ServiceManager = require("./infra/services/service-manager");
const connection = require("./infra/database/database.json");
const middleware = require("./middleware");
const routes = require("./routes");

module.exports.handler = async (event) => {
  const app = await EventHttpHandler.from(event);
  try {
    const serviceManager = new ServiceManager(connection);
    app.on("internalError", (err) => console.error("internalError:", err));
    app.registerContext("connection", connection);
    app.registerContext("serviceManager", serviceManager);
    app.addMiddleware(middleware);
    app.registerRouter(routes(app));

    const response = await app.handler();
    const responseLamba = response.toLambda();
    return responseLamba;
  } catch (error) {
    console.error(error);
    const response = EventHttpErrors.InternalServerError("Erro interno");
    return response.toLambda();
  }
};

/* eslint-disable comma-dangle */
const { EventHttpRouter, response } = require("../lib/http-handler");

module.exports = ({ serviceManager }) => {
  const router = new EventHttpRouter({ prefix: "/users" });
  const service = serviceManager.userService;

  router.get("/", async () => {
    const data = await service.getAll();
    return response(200, { data });
  });

  router.post("/", async ({ bodyParsed }) => {
    const data = await service.create(bodyParsed);
    return response(201, { data });
  });

  return router;
};

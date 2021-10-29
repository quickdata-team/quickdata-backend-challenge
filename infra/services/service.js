const path = require("path");

module.exports = class Service {
  constructor(serviceManager) {
    this.serviceManager = serviceManager;
  }

  get connection() {
    return this.serviceManager.connection;
  }

  get path() {
    return path.join("infra", "database", "database.json");
  }
};

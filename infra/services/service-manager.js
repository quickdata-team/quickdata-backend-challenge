const UserService = require("./user-service");

const SERVICES = Symbol("services");

module.exports = class ServiceManager {
  constructor(connection) {
    this.connection = connection;
    this[SERVICES] = {};
  }

  getService(name, factory = () => {}) {
    if (!this[SERVICES][name]) {
      this[SERVICES] = factory();
    }

    return this[SERVICES];
  }

  get userService() {
    return this.getService("user", () => new UserService(this));
  }

  async flush() {
    if (this.connection) {
      return this.connection.flush();
    }

    return Promise.resolve();
  }
};

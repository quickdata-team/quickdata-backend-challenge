/* eslint-disable no-param-reassign */
const Service = require("./service");
const { promisify } = require("util");

const writeFilePromise = promisify(require("fs").writeFile);

module.exports = class UserService extends Service {
  constructor(serviceManager) {
    super(serviceManager);
  }

  getAll() {
    const { users } = this.connection;
    return users;
  }

  async create(user) {
    const database = this.connection;
    database.users.push(user);
    await writeFilePromise(this.path, JSON.stringify(database));
    return database.users;
  }
};

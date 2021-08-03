const Sequelize = require("sequelize");
const db = require("../utils/pgDB");

const TodoPgSchema = db.define("TodoItems", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
});

const testSchema = db.define("TodoItems", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
});
module.exports = { TodoPgSchema, testSchema };

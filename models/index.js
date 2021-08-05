const Sequelize = require("sequelize");
const db = require("../utils/pgDB");

const Device = db.define("Device", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
});

const Things = db.define("Things", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
});

module.exports = { Device, Things };

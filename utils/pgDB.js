const { Sequelize } = require("sequelize");

const db = new Sequelize("sls_test", "postgres", "admin123", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;

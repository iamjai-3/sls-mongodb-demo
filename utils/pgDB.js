const { Sequelize } = require("sequelize");

const db = new Sequelize("sls_test", "postgres", "admin123", {
  host: "192.168.1.105",
  dialect: "postgres",
});

module.exports = db;

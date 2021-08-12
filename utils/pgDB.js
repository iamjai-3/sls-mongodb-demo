const { Sequelize } = require("sequelize");

const db = new Sequelize("sls_test", "postgres", "admin123", {
  host: "192.168.1.105",
  dialect: "postgres",
});

// const db = new Sequelize(
//   "postgres://postgres:admin123@192.168.1.105:5432/sls_test"
// );

module.exports = db;

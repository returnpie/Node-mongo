const Sequelize = require("sequelize");

const sequelize = new Sequelize("node", "root", "2pie1363", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

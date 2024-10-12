const { Sequelize } = require("sequelize");

// Configura la conexión a SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Ubicación del archivo SQLite
});

module.exports = sequelize;

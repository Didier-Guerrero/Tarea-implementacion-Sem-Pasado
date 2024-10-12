const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Asegúrate de que esta ruta es correcta

const Cliente = sequelize.define(
  "Cliente",
  {
    id_cli: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_cli: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // No uses createdAt y updatedAt
    tableName: "clientes",
  }
);

module.exports = Cliente;

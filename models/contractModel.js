const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cliente = require("./clientModel"); // Relación con el modelo Cliente

const Contrato = sequelize.define(
  "Contrato",
  {
    id_con: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cli: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: "id_cli",
      },
    },
    nombre_con: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    monto_con: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_con: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "clientes_contratos",
  }
);

module.exports = Contrato;

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Recebivel = sequelize.define("Recebivel", {
  "status": {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ["paid", "waiting_funds"]
  },
  dataPagamento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: "Recebiveis"
});

module.exports = Recebivel;
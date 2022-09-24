const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const syncModel = require("./sync");

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

syncModel(Recebivel);

module.exports = Recebivel;
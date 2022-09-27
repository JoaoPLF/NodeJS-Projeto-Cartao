const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Transacao = sequelize.define("Transacao", {
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metodoPagamento: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ["credit_card", "debit_card"]
  },
  numeroCartao: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nomePortadorCartao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataValidadeCartao: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cvvCartao: {
    type: DataTypes.STRING(3),
    allowNull: false
  }  
}, {
  tableName: "Transacoes"
});

module.exports = Transacao;
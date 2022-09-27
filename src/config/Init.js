const { criarConexao, criarDataBase } = require("./database");

const Transacao = require("../models/Transacao.model");
const Recebivel = require("../models/Recebivel.model");
const syncModel = require("../utils/syncModel");

const iniciarConfiguracoes = async () => {
  await criarDataBase();
  await criarConexao();
  await syncModel(Transacao);
  await syncModel(Recebivel);
};

module.exports = { iniciarConfiguracoes };
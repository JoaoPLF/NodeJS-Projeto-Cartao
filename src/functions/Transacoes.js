const Transacao = require("../models/Transacao.model");

const criarTransacao = async ({ valor, descricao, metodoPagamento, numeroCartao, nomePortadorCartao, dataValidadeCartao, cvvCartao }) => {
  const novoNumeroCartao = separarUltimosDigitosCartao(numeroCartao);

  return await Transacao.create({
    valor, descricao, metodoPagamento, nomePortadorCartao, dataValidadeCartao, cvvCartao,
    numeroCartao: novoNumeroCartao
  });
};

const separarUltimosDigitosCartao = (numeroCartao) => {
  return parseInt(numeroCartao.toString().slice(-4));
}

module.exports = { criarTransacao };
const criaTransacao = async (valor, descricao, metodoPagamento, numeroCartao, nomePortadorCartao, dataValidadeCartao, cvvCartao) => {
  const Transacao = require("../models/Transacao");

  const novoNumeroCartao = separaUltimosDigitosCartao(numeroCartao);

  const transacao = await Transacao.create({ valor, descricao, metodoPagamento, nomePortadorCartao, dataValidadeCartao, cvvCartao,
    numeroCartao: novoNumeroCartao
  });
};

const separaUltimosDigitosCartao = (numeroCartao) => {
  return parseInt(numeroCartao.toString().slice(-4));
}

module.exports = { criaTransacao };
const { iniciarConfiguracoes } = require("./src/config/Init");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
iniciarConfiguracoes();

app.get("/transacoes", async (req, res) => {
  const Transacao = require("./models/Transacao");

  try {
    const transacoes = await Transacao.findAll();
    return res.send(transacoes);
  }
  catch (err) {
    return res.status(500).send("Falha em obter transacoes");
  }
});

app.get("/saldo", async (req, res) => {
  const { retornarSaldo } = require("./functions/Recebiveis");

  try {
    const saldo = await retornarSaldo();
    return res.send(saldo);
  }
  catch (err) {
    return res.status(500).send("Falha em obter saldo");
  }
});

app.post("/transacao", async (req, res) => {
  const { criarTransacao } = require("./functions/Transacoes");
  const { criarRecebivel } = require("./functions/Recebiveis");
  const { valor, descricao, metodoPagamento, numeroCartao, nomePortadorCartao, dataValidadeCartao, cvvCartao } = req.body;

  try {
    await criarTransacao(valor, descricao, metodoPagamento, numeroCartao, nomePortadorCartao, dataValidadeCartao, cvvCartao);
    await criarRecebivel(valor, new Date(), metodoPagamento);

    return res.send("Transacao realizada com sucesso!");
  }
  catch (err) {
    return res.status(400).send("Falha na transacao: " + err.message);
  }
});

app.listen(4000);

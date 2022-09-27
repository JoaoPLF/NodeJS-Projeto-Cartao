const { assert } = require("chai");
const { sequelize } = require("../src/config/database");
const { criarTransacao } = require("../src/functions/Transacoes");
const { criarRecebivel, retornarSaldo } = require("../src/functions/Recebiveis");

before(async () => {
  const { iniciarConfiguracoes } = require("../src/config/Init");
  await iniciarConfiguracoes();

  sequelize.query("START TRANSACTION");
});

describe("Testes", () => {
  it("falha no metodo de pagamento", async () => {
    try {
      await criarTransacao(500, "test", "a", 4568321252587896, "JOAO", new Date(), 123);
    }
    catch (err) {
      assert.instanceOf(err, Error);
    }
  });

  it("cria transacao e recebivel", async () => {
    const transacao1 = {
      valor: 500,
      descricao: "test",
      metodoPagamento: "debit_card",
      numeroCartao: 4568321252587896,
      nomePortadorCartao: "JOAO",
      dataValidadeCartao: new Date(),
      cvvCartao: 123
    };

    await criarTransacao({ ...transacao1 });
    await criarRecebivel({
      valor: transacao1.valor,
      metodoPagamento: transacao1.metodoPagamento,
      dataPagamento: new Date()
    });

    const transacao2 = {
      valor: 800,
      descricao: "test",
      metodoPagamento: "credit_card",
      numeroCartao: 4568321252587896,
      nomePortadorCartao: "JOAO",
      dataValidadeCartao: new Date(),
      cvvCartao: 123
    };

    await criarTransacao({ ...transacao2 });
    await criarRecebivel({
      valor: transacao2.valor,
      metodoPagamento: transacao2.metodoPagamento,
      dataPagamento: new Date()
    });
  });

  it("retorna saldo", async () => {
    const { available, waitingFunds } = await retornarSaldo();
    assert.equal(available[0].getDataValue("total"), (500*0.97));
    assert.equal(waitingFunds[0].getDataValue("total"), (800*0.95));
  });
});

after(async () => {
  sequelize.query("ROLLBACK");
});
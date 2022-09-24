const { Sequelize } = require("sequelize");
const { Client } = require("pg");
const { username, password, database, dialect, host, port } = require("./config.json");

(async () => {
  const client = new Client({
    user: username,
    password,
    host,
    port
  });

  await client.connect();

  try {
    const res = await client.query("SELECT datname FROM pg_catalog.pg_database");

    const exists = res.rows.reduce((result, current) => (result || current.datname === database) ? true : false, false);

    if (!exists) {
      await client.query("CREATE DATABASE projetoCartao");
    }
  }
  catch (err) {
    console.log(err);
  }

  await client.end();
})();

const sequelize = new Sequelize({ username, password, database, dialect, host, port });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexao bem-sucedida");
  }
  catch (err) {
    console.log("Falha na conexao", err);
  }
})();

module.exports = sequelize;
const syncModel = async (model) => {
  try {
    await model.sync();
    console.log(model.name + " sincronizado com sucesso.");
  }
  catch (err) {
    console.log("Falha na sincronizacao de " + model.name);
    console.log(err);
  }
};

module.exports = syncModel;
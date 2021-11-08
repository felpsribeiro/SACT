const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/db');

const basename = path.basename(__filename);
const config = envConfigs;
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  //create table if not exists...
  const init = async () => {
    await db[modelName].sync();
  };
  init();
  
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco estabelecida com sucesso.\n\n');
  } catch (error) {
    console.error('Não foi possível se conectar com o banco: ', error);
    console.log('********************************************');
  }
})();

module.exports = db;
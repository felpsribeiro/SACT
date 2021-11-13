const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/db');
require("dotenv").config();

const basename = path.basename(__filename);
const config = envConfigs;
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

const init = async () => {
  await db['Equipamento'].sync();
  await db['Paciente'].sync();
  await db['Profissional'].sync();
  await db['Consulta'].sync();
};
init();

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
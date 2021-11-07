require("dotenv").config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const config = {
  username,
  password,
  database,
  dialect: "postgres",
};

module.exports = config;
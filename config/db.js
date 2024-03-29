require("dotenv").config();

const database = process.env.DB_DATABASE;
const config = {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    }
  }
}

// const database = process.env.DB_DATABASE;
// const username = process.env.DB_USER;
// const password = process.env.DB_PASSWORD;
// const host = process.env.DB_HOST;
// const schema = process.env.DB_SCHEMA;

// const config = {
//   username,
//   password,
//   database,
//   host,
//   dialect: "postgres",
//   schema,
//   searchPath: schema,
//   dialectOptions: {
//     prependSearchPath: true,
//   }
// };

module.exports = config;
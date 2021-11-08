const express = require("express");
const handle = require("express-async-handler");
const validator = require("express-joi-validation").createValidator({});

const validators = require("./validators");
const controllers = require("./controllers");
const routes = express.Router();

// Pessoa
routes.get(
    "/pessoas",
    validator.query(validators.PessoaValidator),
    handle(controllers.PessoaController)
  );

module.exports = routes;
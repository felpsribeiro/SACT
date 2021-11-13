const express = require("express");
const handle = require("express-async-handler");
const validator = require("express-joi-validation").createValidator({});
const codErros = require("./util/codErros");

const validators = require("./validators");
const controllers = require("./controllers");
const routes = express.Router();


// Paciente 
routes.get(
  "/paciente",
  validator.query(validators.PacienteValidator.get),
  handle(controllers.PacienteController.get)
);
routes.post(
  "/paciente",
  validator.body(validators.PacienteValidator.post),
  handle(controllers.PacienteController.post)
);
routes.put(
  "/paciente",
  validator.body(validators.PacienteValidator.put),
  handle(controllers.PacienteController.put)
);
routes.delete(
  "/paciente", 
  validator.query(validators.PacienteValidator.destroy),
  handle(controllers.PacienteController.destroy)
);

// Profissional de Saude
routes.get(
  "/profissional",
  validator.query(validators.ProfissionalValidator.get),
  handle(controllers.ProfissionalController.get)
);
routes.post(
  "/profissional",
  validator.body(validators.ProfissionalValidator.post),
  handle(controllers.ProfissionalController.post)
);
routes.put(
  "/profissional",
  validator.body(validators.ProfissionalValidator.put),
  handle(controllers.ProfissionalController.put)
);
routes.delete(
  "/profissional", 
  validator.query(validators.ProfissionalValidator.destroy),
  handle(controllers.ProfissionalController.destroy)
);

// Equipamento
routes.get(
  "/equipamento",
  validator.query(validators.EquipamentoValidator.get),
  handle(controllers.EquipamentoController.get)
);
routes.post(
  "/equipamento",
  validator.body(validators.EquipamentoValidator.post),
  handle(controllers.EquipamentoController.post)
);
routes.put(
  "/equipamento",
  validator.body(validators.EquipamentoValidator.put),
  handle(controllers.EquipamentoController.put)
);
routes.delete(
  "/equipamento", 
  validator.query(validators.EquipamentoValidator.destroy),
  handle(controllers.EquipamentoController.destroy)
);

// Consulta
routes.get(
  "/consulta",
  validator.query(validators.ConsultaValidator.get),
  handle(controllers.ConsultaController.get)
);
routes.post(
  "/consulta",
  validator.body(validators.ConsultaValidator.post),
  handle(controllers.ConsultaController.post)
);
routes.put(
  "/consulta",
  validator.body(validators.ConsultaValidator.put),
  handle(controllers.ConsultaController.put)
);
routes.delete(
  "/consulta", 
  validator.query(validators.ConsultaValidator.destroy),
  handle(controllers.ConsultaController.destroy)
);

// Codigos de Erros
routes.get(
  "/codigos_erros",
  (req, res) => res.json(codErros)
);

module.exports = routes;
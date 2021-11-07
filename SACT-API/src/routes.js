const express = require("express");
const handle = require("express-async-handler");
const validator = require("express-joi-validation").createValidator({});

const controllers = require("./controllers");
const rules = require("./validators");

const routes = express.Router();

module.exports = routes;
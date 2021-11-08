const Joi = require('joi');

const schema = Joi.object().keys({
    cpf: Joi.string()
});

module.exports = schema;
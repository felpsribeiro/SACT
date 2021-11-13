const Joi = require('joi');

const get = Joi.object().keys({
    cpf: Joi.string().length(11),
});

const post = Joi.object().keys({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().max(255).required(),
    idade: Joi.number(),
    endereco: Joi.string().max(255),
});

const put = Joi.object().keys({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().max(255).required(),
    idade: Joi.number(),
    endereco: Joi.string().max(255),
});

const destroy = Joi.object().keys({
    cpf: Joi.string().length(11).required(),
});

module.exports = {
    get,
    post,
    put,
    destroy,
};
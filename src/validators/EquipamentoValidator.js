const Joi = require('joi');

const get = Joi.object().keys({
    id: Joi.number(),
    nome: Joi.string().max(255),
});

const post = Joi.object().keys({
    nome: Joi.string().max(255).required(),
    un_medida: Joi.string().max(10).valid('UN','KG').required(),
    quantidade: Joi.number().required(),
});

const put = Joi.object().keys({
    id: Joi.number().required(),
    nome: Joi.string().max(255).required(),
    un_medida: Joi.string().max(10).required(),
    quantidade: Joi.number().required(),
});

const destroy = Joi.object().keys({
    id: Joi.number(),
    nome: Joi.string().max(255),
});

module.exports = {
    get,
    post,
    put,
    destroy,
};
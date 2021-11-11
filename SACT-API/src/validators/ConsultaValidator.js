const Joi = require('joi');

const get = Joi.object().keys({
    id: Joi.number(),
    horario: Joi.date(),
    equipamento_id: Joi.number(),
    paciente_id: Joi.number(),
    profissional_id: Joi.number(),
});

const post = Joi.object().keys({
    horario: Joi.date().greater('now').required(),
    endereco: Joi.string().max(40).required(),
    equipamento_id: Joi.number().required(),
    paciente_id: Joi.number().required(),
    profissional_id: Joi.number().required(),
});

const put = Joi.object().keys({
    id: Joi.number().required(),
    horario: Joi.date().greater('now'),
    endereco: Joi.string().max(40),
    equipamento_id: Joi.number(),
    paciente_id: Joi.number(),
    profissional_id: Joi.number(),
});

const destroy = Joi.object().keys({
    id: Joi.number().required(),
});

module.exports = {
    get,
    post,
    put,
    destroy,
};
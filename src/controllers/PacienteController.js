const { Paciente } = require("../../models");

async function get(req, res) {
  try {
    const pacientes = await Paciente.findAll({where: req.query});
    res.status(200).json(pacientes.map(p => p.dataValues));
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível listar os pacientes"});
  }
}

async function post(req, res) {
  try {
    const paciente = await Paciente.findOne({where: {cpf: req.body.cpf}});
    
    if (paciente) {
      res.status(403).json({ mensagem: `O paciente ${req.body.nome} já está cadastrado.` });
    } else {
      await Paciente.create(req.body);
      res.status(201).json({ mensagem: `O paciente ${req.body.nome} foi cadastrado com sucesso.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível cadastrar o paciente."});
  }
}

async function put(req, res) {
  try {
    const paciente = await Paciente.findOne({where: {cpf: req.body.cpf}});
    
    if (paciente) {
      await Paciente.update(req.body, {where: {cpf: req.body.cpf}});

      res.status(201).json({ mensagem: `O paciente ${req.body.nome} foi atualizado com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `O paciente com cpf ${req.body.cpf} não está cadastrado.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível atualizar o paciente."});
  }
}

async function destroy(req, res) {
  try {
    const paciente = await Paciente.findOne({where: req.query});
    
    if (paciente) {
      await paciente.destroy();
      res.status(201).json({ mensagem: `O paciente com o cpf ${req.query.cpf} foi excluido com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `O cpf ${req.query.cpf} não está cadastrado como paciente.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível excluir o paciente."});
  }
}

module.exports = {
  get,
  post,
  put,
  destroy,
}
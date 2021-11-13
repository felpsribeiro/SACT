const { Profissional } = require("../../models");

async function get(req, res) {
  try {
    const profissionais = await Profissional.findAll({where: req.query});
    res.status(200).json(profissionais.map(p => p.dataValues));
  } catch (e) {
    console.log(e);
      res.status(201).json({ mensagem: `O profissional de saúde ${req.body.nome} foi cadastrado com sucesso.` });
    res.status(500).json({message: "Houve uma falha interna e não foi possível listar os profissionais de saúde."});
  }
}

async function post(req, res) {
  try {
    const profissional = await Profissional.findOne({where: {cpf: req.body.cpf}});
    
    if (profissional) {
      res.status(403).json({ mensagem: `O profissional de saúde ${req.body.nome} já está cadastrado.` });
    } else {
      await Profissional.create(req.body);
      res.status(201).json({ mensagem: `O profissional de saúde ${req.body.nome} foi cadastrado com sucesso.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível cadastrar o profissional."});
  }
}

async function put(req, res) {
  try {
    const profissional = await Profissional.findOne({where: {cpf: req.body.cpf}});
    
    if (profissional) {
      await Profissional.update(req.body, {where: {cpf: req.body.cpf}});

      res.status(201).json({ mensagem: `O profissional de saúde ${req.body.nome} foi atualizado com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `O profissional de saúde com cpf ${req.body.cpf} não está cadastrado.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível cadastrar o atualizar de saúde."});
  }
}

async function destroy(req, res) {
  try {
    const profissional = await Profissional.findOne({where: req.query});
    
    if (profissional) {
      await profissional.destroy();
      res.status(201).json({ mensagem: `O profissional de saúde com o cpf ${req.query.cpf} foi excluído com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `O cpf ${req.query.cpf} não está cadastrado como profissional de saúde.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível cadastrar o excluir de saúde."});
  }
}

module.exports = {
  get,
  post,
  put,
  destroy,
}
const { Equipamento } = require("../../models");

async function get(req, res) {
  try {
    let query = {};
    if(req.query.id) {
        query.id = req.query.id;
    } else if(req.query.nome) {
        query.nome = req.query.nome;
    }

    const equipamento = await Equipamento.findAll({where: query});
    res.status(200).json(equipamento.map(e => e.dataValues));
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível listar os equipamentos."});
  }
}

async function post(req, res) {
  try {
    const equipamento = await Equipamento.findOne({where: {nome: req.body.nome}});
    
    if (equipamento) {
      res.status(403).json({ mensagem: `O equipamento ${req.body.nome} já está cadastrado.` });
    } else {
      await Equipamento.create(req.body);
      res.status(201).json({ mensagem: `O equipamento ${req.body.nome} foi cadastrado com sucesso.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível cadastrar o equipamento."});
  }
}

async function put(req, res) {
  try {
    const equipamento = await Equipamento.findByPk(req.body.id);
    
    if (equipamento) {
      await Equipamento.update(req.body, {where: {id: req.body.id}});

      res.status(201).json({ mensagem: `O equipamento ${req.body.nome} foi atualizado com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `O equipamento ${req.body.nome} não está cadastrado.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível atualizar o equipamento."});
  }
}

async function destroy(req, res) {
  try {
    let query = {};
    if(req.query.id) {
        query.id = req.query.id;
    } else {
        query.nome = req.query.nome;
    }
    
    const equipamento = await Equipamento.findOne({where: query});
    
    if (equipamento) {
      await equipamento.destroy();
      res.status(201).json({ mensagem: `O equipamento ${equipamento.nome} foi excluido com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `O equipamento não está cadastrado.` });
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
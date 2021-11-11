const { Op } = require("sequelize");
const { Consulta, Equipamento } = require("../../models");

async function get(req, res) {
  try {
    const where = {}
    switch (true) {
      case !!(req.query.id):
        where.id = req.query.id;
        break;
      case !!(req.query.equipamento_id):
        where.equipamento_id = req.query.equipamento_id;
      case !!(req.query.paciente_id):
        where.paciente_id = req.query.paciente_id;
      case !!(req.query.profissional_id):
        where.profissional_id = req.query.profissional_id;
      case !!(req.query.horario):
        where.horario = { [Op.gte]: req.query.horario };
        break;
    }

    const consulta = await Consulta.findAll({ where, include: ['equipamento', 'paciente', 'profissional'] });
    res.status(200).json(consulta.map(e => e.dataValues));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Houve uma falha interna e não foi possível listar as consultas." });
  }
}

async function post(req, res) {
  try {
    const consulta = await Consulta.findOne({ where: { horario: req.body.horario } });

    if (consulta) {
      res.status(403).json({ mensagem: 'Já existe uma consulta marcada nesse horario.', codErro: 1 });
    } else {
      const equipamento = await Equipamento.findByPk(req.body.equipamento_id);

      if (equipamento.dataValues.quantidade === 0) {
        res.status(403).json({ mensagem: `Estoque de equipamentos ${equipamento.nome} insuficiente.`, codErro: 2 });
      } else {
        await Consulta.create(req.body);

        equipamento.quantidade--;
        await equipamento.save();

        res.status(201).json({ mensagem: 'A consulta foi cadastrada com sucesso.', id: req.body.id });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Houve uma falha interna e não foi possível cadastrar a consulta." });
  }
}

async function put(req, res) {
  try {
    const consulta = await Consulta.findByPk(req.body.id);

    if (consulta) {
      if (Date.parse(consulta.dataValues.horario) < new Date().getTime()) {
        res.status(400).json({ mensagem: "A consulta já foi realizada e não pode ser alterada.", codeErro: 3 });
      }
      if (consulta.dataValues.equipamento_id !== req.body.equipamento_id) {
        const equipamentoNovo = await Equipamento.findByPk(req.body.equipamento_id);

        if (equipamentoNovo.dataValues.quantidade === 0) {
          return res.status(400).json({ mensagem: `Estoque de equipamentos ${equipamento.nome} insuficiente.`, codErro: 2 });
        }

        //-1 novo equipamento
        equipamentoNovo.dataValues.quantidade--;
        await Equipamento.update(equipamentoNovo.dataValues, { where: { id: equipamentoNovo.id } });

        //+1 velho equipamento
        const equipamentoVelho = await Equipamento.findByPk(consulta.dataValues.equipamento_id);
        equipamentoVelho.dataValues.quantidade++;
        await Equipamento.update(equipamentoVelho.dataValues, { where: { id: equipamentoVelho.id } });
      }

      await Consulta.update(req.body, { where: { id: req.body.id } });
      res.status(201).json({ mensagem: `A consulta com ID: ${req.body.id} foi atualizado com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `A consulta com ID: ${req.body.id} não está cadastrada.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Houve uma falha interna e não foi possível atualizar a consulta." });
  }
}

async function destroy(req, res) {
  try {
    const consulta = await Consulta.findByPk(req.query.id);

    if (consulta) {
      if (Date.parse(consulta.dataValues.horario) > new Date().getTime()) {
        const equipamento = await Equipamento.findByPk(consulta.dataValues.equipamento_id);
        equipamento.dataValues.quantidade++;
        await Equipamento.update(equipamento.dataValues, { where: { id: equipamento.id } });
      }

      await consulta.destroy();
      res.status(201).json({ mensagem: `A consulta com ID: ${consulta.dataValues.id} foi cancelada com sucesso.` });
    } else {
      res.status(400).json({ mensagem: `A consulta não está cadastrada.`, codeErro: 4 });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Houve uma falha interna e não foi possível cancelar a consulta." });
  }
}

module.exports = {
  get,
  post,
  put,
  destroy,
}
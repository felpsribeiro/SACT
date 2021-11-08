const { Pessoa } = require("../../models");

async function get(req, res) {
  try {
    const pessoas = await Pessoa.findAll({where: req.query});
    res.status(200).json(pessoas.map(p => p.dataValues));
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Houve uma falha interna e não foi possível listar as pessoas"});
  }
}

module.exports = get;
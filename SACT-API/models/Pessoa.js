
module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        cpf: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: DataTypes.INTEGER,
        endereco: DataTypes.STRING
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'pessoas'
    });
    Pessoa.associate = (models) => {
        Pessoa.hasOne(models.Paciente, {foreignKey: 'pessoa_cpf', as: 'pessoa'});
    }
    return Pessoa;
}
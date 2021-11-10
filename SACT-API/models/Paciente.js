
module.exports = (sequelize, DataTypes) => {
    const Paciente = sequelize.define('Paciente', {
        cpf: {
            type: DataTypes.STRING(11),
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
        tableName: 'pacientes'
    });
    Paciente.associate = (models) => {
        Paciente.hasMany(models.Consulta, {foreignKey: 'paciente_cpf', as: 'consultas'});
    }
    return Paciente;
}

module.exports = (sequelize, DataTypes) => {
    const Paciente = sequelize.define('Paciente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pessoa_cpf: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'pacientes'
    });
    Paciente.associate = (models) => {
        Paciente.belongsTo(models.Pessoa, {foreignKey: 'pessoa_cpf', as: 'pessoa'});
    }
    return Paciente;
}
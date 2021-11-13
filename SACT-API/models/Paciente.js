
module.exports = (sequelize, DataTypes) => {
    const Paciente = sequelize.define('Paciente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cpf: {
            type: DataTypes.STRING(11),
            unique: true,
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
        Paciente.hasMany(models.Consulta, {foreignKey: 'paciente_id', as: 'consultas'});
    }
    return Paciente;
}

module.exports = (sequelize, DataTypes) => {
    const Consulta = sequelize.define('Consulta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        horario: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        equipamento_disponivel: DataTypes.BOOLEAN,
        equipamento_id: DataTypes.INTEGER,
        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profissional_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'consultas'
    });
    Consulta.associate = (models) => {
        Consulta.belongsTo(models.Equipamento, {foreignKey: 'equipamento_id', as: 'equipamento'});
        Consulta.belongsTo(models.Paciente, {foreignKey: 'paciente_cpf', as: 'paciente'});
        Consulta.belongsTo(models.Profissional, {foreignKey: 'profissional_cpf', as: 'profissional'});
    }
    return Consulta;
}

module.exports = (sequelize, DataTypes) => {
    const Consulta = sequelize.define('Consulta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        horario: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true,
        },
        endereco: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        equipamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
        Consulta.belongsTo(models.Paciente, {foreignKey: 'paciente_id', as: 'paciente'});
        Consulta.belongsTo(models.Profissional, {foreignKey: 'profissional_id', as: 'profissional'});
    }
    return Consulta;
}
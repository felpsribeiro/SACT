
module.exports = (sequelize, DataTypes) => {
    const Equipamento = sequelize.define('Equipamento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(99),
            allowNull: false
        },
        un_medida: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'pacientes'
    });
    Equipamento.associate = (models) => {
        Equipamento.hasMany(models.Consulta, {foreignKey: 'equipamento_id', as: 'equipamento'});
    }
    return Equipamento;
}
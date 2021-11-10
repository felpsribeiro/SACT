
module.exports = (sequelize, DataTypes) => {
    const Equipamento = sequelize.define('Equipamento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        tableName: 'equipamentos'
    });
    Equipamento.associate = (models) => {
        Equipamento.hasMany(models.Consulta, {foreignKey: 'equipamento_id', as: 'consultas'});
    }
    return Equipamento;
}
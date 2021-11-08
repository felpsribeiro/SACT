
module.exports = (sequelize, DataTypes) => {
    const Profissional = sequelize.define('Profissional', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        funcao: {
            type: DataTypes.STRING(30),
            allowNull: false
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
    Profissional.associate = (models) => {
        Profissional.belongsTo(models.Pessoa, {foreignKey: 'pessoa_cpf', as: 'pessoa'});
    }
    return Profissional;
}
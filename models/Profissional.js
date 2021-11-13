
module.exports = (sequelize, DataTypes) => {
    const Profissional = sequelize.define('Profissional', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cpf: {
            type: DataTypes.STRING(11),
            unique: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        funcao: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        idade: DataTypes.INTEGER,
        endereco: DataTypes.STRING
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: 'profissionais'
    });
    Profissional.associate = (models) => {
        Profissional.hasMany(models.Consulta, {foreignKey: 'profissional_id', as: 'consultas'});
    }
    return Profissional;
}
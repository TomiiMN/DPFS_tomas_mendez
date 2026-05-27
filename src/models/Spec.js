const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Spec extends Model {}

Spec.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Spec',
    tableName: 'specs',
    timestamps: false,
});

module.exports = Spec;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class SpecLabel extends Model {}

SpecLabel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    spec_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'SpecLabel',
    tableName: 'specs_labels',
    timestamps: false,
});

module.exports = SpecLabel;

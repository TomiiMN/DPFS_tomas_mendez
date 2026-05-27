const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Brand extends Model {}

Brand.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: false,
});

module.exports = Brand;

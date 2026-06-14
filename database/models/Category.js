const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../src/utils/database');

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
});

module.exports = Category;

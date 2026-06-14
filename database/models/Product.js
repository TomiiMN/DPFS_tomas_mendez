const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../src/utils/database');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING(100),
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    old_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING(255),
    },
    tier: {
        type: DataTypes.STRING(50),
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    on_sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
});

module.exports = Product;

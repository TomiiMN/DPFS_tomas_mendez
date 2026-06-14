const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../src/utils/database');

class CategorySpec extends Model {}

CategorySpec.init({
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    spec_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    data_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'CategorySpec',
    tableName: 'category_specs',
    timestamps: false,
});

module.exports = CategorySpec;

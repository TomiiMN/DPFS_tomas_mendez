const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');

class Tag extends Model {}

Tag.init({
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
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false,
});

module.exports = Tag;

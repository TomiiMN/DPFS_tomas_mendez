const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');
const { v4: uuidv4 } = require('uuid');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING(255),
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});

module.exports = User;

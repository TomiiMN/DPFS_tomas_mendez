'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id:         { type: Sequelize.CHAR(36), primaryKey: true },
            first_name: { type: Sequelize.STRING(100), allowNull: false },
            last_name:  { type: Sequelize.STRING(100), allowNull: false },
            email:      { type: Sequelize.STRING(150), allowNull: false, unique: true },
            password:   { type: Sequelize.STRING(255), allowNull: false },
            username:   { type: Sequelize.STRING(100), allowNull: false, unique: true },
            type:       { type: Sequelize.STRING(50),  allowNull: false },
            avatar:     { type: Sequelize.STRING(255) },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    },
};

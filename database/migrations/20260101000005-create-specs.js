'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('specs', {
            id:   { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('specs');
    },
};

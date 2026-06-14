'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('brands', {
            id:   { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING(100), allowNull: false },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('brands');
    },
};

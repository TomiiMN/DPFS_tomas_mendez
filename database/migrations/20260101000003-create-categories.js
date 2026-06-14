'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name:      { type: Sequelize.STRING(100), allowNull: false },
            slug:      { type: Sequelize.STRING(150), allowNull: false, unique: true },
            parent_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'categories', key: 'id' },
                onDelete: 'SET NULL',
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('categories');
    },
};

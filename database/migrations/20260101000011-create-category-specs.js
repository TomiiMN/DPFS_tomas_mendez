'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('category_specs', {
            category_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'categories', key: 'id' },
                onDelete: 'CASCADE',
            },
            spec_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'specs', key: 'id' },
                onDelete: 'CASCADE',
            },
            data_type: { type: Sequelize.STRING(50), allowNull: false },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('category_specs');
    },
};

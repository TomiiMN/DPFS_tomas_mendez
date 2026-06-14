'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_categories', {
            product_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'products', key: 'id' },
                onDelete: 'CASCADE',
            },
            category_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'categories', key: 'id' },
                onDelete: 'CASCADE',
            },
        });
        await queryInterface.addIndex('product_categories', ['category_id'], { name: 'idx_pc_category' });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_categories');
    },
};

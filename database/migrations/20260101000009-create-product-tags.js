'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_tags', {
            product_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'products', key: 'id' },
                onDelete: 'CASCADE',
            },
            tag_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'tags', key: 'id' },
                onDelete: 'CASCADE',
            },
        });
        await queryInterface.addIndex('product_tags', ['tag_id'], { name: 'idx_pt_tag' });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_tags');
    },
};

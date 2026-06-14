'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_specs', {
            product_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'products', key: 'id' },
                onDelete: 'CASCADE',
            },
            spec_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: { model: 'specs', key: 'id' },
                onDelete: 'CASCADE',
            },
            value: { type: Sequelize.STRING(255), allowNull: false },
        });
        await queryInterface.addIndex('product_specs', ['spec_id'], { name: 'idx_ps_spec' });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_specs');
    },
};

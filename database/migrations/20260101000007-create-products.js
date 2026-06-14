'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id:           { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name:         { type: Sequelize.STRING(150), allowNull: false },
            brand_id:     {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'brands', key: 'id' },
                onDelete: 'RESTRICT',
            },
            model:        { type: Sequelize.STRING(100) },
            price:        { type: Sequelize.INTEGER, allowNull: false },
            old_price:    { type: Sequelize.INTEGER, allowNull: true },
            release_date: { type: Sequelize.DATEONLY, allowNull: true },
            img:          { type: Sequelize.STRING(255) },
            tier:         { type: Sequelize.STRING(50) },
            state:        { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
            featured:     { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
            on_sale:      { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
        });
        await queryInterface.addIndex('products', ['brand_id'], { name: 'idx_products_brand' });
        await queryInterface.addIndex('products', ['price'],    { name: 'idx_products_price' });
        await queryInterface.addIndex('products', ['state'],    { name: 'idx_products_state' });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('products');
    },
};

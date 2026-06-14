'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('specs_labels', {
            id:      { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            spec_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'specs', key: 'id' },
                onDelete: 'CASCADE',
            },
            label: { type: Sequelize.STRING(150), allowNull: false },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('specs_labels');
    },
};

const { Category } = require('./index');

const CategoryModel = {
    getAll: async () => {
        try {
            return await Category.findAll({ raw: true });
        } catch (e) {
            console.error('Error obteniendo categorías: ', e);
            return [];
        }
    },

    getById: async (id) => {
        try {
            const category = await Category.findByPk(id, { raw: true });
            return category ?? null;
        } catch (e) {
            console.error('Error obteniendo categoría: ', e);
            return null;
        }
    },
};

module.exports = CategoryModel;

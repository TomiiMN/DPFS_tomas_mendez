const { Brand } = require('./index');

const BrandModel = {
    getAll: async () => {
        try {
            return await Brand.findAll({ raw: true });
        } catch (e) {
            console.error('Error obteniendo marcas: ', e);
            return [];
        }
    },

    getById: async (id) => {
        try {
            const brand = await Brand.findByPk(id, { raw: true });
            return brand ?? null;
        } catch (e) {
            console.error('Error obteniendo marca: ', e);
            return null;
        }
    },
};

module.exports = BrandModel;

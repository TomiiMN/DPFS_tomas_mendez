const { Tag } = require('./index');

const TagModel = {
    getAll: async () => {
        try {
            return await Tag.findAll({ raw: true });
        } catch (e) {
            console.error('Error obteniendo tags: ', e);
            return [];
        }
    },

    getById: async (id) => {
        try {
            const tag = await Tag.findByPk(id, { raw: true });
            return tag ?? null;
        } catch (e) {
            console.error('Error obteniendo tag: ', e);
            return null;
        }
    },
};

module.exports = TagModel;

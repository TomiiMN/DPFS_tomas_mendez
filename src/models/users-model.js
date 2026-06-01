const { v4: uuidv4 } = require('uuid');
const { User } = require('./index');

const UserModel = {
    getAll: async () => {
        try {
            return await User.findAll({ raw: true });
        } catch (e) {
            console.error('Error obteniendo usuarios: ', e);
            return [];
        }
    },

    getById: async (id) => {
        try {
            const user = await User.findByPk(id, { raw: true });
            return user ?? null;
        } catch (e) {
            console.error('Error obteniendo usuario por ID: ', e);
            return null;
        }
    },

    getByEmail: async (email) => {
        try {
            const user = await User.findOne({ where: { email }, raw: true });
            return user ?? null;
        } catch (e) {
            console.error('Error obteniendo usuario por email: ', e);
            return null;
        }
    },

    create: async (newUser) => {
        const { firstName, lastName, email, password, username, type, avatar } = newUser;
        try {
            await User.create({
                id: uuidv4(),
                first_name: firstName,
                last_name:  lastName,
                email,
                password,
                username,
                type,
                avatar,
            });
        } catch (e) {
            console.error('Error creando usuario: ', e);
        }
    },

    update: async (id, updatedData) => {
        const { firstName, lastName, email, password, username, type, avatar } = updatedData;
        try {
            await User.update(
                { first_name: firstName, last_name: lastName, email, password, username, type, avatar },
                { where: { id } }
            );
        } catch (e) {
            console.error('Error actualizando usuario: ', e);
        }
    },

    delete: async (id) => {
        try {
            await User.destroy({ where: { id } });
        } catch (e) {
            console.error('Error eliminando usuario: ', e);
        }
    },
};

module.exports = UserModel;

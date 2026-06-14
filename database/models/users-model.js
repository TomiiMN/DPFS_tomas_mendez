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

    getByUsername: async (username) => {
        try {
            return await User.findOne({ where: { username }, raw: true });
        } catch (e) {
            console.error('Error obteniendo usuario por username: ', e);
            return null;
        }
    },

    create: async (newUser) => {
        const { firstName, lastName, email, password, username, type, avatar } = newUser;
        try {
            const user = await User.create({
                first_name: firstName,
                last_name:  lastName,
                email,
                password,
                username,
                type,
                avatar,
            });
            return user.get({ plain: true });
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

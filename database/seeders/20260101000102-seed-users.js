'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                id:         uuidv4(),
                first_name: 'Tomás',
                last_name:  'Méndez Nacher',
                email:      'admin@gmail.com',
                password:   bcrypt.hashSync('Admin.1234', 10),
                username:   'admin',
                type:       'Admin',
                avatar:     null,
            },
            {
                id:         uuidv4(),
                first_name: 'Juan',
                last_name:  'García',
                email:      'juan@gmail.com',
                password:   bcrypt.hashSync('Cliente.1234', 10),
                username:   'juangarcia',
                type:       'Customer',
                avatar:     null,
            },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', {
            email: ['admin@gmail.com', 'juan@gmail.com'],
        });
    },
};

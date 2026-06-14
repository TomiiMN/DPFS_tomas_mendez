'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('brands', [
            { id: 1,  name: 'ASUS' },
            { id: 2,  name: 'AMD' },
            { id: 3,  name: 'Intel' },
            { id: 4,  name: 'NVIDIA' },
            { id: 5,  name: 'Logitech' },
            { id: 6,  name: 'Corsair' },
            { id: 7,  name: 'Hyte' },
            { id: 8,  name: 'Steelseries' },
            { id: 9,  name: 'Redragon' },
            { id: 10, name: 'Razer' },
            { id: 11, name: 'Samsung' },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('brands', { id: [1,2,3,4,5,6,7,8,9,10,11] });
    },
};

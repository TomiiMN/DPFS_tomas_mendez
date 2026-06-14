'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('product_categories', [
            { product_id: 1,  category_id: 30 },
            { product_id: 1,  category_id: 33 },
            { product_id: 2,  category_id: 30 },
            { product_id: 2,  category_id: 38 },
            { product_id: 3,  category_id: 30 },
            { product_id: 3,  category_id: 32 },
            { product_id: 4,  category_id: 30 },
            { product_id: 4,  category_id: 31 },
            { product_id: 5,  category_id: 30 },
            { product_id: 5,  category_id: 36 },
            { product_id: 6,  category_id: 30 },
            { product_id: 6,  category_id: 33 },
            { product_id: 7,  category_id: 4  },
            { product_id: 7,  category_id: 6  },
            { product_id: 8,  category_id: 43 },
            { product_id: 8,  category_id: 44 },
            { product_id: 9,  category_id: 28 },
            { product_id: 9,  category_id: 29 },
            { product_id: 10, category_id: 41 },
            { product_id: 10, category_id: 42 },
            { product_id: 11, category_id: 43 },
            { product_id: 11, category_id: 44 },
            { product_id: 12, category_id: 15 },
            { product_id: 12, category_id: 18 },
            { product_id: 13, category_id: 43 },
            { product_id: 13, category_id: 44 },
            { product_id: 14, category_id: 41 },
            { product_id: 14, category_id: 42 },
            { product_id: 15, category_id: 41 },
            { product_id: 15, category_id: 42 },
            { product_id: 16, category_id: 4  },
            { product_id: 16, category_id: 5  },
            // Procesadores AMD
            { product_id: 17, category_id: 1  }, { product_id: 17, category_id: 2  },
            { product_id: 18, category_id: 1  }, { product_id: 18, category_id: 2  },
            { product_id: 19, category_id: 1  }, { product_id: 19, category_id: 2  },
            { product_id: 20, category_id: 1  }, { product_id: 20, category_id: 2  },
            { product_id: 21, category_id: 1  }, { product_id: 21, category_id: 2  },
            // Procesadores Intel
            { product_id: 22, category_id: 1  }, { product_id: 22, category_id: 3  },
            { product_id: 23, category_id: 1  }, { product_id: 23, category_id: 3  },
            { product_id: 24, category_id: 1  }, { product_id: 24, category_id: 3  },
            { product_id: 25, category_id: 1  }, { product_id: 25, category_id: 3  },
            { product_id: 26, category_id: 1  }, { product_id: 26, category_id: 3  },
            // Volantes
            { product_id: 27, category_id: 30 }, { product_id: 27, category_id: 39 },
            // Webcam
            { product_id: 28, category_id: 30 }, { product_id: 28, category_id: 34 },
            // Volante
            { product_id: 29, category_id: 30 }, { product_id: 29, category_id: 39 },
            // Auriculares
            { product_id: 30, category_id: 30 }, { product_id: 30, category_id: 31 },
            // Mouse
            { product_id: 31, category_id: 30 }, { product_id: 31, category_id: 33 },
            // Teclado
            { product_id: 32, category_id: 30 }, { product_id: 32, category_id: 32 },
            // Gabinetes
            { product_id: 33, category_id: 25 }, { product_id: 33, category_id: 26 },
            // Mouse
            { product_id: 34, category_id: 30 }, { product_id: 34, category_id: 33 },
            // Memoria RAM
            { product_id: 35, category_id: 8  }, { product_id: 35, category_id: 9  },
            // Gabinetes
            { product_id: 36, category_id: 25 }, { product_id: 36, category_id: 26 },
            { product_id: 37, category_id: 25 }, { product_id: 37, category_id: 26 },
            { product_id: 38, category_id: 25 }, { product_id: 38, category_id: 26 },
            { product_id: 39, category_id: 25 }, { product_id: 39, category_id: 26 },
            // USB Hub (Periférico + Cable, iluminación y otro)
            { product_id: 40, category_id: 30 }, { product_id: 40, category_id: 27 },
            // Gabinete
            { product_id: 41, category_id: 25 }, { product_id: 41, category_id: 26 },
            // Teclado
            { product_id: 42, category_id: 30 }, { product_id: 42, category_id: 32 },
            // Mouse Pad
            { product_id: 43, category_id: 30 }, { product_id: 43, category_id: 36 },
            // Auriculares
            { product_id: 44, category_id: 30 }, { product_id: 44, category_id: 31 },
            // Mouse
            { product_id: 45, category_id: 30 }, { product_id: 45, category_id: 33 },
            // Teclado
            { product_id: 46, category_id: 30 }, { product_id: 46, category_id: 32 },
            // Mouse Pad
            { product_id: 47, category_id: 30 }, { product_id: 47, category_id: 36 },
            // Joysticks
            { product_id: 48, category_id: 30 }, { product_id: 48, category_id: 35 },
            // Silla gamer
            { product_id: 49, category_id: 28 }, { product_id: 49, category_id: 29 },
            // Joystick
            { product_id: 50, category_id: 30 }, { product_id: 50, category_id: 35 },
            // Auriculares
            { product_id: 51, category_id: 30 }, { product_id: 51, category_id: 31 },
            { product_id: 52, category_id: 30 }, { product_id: 52, category_id: 31 },
            // Cargador (Periférico + Cable, iluminación y otro)
            { product_id: 53, category_id: 30 }, { product_id: 53, category_id: 27 },
            // Monitor
            { product_id: 54, category_id: 41 }, { product_id: 54, category_id: 42 },
            // Almacenamiento
            { product_id: 55, category_id: 11 }, { product_id: 55, category_id: 14 },
            // Notebook
            { product_id: 56, category_id: 43 }, { product_id: 56, category_id: 44 },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('product_categories', null, {});
    },
};

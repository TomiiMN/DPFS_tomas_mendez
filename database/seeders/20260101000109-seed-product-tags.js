'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('product_tags', [
            { product_id: 1,  tag_id: 1  },
            { product_id: 1,  tag_id: 4  },
            { product_id: 1,  tag_id: 3  },
            { product_id: 2,  tag_id: 6  },
            { product_id: 2,  tag_id: 3  },
            { product_id: 2,  tag_id: 5  },
            { product_id: 3,  tag_id: 1  },
            { product_id: 3,  tag_id: 3  },
            { product_id: 3,  tag_id: 7  },
            { product_id: 4,  tag_id: 1  },
            { product_id: 4,  tag_id: 3  },
            { product_id: 4,  tag_id: 8  },
            { product_id: 5,  tag_id: 1  },
            { product_id: 5,  tag_id: 9  },
            { product_id: 5,  tag_id: 10 },
            { product_id: 6,  tag_id: 1  },
            { product_id: 6,  tag_id: 3  },
            { product_id: 6,  tag_id: 17 },
            { product_id: 7,  tag_id: 1  },
            { product_id: 7,  tag_id: 13 },
            { product_id: 7,  tag_id: 11 },
            { product_id: 8,  tag_id: 16 },
            { product_id: 8,  tag_id: 18 },
            { product_id: 9,  tag_id: 1  },
            { product_id: 9,  tag_id: 19 },
            { product_id: 10, tag_id: 1  },
            { product_id: 10, tag_id: 12 },
            { product_id: 11, tag_id: 16 },
            { product_id: 11, tag_id: 20 },
            { product_id: 12, tag_id: 14 },
            { product_id: 12, tag_id: 15 },
            { product_id: 13, tag_id: 16 },
            { product_id: 13, tag_id: 21 },
            { product_id: 14, tag_id: 1  },
            { product_id: 14, tag_id: 17 },
            { product_id: 15, tag_id: 1  },
            { product_id: 16, tag_id: 1  },
            { product_id: 16, tag_id: 2  },
            // Ryzen 5 7600: entrada, economico, oficina, rendimiento
            { product_id: 17, tag_id: 14 }, { product_id: 17, tag_id: 17 }, { product_id: 17, tag_id: 16 }, { product_id: 17, tag_id: 20 },
            // Ryzen 7 7700X: gaming, rendimiento, alta
            { product_id: 18, tag_id: 1  }, { product_id: 18, tag_id: 20 }, { product_id: 18, tag_id: 13 },
            // Ryzen 9 5900XT: streaming, premium, rendimiento, am4
            { product_id: 19, tag_id: 6  }, { product_id: 19, tag_id: 19 }, { product_id: 19, tag_id: 20 }, { product_id: 19, tag_id: 15 },
            // Ryzen 7 7800X3D: gaming, premium, rendimiento
            { product_id: 20, tag_id: 1  }, { product_id: 20, tag_id: 19 }, { product_id: 20, tag_id: 20 },
            // Ryzen 5 9600X: entrada, oficina, rendimiento, ddr5
            { product_id: 21, tag_id: 14 }, { product_id: 21, tag_id: 16 }, { product_id: 21, tag_id: 20 }, { product_id: 21, tag_id: 21 },
            // i7 12700KF: gaming, rendimiento, premium
            { product_id: 22, tag_id: 1  }, { product_id: 22, tag_id: 20 }, { product_id: 22, tag_id: 19 },
            // i5 12400F: economico, oficina, entrada
            { product_id: 23, tag_id: 17 }, { product_id: 23, tag_id: 16 }, { product_id: 23, tag_id: 14 },
            // i5 12600KF: gaming, rendimiento
            { product_id: 24, tag_id: 1  }, { product_id: 24, tag_id: 20 },
            // i9 12900KF: premium, rendimiento, alta
            { product_id: 25, tag_id: 19 }, { product_id: 25, tag_id: 20 }, { product_id: 25, tag_id: 13 },
            // i9 14900F: premium, gaming, rendimiento
            { product_id: 26, tag_id: 19 }, { product_id: 26, tag_id: 1  }, { product_id: 26, tag_id: 20 },
            // Volante G29: gaming, usb
            { product_id: 27, tag_id: 1  }, { product_id: 27, tag_id: 5  },
            // Webcam Brio 500: streaming, usb
            { product_id: 28, tag_id: 6  }, { product_id: 28, tag_id: 5  },
            // Volante G920: gaming, usb
            { product_id: 29, tag_id: 1  }, { product_id: 29, tag_id: 5  },
            // Auriculares PRO X 2: gaming, wireless, sonido envolvente, premium
            { product_id: 30, tag_id: 1  }, { product_id: 30, tag_id: 4  }, { product_id: 30, tag_id: 8  }, { product_id: 30, tag_id: 19 },
            // Mouse G305: gaming, wireless, economico, precision
            { product_id: 31, tag_id: 1  }, { product_id: 31, tag_id: 4  }, { product_id: 31, tag_id: 17 }, { product_id: 31, tag_id: 10 },
            // Teclado Corsair K65: gaming, mecanico, rgb
            { product_id: 32, tag_id: 1  }, { product_id: 32, tag_id: 7  }, { product_id: 32, tag_id: 3  },
            // Gabinete Corsair 7000X: premium, rgb
            { product_id: 33, tag_id: 19 }, { product_id: 33, tag_id: 3  },
            // Mouse Corsair M55: gaming, precision
            { product_id: 34, tag_id: 1  }, { product_id: 34, tag_id: 10 },
            // Memoria Corsair DDR4: gaming, alta, premium
            { product_id: 35, tag_id: 1  }, { product_id: 35, tag_id: 13 }, { product_id: 35, tag_id: 19 },
            // Gabinete Corsair 2500D: gaming
            { product_id: 36, tag_id: 1  },
            // Gabinete HYTE Y70 Touch: premium, rgb
            { product_id: 37, tag_id: 19 }, { product_id: 37, tag_id: 3  },
            // Gabinete HYTE Y70 Panda: premium
            { product_id: 38, tag_id: 19 },
            // Gabinete HYTE Y40: gaming
            { product_id: 39, tag_id: 1  },
            // USB Hub HYTE: usb
            { product_id: 40, tag_id: 5  },
            // Gabinete HYTE Y60: gaming
            { product_id: 41, tag_id: 1  },
            // Teclado Apex 3 Black: gaming, rgb
            { product_id: 42, tag_id: 1  }, { product_id: 42, tag_id: 3  },
            // Mouse Pad QcK XL: xl, precision
            { product_id: 43, tag_id: 9  }, { product_id: 43, tag_id: 10 },
            // Auriculares Arctis Nova 3P: gaming, wireless, sonido envolvente
            { product_id: 44, tag_id: 1  }, { product_id: 44, tag_id: 4  }, { product_id: 44, tag_id: 8  },
            // Mouse Aerox 9: gaming, wireless, precision
            { product_id: 45, tag_id: 1  }, { product_id: 45, tag_id: 4  }, { product_id: 45, tag_id: 10 },
            // Teclado Apex 3 TKL: gaming
            { product_id: 46, tag_id: 1  },
            // Mouse Pad Kunlun: xl, economico
            { product_id: 47, tag_id: 9  }, { product_id: 47, tag_id: 17 },
            // Joystick Redragon Juno: gaming, wireless
            { product_id: 48, tag_id: 1  }, { product_id: 48, tag_id: 4  },
            // Silla Razer ISKUR V2: gaming, premium
            { product_id: 49, tag_id: 1  }, { product_id: 49, tag_id: 19 },
            // Joystick Wolverine V3: gaming, precision
            { product_id: 50, tag_id: 1  }, { product_id: 50, tag_id: 10 },
            // Auriculares BlackShark V3 Pro: gaming, wireless, premium, sonido envolvente
            { product_id: 51, tag_id: 1  }, { product_id: 51, tag_id: 4  }, { product_id: 51, tag_id: 19 }, { product_id: 51, tag_id: 8  },
            // Auriculares BlackShark V2 X: gaming, economico, sonido envolvente
            { product_id: 52, tag_id: 1  }, { product_id: 52, tag_id: 17 }, { product_id: 52, tag_id: 8  },
            // Cargador Samsung 45W: usb, portatil
            { product_id: 53, tag_id: 5  }, { product_id: 53, tag_id: 18 },
            // Monitor Odyssey G3: gaming
            { product_id: 54, tag_id: 1  },
            // SSD Samsung 1TB: rendimiento
            { product_id: 55, tag_id: 20 },
            // Notebook Samsung Book 4: portatil, oficina
            { product_id: 56, tag_id: 18 }, { product_id: 56, tag_id: 16 },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('product_tags', null, {});
    },
};

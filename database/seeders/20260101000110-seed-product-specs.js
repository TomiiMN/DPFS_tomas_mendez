'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('product_specs', [
            { product_id: 1,  spec_id: 6,  value: '16000' },
            { product_id: 1,  spec_id: 35, value: '107' },
            { product_id: 1,  spec_id: 3,  value: 'wireless' },
            { product_id: 1,  spec_id: 24, value: 'hero' },
            { product_id: 2,  spec_id: 16, value: 'cardioide' },
            { product_id: 2,  spec_id: 33, value: 'condensador' },
            { product_id: 2,  spec_id: 3,  value: 'usb-c' },
            { product_id: 2,  spec_id: 8,  value: '20hz-20khz' },
            { product_id: 3,  spec_id: 32, value: 'red' },
            { product_id: 3,  spec_id: 9,  value: 'full' },
            { product_id: 3,  spec_id: 3,  value: 'usb' },
            { product_id: 3,  spec_id: 12, value: 'true' },
            { product_id: 4,  spec_id: 14, value: 'true' },
            { product_id: 4,  spec_id: 28, value: '7.1 surround' },
            { product_id: 4,  spec_id: 3,  value: 'wired' },
            { product_id: 4,  spec_id: 23, value: 'true' },
            { product_id: 5,  spec_id: 25, value: 'xl' },
            { product_id: 5,  spec_id: 5,  value: '930x400' },
            { product_id: 5,  spec_id: 10, value: 'tela' },
            { product_id: 5,  spec_id: 31, value: 'speed' },
            { product_id: 6,  spec_id: 6,  value: '7200' },
            { product_id: 6,  spec_id: 35, value: '151' },
            { product_id: 6,  spec_id: 3,  value: 'wired' },
            { product_id: 6,  spec_id: 24, value: 'optico' },
            { product_id: 7,  spec_id: 34, value: '16' },
            { product_id: 7,  spec_id: 13, value: 'GDDR6' },
            { product_id: 7,  spec_id: 1,  value: 'RDNA' },
            { product_id: 7,  spec_id: 20, value: '750' },
            { product_id: 8,  spec_id: 4,  value: 'ryzen 5 7520U' },
            { product_id: 8,  spec_id: 17, value: '8' },
            { product_id: 8,  spec_id: 29, value: '512' },
            { product_id: 8,  spec_id: 30, value: 'ssd' },
            { product_id: 9,  spec_id: 10, value: 'tela' },
            { product_id: 9,  spec_id: 11, value: '136' },
            { product_id: 9,  spec_id: 19, value: '180' },
            { product_id: 10, spec_id: 26, value: '49' },
            { product_id: 10, spec_id: 22, value: '5120x1440' },
            { product_id: 10, spec_id: 21, value: '144' },
            { product_id: 10, spec_id: 15, value: 'VA' },
            { product_id: 11, spec_id: 4,  value: 'ryzen 7 7825U' },
            { product_id: 11, spec_id: 17, value: '16' },
            { product_id: 11, spec_id: 29, value: '512' },
            { product_id: 11, spec_id: 30, value: 'ssd' },
            { product_id: 12, spec_id: 27, value: 'AM4' },
            { product_id: 12, spec_id: 2,  value: 'A520' },
            { product_id: 12, spec_id: 7,  value: 'm-atx' },
            { product_id: 12, spec_id: 18, value: 'DDR4' },
            { product_id: 13, spec_id: 4,  value: 'ryzen 5 7520U' },
            { product_id: 13, spec_id: 17, value: '8' },
            { product_id: 13, spec_id: 18, value: 'DDR5' },
            { product_id: 13, spec_id: 29, value: '512' },
            { product_id: 14, spec_id: 26, value: '22' },
            { product_id: 14, spec_id: 22, value: '1920x1080' },
            { product_id: 14, spec_id: 21, value: '100' },
            { product_id: 14, spec_id: 15, value: 'IPS' },
            { product_id: 15, spec_id: 26, value: '22' },
            { product_id: 15, spec_id: 22, value: '1920x1080' },
            { product_id: 15, spec_id: 21, value: '100' },
            { product_id: 15, spec_id: 15, value: 'IPS' },
            { product_id: 16, spec_id: 34, value: '8' },
            { product_id: 16, spec_id: 13, value: 'GDDR7' },
            { product_id: 16, spec_id: 1,  value: 'RTX' },
            { product_id: 16, spec_id: 20, value: '550' },
            // Procesadores AMD (architecture, socket, cores, frequency_mhz)
            { product_id: 17, spec_id: 1,  value: 'Zen 4' },         { product_id: 17, spec_id: 27, value: 'AM5' },       { product_id: 17, spec_id: 36, value: '6' },  { product_id: 17, spec_id: 38, value: '3800' },
            { product_id: 18, spec_id: 1,  value: 'Zen 4' },         { product_id: 18, spec_id: 27, value: 'AM5' },       { product_id: 18, spec_id: 36, value: '8' },  { product_id: 18, spec_id: 38, value: '4500' },
            { product_id: 19, spec_id: 1,  value: 'Zen 3' },         { product_id: 19, spec_id: 27, value: 'AM4' },       { product_id: 19, spec_id: 36, value: '16' }, { product_id: 19, spec_id: 38, value: '3300' },
            { product_id: 20, spec_id: 1,  value: 'Zen 4' },         { product_id: 20, spec_id: 27, value: 'AM5' },       { product_id: 20, spec_id: 36, value: '8' },  { product_id: 20, spec_id: 38, value: '4200' },
            { product_id: 21, spec_id: 1,  value: 'Zen 5' },         { product_id: 21, spec_id: 27, value: 'AM5' },       { product_id: 21, spec_id: 36, value: '6' },  { product_id: 21, spec_id: 38, value: '3900' },
            // Procesadores Intel
            { product_id: 22, spec_id: 1,  value: 'Alder Lake' },    { product_id: 22, spec_id: 27, value: 'LGA 1700' },  { product_id: 22, spec_id: 36, value: '12' }, { product_id: 22, spec_id: 38, value: '2700' },
            { product_id: 23, spec_id: 1,  value: 'Alder Lake' },    { product_id: 23, spec_id: 27, value: 'LGA 1700' },  { product_id: 23, spec_id: 36, value: '6' },  { product_id: 23, spec_id: 38, value: '2500' },
            { product_id: 24, spec_id: 1,  value: 'Alder Lake' },    { product_id: 24, spec_id: 27, value: 'LGA 1700' },  { product_id: 24, spec_id: 36, value: '10' }, { product_id: 24, spec_id: 38, value: '2800' },
            { product_id: 25, spec_id: 1,  value: 'Alder Lake' },    { product_id: 25, spec_id: 27, value: 'LGA 1700' },  { product_id: 25, spec_id: 36, value: '16' }, { product_id: 25, spec_id: 38, value: '2400' },
            { product_id: 26, spec_id: 1,  value: 'Raptor Lake Refresh' }, { product_id: 26, spec_id: 27, value: 'LGA 1700' }, { product_id: 26, spec_id: 36, value: '24' }, { product_id: 26, spec_id: 38, value: '4300' },
            // Volante G29 (connection, vibration, compatible_platform, rotation_deg)
            { product_id: 27, spec_id: 3,  value: 'USB A' },         { product_id: 27, spec_id: 52, value: 'true' },      { product_id: 27, spec_id: 53, value: 'PC / PlayStation' }, { product_id: 27, spec_id: 54, value: '900' },
            // Webcam Brio 500 (connection, microphone, resolucion, fps)
            { product_id: 28, spec_id: 3,  value: 'USB C' },         { product_id: 28, spec_id: 14, value: 'true' },      { product_id: 28, spec_id: 22, value: '1280x720' },          { product_id: 28, spec_id: 51, value: '60' },
            // Volante G920
            { product_id: 29, spec_id: 3,  value: 'USB A' },         { product_id: 29, spec_id: 52, value: 'true' },      { product_id: 29, spec_id: 53, value: 'PC / Xbox' },         { product_id: 29, spec_id: 54, value: '900' },
            // Auriculares PRO X 2 (connection, microphone, rgb, sound)
            { product_id: 30, spec_id: 3,  value: 'wireless' },      { product_id: 30, spec_id: 14, value: 'true' },      { product_id: 30, spec_id: 23, value: 'false' },             { product_id: 30, spec_id: 28, value: 'surround' },
            // Mouse G305 (dpi, weight_g, connection, sensor)
            { product_id: 31, spec_id: 6,  value: '12000' },         { product_id: 31, spec_id: 35, value: '99' },        { product_id: 31, spec_id: 3,  value: 'wireless' },          { product_id: 31, spec_id: 24, value: 'hero' },
            // Teclado Corsair K65 (connection, layout, mechanical, switch)
            { product_id: 32, spec_id: 3,  value: 'usb' },           { product_id: 32, spec_id: 9,  value: 'compacto' },  { product_id: 32, spec_id: 12, value: 'true' },              { product_id: 32, spec_id: 32, value: 'Corsair OPX' },
            // Gabinete Corsair 7000X (dimensions_mm, form_factor, material, rgb)
            { product_id: 33, spec_id: 5,  value: '248x600x550' },   { product_id: 33, spec_id: 7,  value: 'ATX' },       { product_id: 33, spec_id: 10, value: 'VT' },                { product_id: 33, spec_id: 23, value: 'true' },
            // Mouse Corsair M55 (dpi, weight_g, connection, sensor)
            { product_id: 34, spec_id: 6,  value: '18000' },         { product_id: 34, spec_id: 35, value: '119' },       { product_id: 34, spec_id: 3,  value: 'usb' },               { product_id: 34, spec_id: 24, value: 'PWM 3391' },
            // Memoria Corsair DDR4 (ram_gb, ram_type, frequency_mhz, latency)
            { product_id: 35, spec_id: 17, value: '16' },            { product_id: 35, spec_id: 18, value: 'DDR4' },      { product_id: 35, spec_id: 38, value: '3200' },              { product_id: 35, spec_id: 39, value: '16 CL' },
            // Gabinete Corsair 2500D
            { product_id: 36, spec_id: 5,  value: '304x374x469' },   { product_id: 36, spec_id: 7,  value: 'M-ATX' },     { product_id: 36, spec_id: 10, value: 'VT' },                { product_id: 36, spec_id: 23, value: 'false' },
            // Gabinete HYTE Y70 Touch Infinite
            { product_id: 37, spec_id: 5,  value: '320x470x470' },   { product_id: 37, spec_id: 7,  value: 'ATX' },       { product_id: 37, spec_id: 10, value: 'VT' },                { product_id: 37, spec_id: 23, value: 'true' },
            // Gabinete HYTE Y70 Panda
            { product_id: 38, spec_id: 5,  value: '320x470x470' },   { product_id: 38, spec_id: 7,  value: 'ATX' },       { product_id: 38, spec_id: 10, value: 'VT' },                { product_id: 38, spec_id: 23, value: 'true' },
            // Gabinete HYTE Y40
            { product_id: 39, spec_id: 5,  value: '240x472x439' },   { product_id: 39, spec_id: 7,  value: 'M-ATX' },     { product_id: 39, spec_id: 10, value: 'VT' },                { product_id: 39, spec_id: 23, value: 'false' },
            // USB Hub HYTE (connection, material, rgb, type)
            { product_id: 40, spec_id: 3,  value: 'USB C' },         { product_id: 40, spec_id: 10, value: 'Plástico' },  { product_id: 40, spec_id: 23, value: 'false' },             { product_id: 40, spec_id: 33, value: 'Magnético' },
            // Gabinete HYTE Y60
            { product_id: 41, spec_id: 5,  value: '285x462x456' },   { product_id: 41, spec_id: 7,  value: 'ATX' },       { product_id: 41, spec_id: 10, value: 'VT' },                { product_id: 41, spec_id: 23, value: 'false' },
            // Teclado Apex 3 Black (connection, layout, mechanical, switch)
            { product_id: 42, spec_id: 3,  value: 'USB A' },         { product_id: 42, spec_id: 9,  value: 'completo' },  { product_id: 42, spec_id: 12, value: 'false' },             { product_id: 42, spec_id: 32, value: 'Whisper Quiet' },
            // Mouse Pad QcK XL (dimensions_mm, material, size, surface)
            { product_id: 43, spec_id: 5,  value: '400x900' },       { product_id: 43, spec_id: 10, value: 'Tela' },      { product_id: 43, spec_id: 25, value: 'XL' },                { product_id: 43, spec_id: 31, value: 'Deslizante' },
            // Auriculares Arctis Nova 3P (connection, microphone, rgb, sound)
            { product_id: 44, spec_id: 3,  value: 'wireless' },      { product_id: 44, spec_id: 14, value: 'true' },      { product_id: 44, spec_id: 23, value: 'false' },             { product_id: 44, spec_id: 28, value: 'surround' },
            // Mouse Aerox 9 (dpi, weight_g, connection, sensor)
            { product_id: 45, spec_id: 6,  value: '18000' },         { product_id: 45, spec_id: 35, value: '89' },        { product_id: 45, spec_id: 3,  value: 'wireless' },          { product_id: 45, spec_id: 24, value: 'Óptico' },
            // Teclado Apex 3 TKL (connection, layout, mechanical, switch)
            { product_id: 46, spec_id: 3,  value: 'USB A' },         { product_id: 46, spec_id: 9,  value: 'compacto' },  { product_id: 46, spec_id: 12, value: 'false' },             { product_id: 46, spec_id: 32, value: 'Whisper Quiet' },
            // Mouse Pad Kunlun (dimensions_mm, material, size, surface)
            { product_id: 47, spec_id: 5,  value: '420x880' },       { product_id: 47, spec_id: 10, value: 'Tela' },      { product_id: 47, spec_id: 25, value: 'XL' },                { product_id: 47, spec_id: 31, value: 'Deslizante' },
            // Joystick Redragon Juno (connection, rgb, vibration, compatible_platform)
            { product_id: 48, spec_id: 3,  value: 'wireless' },      { product_id: 48, spec_id: 23, value: 'false' },     { product_id: 48, spec_id: 52, value: 'true' },              { product_id: 48, spec_id: 53, value: 'PC' },
            // Silla Razer ISKUR V2 (material, max_weight_kg, recline_deg)
            { product_id: 49, spec_id: 10, value: 'Acero' },         { product_id: 49, spec_id: 11, value: '139' },       { product_id: 49, spec_id: 19, value: '152' },
            // Joystick Wolverine V3 (connection, rgb, vibration, compatible_platform)
            { product_id: 50, spec_id: 3,  value: 'USB C' },         { product_id: 50, spec_id: 23, value: 'false' },     { product_id: 50, spec_id: 52, value: 'true' },              { product_id: 50, spec_id: 53, value: 'Xbox' },
            // Auriculares BlackShark V3 Pro (connection, microphone, rgb, sound)
            { product_id: 51, spec_id: 3,  value: 'USB C' },         { product_id: 51, spec_id: 14, value: 'true' },      { product_id: 51, spec_id: 23, value: 'false' },             { product_id: 51, spec_id: 28, value: 'virtual' },
            // Auriculares BlackShark V2 X (connection, microphone, rgb, sound)
            { product_id: 52, spec_id: 3,  value: 'AUX' },           { product_id: 52, spec_id: 14, value: 'true' },      { product_id: 52, spec_id: 23, value: 'false' },             { product_id: 52, spec_id: 28, value: 'virtual' },
            // Cargador Samsung 45W (connection, material, rgb, type)
            { product_id: 53, spec_id: 3,  value: 'USB C' },         { product_id: 53, spec_id: 10, value: 'Plástico' },  { product_id: 53, spec_id: 23, value: 'false' },             { product_id: 53, spec_id: 33, value: 'Cargador' },
            // Monitor Odyssey G3 (panel, refresh_rate_hz, resolucion, size_inches)
            { product_id: 54, spec_id: 15, value: 'VA' },            { product_id: 54, spec_id: 21, value: '180' },       { product_id: 54, spec_id: 22, value: '1920x1080' },         { product_id: 54, spec_id: 26, value: '27' },
            // SSD Samsung 1TB (storage_gb, storage_type, read_speed_mbps, write_speed_mbps)
            { product_id: 55, spec_id: 29, value: '1000' },          { product_id: 55, spec_id: 30, value: 'SSD' },       { product_id: 55, spec_id: 42, value: '14800' },             { product_id: 55, spec_id: 43, value: '13400' },
            // Notebook Samsung Book 4 (cpu, ram_gb, ram_type, storage_gb, storage_type)
            { product_id: 56, spec_id: 4,  value: 'Intel Core i3 1315U' },
            { product_id: 56, spec_id: 17, value: '8' },
            { product_id: 56, spec_id: 18, value: 'DDR4' },
            { product_id: 56, spec_id: 29, value: '512' },
            { product_id: 56, spec_id: 30, value: 'SSD' },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('product_specs', null, {});
    },
};

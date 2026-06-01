-- ============================================================
--  TechBox - Base de datos completa (estructura + datos)
--  Ejecutar en MySQL Workbench con Ctrl+Shift+Enter
-- ============================================================

DROP DATABASE IF EXISTS techbox;
CREATE DATABASE techbox CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE techbox;

-- ============================================================
--  TABLAS
-- ============================================================

CREATE TABLE brands (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id         CHAR(36)     PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    username   VARCHAR(100) NOT NULL UNIQUE,
    type       VARCHAR(50)  NOT NULL,
    avatar     VARCHAR(255)
);

CREATE TABLE categories (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    slug      VARCHAR(150) NOT NULL UNIQUE,
    parent_id INT,
    CONSTRAINT fk_category_parent
        FOREIGN KEY (parent_id) REFERENCES categories(id)
        ON DELETE SET NULL
);

CREATE TABLE tags (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE specs (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE specs_labels (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    spec_id INT          NOT NULL,
    label   VARCHAR(150) NOT NULL,
    CONSTRAINT fk_specs_labels_spec
        FOREIGN KEY (spec_id) REFERENCES specs(id)
        ON DELETE CASCADE
);

CREATE TABLE products (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,
    brand_id     INT          NOT NULL,
    model        VARCHAR(100),
    price        INT          NOT NULL,
    old_price    INT,
    release_date DATE,
    img          VARCHAR(255),
    tier         VARCHAR(50),
    state        VARCHAR(50),
    featured     BOOLEAN DEFAULT FALSE,
    on_sale      BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_products_brand
        FOREIGN KEY (brand_id) REFERENCES brands(id)
        ON DELETE RESTRICT
);

CREATE TABLE product_categories (
    product_id  INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    CONSTRAINT fk_pc_product  FOREIGN KEY (product_id)  REFERENCES products(id)   ON DELETE CASCADE,
    CONSTRAINT fk_pc_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE product_tags (
    product_id INT NOT NULL,
    tag_id     INT NOT NULL,
    PRIMARY KEY (product_id, tag_id),
    CONSTRAINT fk_pt_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_pt_tag     FOREIGN KEY (tag_id)     REFERENCES tags(id)     ON DELETE CASCADE
);

CREATE TABLE product_specs (
    product_id INT          NOT NULL,
    spec_id    INT          NOT NULL,
    value      VARCHAR(255) NOT NULL,
    PRIMARY KEY (product_id, spec_id),
    CONSTRAINT fk_ps_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_ps_spec    FOREIGN KEY (spec_id)    REFERENCES specs(id)    ON DELETE CASCADE
);

CREATE TABLE category_specs (
    category_id INT         NOT NULL,
    spec_id     INT         NOT NULL,
    data_type   VARCHAR(50) NOT NULL,
    PRIMARY KEY (category_id, spec_id),
    CONSTRAINT fk_cs_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    CONSTRAINT fk_cs_spec     FOREIGN KEY (spec_id)     REFERENCES specs(id)      ON DELETE CASCADE
);

CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_state ON products(state);
CREATE INDEX idx_pc_category    ON product_categories(category_id);
CREATE INDEX idx_pt_tag         ON product_tags(tag_id);
CREATE INDEX idx_ps_spec        ON product_specs(spec_id);

-- ============================================================
--  DATOS
-- ============================================================

-- Marcas
INSERT INTO brands (id, name) VALUES
    (1, 'ASUS'),
    (2, 'AMD'),
    (3, 'Intel'),
    (4, 'NVIDIA'),
    (5, 'Logitech'),
    (6, 'Corsair'),
    (7, 'Hyte'),
    (8, 'Steelseries'),
    (9, 'Redragon'),
    (10, 'Razer'),
    (11, 'Samsung');

-- Categorías (padres primero para respetar FK)
INSERT INTO categories (id, name, slug, parent_id) VALUES
    (1, 'Procesador', 'procesador', NULL),
    (4, 'Placa de video', 'placa-de-video', NULL),
    (8, 'Memoria RAM', 'memoria-ram', NULL),
    (11, 'Almacenamiento', 'almacenamiento', NULL),
    (15, 'Motherboard', 'motherboard', NULL),
    (19, 'Refrigeración', 'refrigeracion', NULL),
    (23, 'Fuente de alimentacion', 'fuente-de-alimentacion', NULL),
    (25, 'Gabinete', 'gabinete', NULL),
    (28, 'Silla gamer', 'silla-gamer', NULL),
    (30, 'Periférico', 'periferico', NULL),
    (41, 'Monitor', 'monitor', NULL),
    (43, 'Notebook', 'notebook', NULL),
    (2, 'Procesador AMD', 'procesador-amd', 1),
    (3, 'Procesador Intel', 'procesador-intel', 1),
    (5, 'Placa de video GeForce', 'placa-de-video-geforce', 4),
    (6, 'Placa de video Radeon AMD', 'placa-de-video-radeon-amd', 4),
    (7, 'Placa de video Intel ARC', 'placa-de-video-intel-arc', 4),
    (9, 'Memoria', 'memoria', 8),
    (10, 'Memoria Notebook', 'memoria-notebook', 8),
    (12, 'Disco Externo', 'disco-externo', 11),
    (13, 'Disco Rígido', 'disco-rigido', 11),
    (14, 'Disco Solido SSD', 'disco-solido-ssd', 11),
    (16, 'Motherboard AMD', 'motherboard-amd', 15),
    (17, 'Motherboard Intel', 'motherboard-intel', 15),
    (18, 'Motherboard ASUS', 'motherboard-asus', 15),
    (20, 'Cooler Fan', 'cooler-fan', 19),
    (21, 'Cooler CPU', 'cooler-CPU', 19),
    (22, 'Pasta Térmica', 'pasta-termica', 19),
    (24, 'Fuente de alimentacion', 'fuente-de-alimentacion-sub', 23),
    (26, 'Gabinete', 'gabinete-sub', 25),
    (27, 'Cable, iluminación y otro', 'Cable-iluminacion-otro', 25),
    (29, 'Silla gamer', 'silla-gamer-sub', 28),
    (31, 'Auricular', 'auricular', 30),
    (32, 'Teclado', 'teclado', 30),
    (33, 'Mouse', 'mouse', 30),
    (34, 'Webcam', 'webcam', 30),
    (35, 'Joystick', 'joystick', 30),
    (36, 'Mouse Pad', 'mouse-pad', 30),
    (37, 'Parlante', 'parlante', 30),
    (38, 'Microfono', 'microfono', 30),
    (39, 'Volante', 'volante', 30),
    (40, 'Steam Deck', 'steam-deck', 30),
    (42, 'Monitor y Pantalla', 'monitor-y-pantalla', 41),
    (44, 'Notebook', 'notebook-sub', 43);

-- Tags
INSERT INTO tags (id, name) VALUES
    (1, 'gaming'),
    (2, 'rtx'),
    (3, 'rgb'),
    (4, 'wireless'),
    (5, 'usb'),
    (6, 'streaming'),
    (7, 'mecanico'),
    (8, 'sonido envolvente'),
    (9, 'xl'),
    (10, 'precision'),
    (11, '4k'),
    (12, 'ultrawide'),
    (13, 'alta'),
    (14, 'entrada'),
    (15, 'am4'),
    (16, 'oficina'),
    (17, 'economico'),
    (18, 'portatil'),
    (19, 'premium'),
    (20, 'rendimiento'),
    (21, 'ddr5');

-- Specs
INSERT INTO specs (id, name) VALUES
    (1, 'architecture'),
    (2, 'chipset'),
    (3, 'connection'),
    (4, 'cpu'),
    (5, 'dimensions_mm'),
    (6, 'dpi'),
    (7, 'form_factor'),
    (8, 'frequency_response'),
    (9, 'layout'),
    (10, 'material'),
    (11, 'max_weight_kg'),
    (12, 'mechanical'),
    (13, 'memory_type'),
    (14, 'microphone'),
    (15, 'panel'),
    (16, 'polar_pattern'),
    (17, 'ram_gb'),
    (18, 'ram_type'),
    (19, 'recline_deg'),
    (20, 'recommended_psu_w'),
    (21, 'refresh_rate_hz'),
    (22, 'resolucion'),
    (23, 'rgb'),
    (24, 'sensor'),
    (25, 'size'),
    (26, 'size_inches'),
    (27, 'socket'),
    (28, 'sound'),
    (29, 'storage_gb'),
    (30, 'storage_type'),
    (31, 'surface'),
    (32, 'switch'),
    (33, 'type'),
    (34, 'vram_gb'),
    (35, 'weight_g');

-- Labels de specs
INSERT INTO specs_labels (spec_id, label) VALUES
    (1, 'Arquitectura'),
    (2, 'Chipset'),
    (3, 'Conexión'),
    (4, 'Procesador'),
    (5, 'Dimensiones (mm)'),
    (6, 'DPI máximo'),
    (7, 'Formato'),
    (8, 'Respuesta de frecuencia'),
    (9, 'Formato'),
    (10, 'Material'),
    (11, 'Peso máximo (kg)'),
    (12, 'Mecánico'),
    (13, 'Tipo de memoria'),
    (14, 'Micrófono'),
    (15, 'Panel'),
    (16, 'Patrón polar'),
    (17, 'RAM (GB)'),
    (18, 'Tipo de RAM'),
    (19, 'Reclinación (°)'),
    (20, 'Fuente recomendada (W)'),
    (21, 'Frecuencia de actualización (Hz)'),
    (22, 'Resolución'),
    (23, 'Iluminación RGB'),
    (24, 'Sensor'),
    (25, 'Tamaño'),
    (26, 'Tamaño (pulgadas)'),
    (27, 'Socket'),
    (28, 'Sonido'),
    (29, 'Almacenamiento (GB)'),
    (30, 'Tipo de almacenamiento'),
    (31, 'Superficie'),
    (32, 'Switch'),
    (33, 'Tipo'),
    (34, 'VRAM (GB)'),
    (35, 'Peso (g)');

-- Productos
INSERT INTO products (id, name, brand_id, model, price, old_price, release_date, img, tier, state, featured, on_sale) VALUES
    (1, 'Logitech G703 Wireless HERO RGB', 5, 'G703', 90000, 95000, '2019-05-01', '/images/products/g703.jpg', 'alta', 'Publicado', 1, 1),
    (2, 'Microfono SteelSeries USB-C RGB', 8, 'Microfono Steelseries', 295950, 311525, '2023-09-15', '/images/products/steelseries-usb-c.jpg', 'alta', 'Publicado', 1, 1),
    (3, 'Teclado Redragon Mitra K551 RGB', 9, 'K551', 60000, 63150, '2018-03-10', '/images/products/redragon-k551.jpg', 'media', 'Publicado', 1, 1),
    (4, 'Auriculares Redragon Lamia H320 7.1', 9, 'H320', 68000, 71150, '2020-07-20', '/images/products/redragon-h320.jpg', 'media', 'Publicado', 1, 1),
    (5, 'Mouse Pad Corsair MM350 PRO XL', 6, 'MM350 PRO', 56600, 59580, '2021-02-15', '/images/products/corsair-mm350.jpg', 'media', 'Publicado', 1, 1),
    (6, 'Mouse Redragon Griffin', 9, 'Griffin', 20100, 21150, '2019-11-05', '/images/products/redragon-griffin.jpg', 'entrada', 'Publicado', 1, 1),
    (7, 'RX 9070 XT 16GB', 2, 'RX 9070 XT', 1199750, NULL, '2025-01-10', '/images/products/rx-9070-xt.jpg', 'alta', 'Publicado', 0, 0),
    (8, 'ASUS Vivobook Go 15', 1, 'Vivobook Go 15', 706900, NULL, '2024-06-01', '/images/products/asus-vivobook-15.jpg', 'entrada', 'Publicado', 0, 0),
    (9, 'Razer Iskur', 10, 'Iskur', 484650, NULL, '2025-01-15', '/images/products/razer-iskur.jpg', 'alta', 'Publicado', 0, 0),
    (10, 'Samsung Odyssey G9', 11, 'G9', 1764900, NULL, '2024-08-01', '/images/products/samsung-odyssey-g9.jpg', 'alta', 'Publicado', 0, 0),
    (11, 'ASUS Vivobook 15', 1, 'Vivobook 15', 962400, NULL, '2024-02-10', '/images/products/asus-vivobook-15.jpg', 'media', 'Publicado', 0, 0),
    (12, 'ASUS PRIME A520M-K', 1, 'A520M-K', 86750, NULL, '2020-08-18', '/images/products/asus-prime-a520m-k.jpg', 'entrada', 'Publicado', 0, 0),
    (13, 'ASUS Vivobook Go 15 DDR5', 1, 'Vivobook Go 15', 719450, NULL, '2024-05-20', '/images/products/asus-vivobook-15.jpg', 'entrada', 'Publicado', 0, 0),
    (14, 'ASUS VY229HF-J', 1, 'VY229HF-J', 149450, NULL, '2023-03-12', '/images/products/asus-vy229hf-j.jpg', 'entrada', 'Publicado', 0, 0),
    (15, 'ASUS VY229HF-J (Alt)', 1, 'VY229HF-J', 168550, NULL, '2023-03-12', '/images/products/asus-vy229hf-j-alt.jpg', 'entrada', 'Publicado', 0, 0),
    (16, 'ASUS Dual GeForce RTX 5060 OC', 1, 'RTX 5060', 687950, NULL, '2025-02-20', '/images/products/asus-dual-rtx-5060.jpg', 'media', 'Publicado', 0, 0);

-- Categorías de productos
INSERT INTO product_categories (product_id, category_id) VALUES
    (1, 30),
    (1, 33),
    (2, 30),
    (2, 38),
    (3, 30),
    (3, 32),
    (4, 30),
    (4, 31),
    (5, 30),
    (5, 36),
    (6, 30),
    (6, 33),
    (7, 4),
    (7, 6),
    (8, 43),
    (8, 44),
    (9, 28),
    (9, 29),
    (10, 41),
    (10, 42),
    (11, 43),
    (11, 44),
    (12, 15),
    (12, 18),
    (13, 43),
    (13, 44),
    (14, 41),
    (14, 42),
    (15, 41),
    (15, 42),
    (16, 4),
    (16, 5);

-- Tags de productos
INSERT INTO product_tags (product_id, tag_id) VALUES
    (1, 1),
    (1, 4),
    (1, 3),
    (2, 6),
    (2, 3),
    (2, 5),
    (3, 1),
    (3, 3),
    (3, 7),
    (4, 1),
    (4, 3),
    (4, 8),
    (5, 1),
    (5, 9),
    (5, 10),
    (6, 1),
    (6, 3),
    (6, 17),
    (7, 1),
    (7, 13),
    (7, 11),
    (8, 16),
    (8, 18),
    (9, 1),
    (9, 19),
    (10, 1),
    (10, 12),
    (11, 16),
    (11, 20),
    (12, 14),
    (12, 15),
    (13, 16),
    (13, 21),
    (14, 1),
    (14, 17),
    (15, 1),
    (16, 1),
    (16, 2);

-- Specs de productos
INSERT INTO product_specs (product_id, spec_id, value) VALUES
    (1, 6, '16000'),
    (1, 35, '107'),
    (1, 3, 'wireless'),
    (1, 24, 'hero'),
    (2, 16, 'cardioide'),
    (2, 33, 'condensador'),
    (2, 3, 'usb-c'),
    (2, 8, '20hz-20khz'),
    (3, 32, 'red'),
    (3, 9, 'full'),
    (3, 3, 'usb'),
    (3, 12, 'true'),
    (4, 14, 'true'),
    (4, 28, '7.1 surround'),
    (4, 3, 'wired'),
    (4, 23, 'true'),
    (5, 25, 'xl'),
    (5, 5, '930x400'),
    (5, 10, 'tela'),
    (5, 31, 'speed'),
    (6, 6, '7200'),
    (6, 35, '151'),
    (6, 3, 'wired'),
    (6, 24, 'optico'),
    (7, 34, '16'),
    (7, 13, 'GDDR6'),
    (7, 1, 'RDNA'),
    (7, 20, '750'),
    (8, 4, 'ryzen 5 7520U'),
    (8, 17, '8'),
    (8, 29, '512'),
    (8, 30, 'ssd'),
    (9, 10, 'tela'),
    (9, 11, '136'),
    (9, 19, '180'),
    (10, 26, '49'),
    (10, 22, '5120x1440'),
    (10, 21, '144'),
    (10, 15, 'VA'),
    (11, 4, 'ryzen 7 7825U'),
    (11, 17, '16'),
    (11, 29, '512'),
    (11, 30, 'ssd'),
    (12, 27, 'AM4'),
    (12, 2, 'A520'),
    (12, 7, 'm-atx'),
    (12, 18, 'DDR4'),
    (13, 4, 'ryzen 5 7520U'),
    (13, 17, '8'),
    (13, 18, 'DDR5'),
    (13, 29, '512'),
    (14, 26, '22'),
    (14, 22, '1920x1080'),
    (14, 21, '100'),
    (14, 15, 'IPS'),
    (15, 26, '22'),
    (15, 22, '1920x1080'),
    (15, 21, '100'),
    (15, 15, 'IPS'),
    (16, 34, '8'),
    (16, 13, 'GDDR7'),
    (16, 1, 'RTX'),
    (16, 20, '550');

-- Specs por categoría
INSERT INTO category_specs (category_id, spec_id, data_type) VALUES
    (5, 1, 'string'),
    (5, 13, 'string'),
    (5, 20, 'number'),
    (5, 34, 'number'),
    (6, 1, 'string'),
    (6, 13, 'string'),
    (6, 20, 'number'),
    (6, 34, 'number'),
    (18, 2, 'string'),
    (18, 7, 'string'),
    (18, 18, 'string'),
    (18, 27, 'string'),
    (29, 10, 'string'),
    (29, 11, 'number'),
    (29, 19, 'number'),
    (31, 3, 'string'),
    (31, 14, 'boolean'),
    (31, 23, 'boolean'),
    (31, 28, 'string'),
    (32, 3, 'string'),
    (32, 9, 'string'),
    (32, 12, 'boolean'),
    (32, 32, 'string'),
    (33, 3, 'string'),
    (33, 6, 'number'),
    (33, 24, 'string'),
    (33, 35, 'number'),
    (36, 5, 'string'),
    (36, 10, 'string'),
    (36, 25, 'string'),
    (36, 31, 'string'),
    (38, 3, 'string'),
    (38, 8, 'string'),
    (38, 16, 'string'),
    (38, 33, 'string'),
    (42, 15, 'string'),
    (42, 21, 'number'),
    (42, 22, 'string'),
    (42, 26, 'number'),
    (44, 4, 'string'),
    (44, 17, 'number'),
    (44, 18, 'string'),
    (44, 29, 'number'),
    (44, 30, 'string');

-- ============================================================
--  Fin del script
-- ============================================================
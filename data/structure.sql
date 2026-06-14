-- ============================================================
--  TechBox - Estructura de la base de datos
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
    state        BOOLEAN NOT NULL DEFAULT FALSE,
    featured     BOOLEAN NOT NULL DEFAULT FALSE,
    on_sale      BOOLEAN NOT NULL DEFAULT FALSE,
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
--  Fin del script
-- ============================================================

const { Product, Category, Tag, Spec } = require('./index');
const sequelize = require('../utils/database');

const AdminModel = {
    create: async (newProduct) => {
        try {
            const product = await Product.create({
                name:         newProduct.name,
                brand_id:     newProduct.brand_id,
                model:        newProduct.model,
                price:        newProduct.price,
                old_price:    newProduct.old_price,
                release_date: newProduct.release_date,
                img:          newProduct.img,
                tier:         newProduct.tier,
                state:        newProduct.state ? 'Publicado' : 'No Publicado',
                featured:     !!newProduct.featured,
                on_sale:      !!newProduct.on_sale,
            });
            return product.id;
        } catch (e) {
            console.error('Error creando producto: ', e);
            throw e;
        }
    },

    update: async (id, updatedProduct) => {
        try {
            await Product.update(
                {
                    name:         updatedProduct.name,
                    brand_id:     updatedProduct.brand_id,
                    model:        updatedProduct.model,
                    price:        updatedProduct.price,
                    old_price:    updatedProduct.old_price,
                    release_date: updatedProduct.release_date,
                    img:          updatedProduct.img,
                    tier:         updatedProduct.tier,
                    state:        updatedProduct.state ? 'Publicado' : 'No Publicado',
                    featured:     !!updatedProduct.featured,
                    on_sale:      !!updatedProduct.on_sale,
                },
                { where: { id } }
            );
        } catch (e) {
            console.error('Error actualizando producto: ', e);
            throw e;
        }
    },

    delete: async (id) => {
        try {
            await Product.destroy({ where: { id } });
        } catch (e) {
            console.error('Error eliminando producto: ', e);
            throw e;
        }
    },

    // ── Categorías ────────────────────────────────────────────────────────
    addCategory: async (productId, categoryId) => {
        try {
            const product  = await Product.findByPk(productId);
            const category = await Category.findByPk(categoryId);
            if (product && category) await product.addCategory(category);
        } catch (e) {
            console.error('Error agregando categoría al producto: ', e);
            throw e;
        }
    },

    deleteCategories: async (productId) => {
        try {
            const product = await Product.findByPk(productId);
            if (product) await product.setCategories([]);
        } catch (e) {
            console.error('Error eliminando categorías del producto: ', e);
            throw e;
        }
    },

    // ── Tags ──────────────────────────────────────────────────────────────
    addTag: async (productId, tagId) => {
        try {
            const product = await Product.findByPk(productId);
            const tag     = await Tag.findByPk(tagId);
            if (product && tag) await product.addTag(tag);
        } catch (e) {
            console.error('Error agregando tag al producto: ', e);
            throw e;
        }
    },

    deleteTags: async (productId) => {
        try {
            const product = await Product.findByPk(productId);
            if (product) await product.setTags([]);
        } catch (e) {
            console.error('Error eliminando tags del producto: ', e);
            throw e;
        }
    },

    // ── Specs ─────────────────────────────────────────────────────────────
    // Sequelize no soporta valores extra en tablas pivot con belongsToMany
    // de forma directa, así que usamos una query cruda solo para esta tabla.
    addSpec: async (productId, specId, value) => {
        try {
            await sequelize.query(
                'INSERT INTO product_specs (product_id, spec_id, value) VALUES (?, ?, ?)',
                { replacements: [productId, specId, value] }
            );
        } catch (e) {
            console.error('Error agregando spec: ', e);
            throw e;
        }
    },

    deleteSpecs: async (productId) => {
        try {
            await sequelize.query(
                'DELETE FROM product_specs WHERE product_id = ?',
                { replacements: [productId] }
            );
        } catch (e) {
            console.error('Error eliminando specs del producto: ', e);
            throw e;
        }
    },
};

module.exports = AdminModel;

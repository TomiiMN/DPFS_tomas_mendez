const { Product, Category, Tag, Spec } = require('./index');
const sequelize = require('../../src/utils/database');

const AdminModel = {
    create: async (newProduct, t) => {
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
                state:        !!newProduct.state,
                featured:     !!newProduct.featured,
                on_sale:      !!newProduct.on_sale,
            }, { transaction: t });
            return product.id;
        } catch (e) {
            await t.rollback();
            console.error('Error creando producto: ', e);
            throw e;
        }
    },

    update: async (id, updatedProduct, t) => {
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
                    state:        !!updatedProduct.state,
                    featured:     !!updatedProduct.featured,
                    on_sale:      !!updatedProduct.on_sale,
                },
                { where: { id }, transaction: t }
            );
        } catch (e) {
            await t.rollback();
            console.error('Error actualizando producto: ', e);
            throw e;
        }
    },

    delete: async (id, t) => {
        try {
            await Product.destroy({ where: { id }, transaction: t });
        } catch (e) {
            await t.rollback();
            console.error('Error eliminando producto: ', e);
            throw e;
        }
    },

    addCategory: async (productId, categoryId, t) => {
        try {
            const product  = await Product.findByPk(productId, { transaction: t });
            const category = await Category.findByPk(categoryId, { transaction: t });
            if (product && category) {
                await product.addCategory(category, { transaction: t });
            };
        } catch (e) {
            await t.rollback();
            console.error('Error agregando categoría al producto: ', e);
            throw e;
        }
    },

    deleteCategories: async (productId, t) => {
        try {
            const product = await Product.findByPk(productId, { transaction: t });
            if (product) await product.setCategories([], { transaction: t });
        } catch (e) {
            await t.rollback();
            console.error('Error eliminando categorías del producto: ', e);
            throw e;
        }
    },

    addTag: async (productId, tagId, t) => {
        try {
            const product = await Product.findByPk(productId, { transaction: t });
            const tag     = await Tag.findByPk(tagId, { transaction: t });
            if (product && tag) await product.addTag(tag, { transaction: t });
        } catch (e) {
            await t.rollback();
            console.error('Error agregando tag al producto: ', e);
            throw e;
        }
    },

    deleteTags: async (productId, t) => {
        try {
            const product = await Product.findByPk(productId, { transaction: t });
            if (product) await product.setTags([], { transaction: t });
        } catch (e) {
            await t.rollback();
            console.error('Error eliminando tags del producto: ', e);
            throw e;
        }
    },

    addSpec: async (productId, specId, value, t) => {
        try {
            await sequelize.query(
                'INSERT INTO product_specs (product_id, spec_id, value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
                { replacements: [productId, specId, value], transaction: t }
            );
        } catch (e) {
            await t.rollback();
            console.error('Error agregando spec: ', e);
            throw e;
        }
    },

    deleteSpecs: async (productId, t) => {
        try {
            await sequelize.query(
                'DELETE FROM product_specs WHERE product_id = ?',
                { replacements: [productId], transaction: t }
            );
        } catch (e) {
            await t.rollback();
            console.error('Error eliminando specs del producto: ', e);
            throw e;
        }
    },
};

module.exports = AdminModel;

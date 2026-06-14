const adminModel = require("../../database/models/admin-model");
const productsModel = require("../../database/models/products-model");
const categoriesModel = require("../../database/models/categories-model");
const brandsModel = require("../../database/models/brands-model");
const tagsModel = require("../../database/models/tags-model");
const { Tag, Spec, SpecLabel, CategorySpec, Brand, Category } = require("../../database/models/index");
const { validationResult } = require('express-validator');
const sequelize = require("../utils/database");
async function getSpecsLabels() {
    const rows = await SpecLabel.findAll({
        include: [{ model: Spec, attributes: ['name'] }],
    });
    return rows.reduce((acc, row) => {
        const r = row.toJSON();
        if (r.Spec?.name) acc[r.Spec.name] = r.label;
        return acc;
    }, {});
}
async function getSpecsConfig() {
    const rows = await CategorySpec.findAll({
        include: [{
            model: Spec,
            as: 'spec',
            include: [{ model: SpecLabel, as: 'label' }],
        }],
    });
    return rows.reduce((acc, row) => {
        const r = row.toJSON();
        if (!acc[r.category_id]) acc[r.category_id] = [];
        acc[r.category_id].push({
            id: r.spec_id,
            name: r.spec?.name ?? '',
            data_type: r.data_type,
            label: r.spec?.label?.label ?? r.spec?.name ?? '',
        });
        return acc;
    }, {});
}
async function getFormData() {
    const [brands, categories, tags, specs] = await Promise.all([
        Brand.findAll({ order: [['name', 'ASC']] }),
        Category.findAll({
            where: { parent_id: null },
            include: [{ model: Category, as: 'subcategories' }],
            order: [
                ['name', 'ASC'],
                [{ model: Category, as: 'subcategories' }, 'name', 'ASC'],
            ],
        }),

        Tag.findAll({ order: [['name', 'ASC']] }),
        Spec.findAll({ include: [{ model: SpecLabel, as: 'label' }] }),
    ]);
    return { brands, categories, tags, specs };
};
async function resolveTagIds(tagNames) {
    if (!tagNames || tagNames.length === 0) return [];
    const tags = await Tag.findAll({
        where: { name: tagNames },
        raw: true,
    });
    return tags.map(t => t.id);
};
function parseSpecs(body) {
    return Object.fromEntries(
        Object.entries(body)
            .filter(([k, v]) => /^spec_id_\d+$/.test(k) && String(v).trim() !== '')
            .map(([k, v]) => [k.replace('spec_id_', ''), v])
    );
};
const adminController = {
    index: async (req, res) => {
        try {
            const products = await productsModel.getAll();
            const allCategories = await categoriesModel.getAll();
            const categories = allCategories.filter(cat => cat.parent_id === null);
            res.render("admin/admin-products", { products, categories });
        } catch (e) {
            console.error("Error cargando productos:", e);
            res.status(500).render("error", { message: "No se pudieron cargar los productos. Intentá de nuevo más tarde." });
        }
    },
    create: async (req, res) => {
        try {
            const [formData, specsLabels, specsConfig] = await Promise.all([
                getFormData(),
                getSpecsLabels(),
                getSpecsConfig(),
            ]);
            res.render("admin/create-product", { ...formData, specsLabels, specsConfig, oldData: {} });
        } catch (e) {
            console.error("Error cargando formulario de creación:", e);
            res.status(500).render("error", { message: "No se pudo cargar el formulario. Intentá de nuevo más tarde." });
        }
    },
    detail: async (req, res) => {
        try {
            const [product, specsLabels] = await Promise.all([
                productsModel.getById(req.params.id),
                getSpecsLabels(),
            ]);
            if (!product) return res.redirect("/admin/products");
            res.render("admin/admin-detail", { product, specsLabels });
        } catch (e) {
            console.error("Error cargando detalle del producto:", e);
            res.status(500).render("error", { message: "No se pudo cargar el producto. Intentá de nuevo más tarde." });
        }
    },
    edit: async (req, res) => {
        try {
            const [product, formData, specsLabels, specsConfig] = await Promise.all([
                productsModel.getById(req.params.id),
                getFormData(),
                getSpecsLabels(),
                getSpecsConfig(),
            ]);
            if (!product) return res.redirect("/admin/products");
            res.render("admin/edit-product", { product, ...formData, specsLabels, specsConfig, oldData: {} });
        } catch (e) {
            console.error("Error cargando formulario de edición:", e);
            res.status(500).render("error", { message: "No se pudo cargar el formulario. Intentá de nuevo más tarde." });
        }
    },
    store: async (req, res) => {
        const data = req.body;
        const [formData, specsLabels, specsConfig] = await Promise.all([
            getFormData(),
            getSpecsLabels(),
            getSpecsConfig(),
        ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("admin/create-product", {
                ...formData,
                specsLabels,
                specsConfig,
                warning: errors.array(),
                oldData: data,
            });
        }
        const t = await sequelize.transaction();
        try {
            const newProduct = {
                name: data.name,
                brand_id: Number(data.brand_id),
                model: data.model,
                price: Number(data.price),
                old_price: data.oldPrice ? Number(data.oldPrice) : null,
                release_date: data.releaseDate,
                img: data.img,
                tier: data.tier,
                state: data.onPublic === 'true',
                featured: data.featured === 'true',
                on_sale: data.onSale === 'true',
            };
            const productId = await adminModel.create(newProduct, t);
            await adminModel.addCategory(productId, Number(data.category_id), t);
            await adminModel.addCategory(productId, Number(data.subcategory_id), t);
            if (data.tags) {
                const tagNames = JSON.parse(data.tags);
                const tagIds = await resolveTagIds(tagNames);
                for (const tagId of tagIds) {
                    await adminModel.addTag(productId, tagId, t);
                }
            }
            const specs = parseSpecs(data);
            for (const [specId, value] of Object.entries(specs)) {
                await adminModel.addSpec(productId, Number(specId), value, t);
            }
            await t.commit();
            res.redirect("/admin/products");
        } catch (e) {
            await t.rollback();
            console.error("Error creando producto:", e);
            return res.render("admin/create-product", {
                ...formData,
                specsLabels,
                specsConfig,
                warning: "Ocurrió un error al crear el producto. Intentá de nuevo.",
                oldData: data,
            });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const [product, formData, specsLabels, specsConfig] = await Promise.all([
            productsModel.getById(id),
            getFormData(),
            getSpecsLabels(),
            getSpecsConfig(),
        ]);
        if (!product) return res.redirect("/admin/products");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("admin/edit-product", {
                product,
                ...formData,
                specsLabels,
                specsConfig,
                warning: errors.array(),
                oldData: data,
            });
        }
        const t = await sequelize.transaction();
        try {
            const updatedProduct = {
                name: data.name,
                brand_id: Number(data.brand_id),
                model: data.model,
                price: Number(data.price),
                old_price: data.oldPrice ? Number(data.oldPrice) : null,
                release_date: data.releaseDate,
                img: data.img,
                tier: data.tier,
                state: data.onPublic === 'true',
                featured: data.featured === 'true',
                on_sale: data.onSale === 'true',
            };
            await adminModel.update(id, updatedProduct, t);
            await adminModel.deleteCategories(id, t);
            await adminModel.deleteTags(id, t);
            await adminModel.addCategory(id, Number(data.category_id), t);
            await adminModel.addCategory(id, Number(data.subcategory_id), t);
            if (data.tags) {
                const tagNames = JSON.parse(data.tags);
                const tagIds = await resolveTagIds(tagNames);
                for (const tagId of tagIds) {
                    await adminModel.addTag(id, tagId, t);
                }
            };
            if (data.specs_editable === '1') {
                await adminModel.deleteSpecs(id, t);
                const specs = parseSpecs(data);
                for (const [specId, value] of Object.entries(specs)) {
                    await adminModel.addSpec(id, Number(specId), value, t);
                }
            };
            await t.commit();
            res.redirect("/admin/products");
        } catch (e) {
            await t.rollback();
            console.error("Error actualizando producto:", e);
            res.render("admin/edit-product", {
                product,
                ...formData,
                specsLabels,
                specsConfig,
                warning: "Ocurrió un error al actualizar el producto. Intentá de nuevo.",
                oldData: data,
            });
        }
    },
    dashboard: (req, res) => {
        res.render("admin/dashboard");
    },
    destroy: async (req, res) => {
        try {
            const product = await productsModel.getById(req.params.id);
            if (!product) return res.redirect("/admin/products");
            await adminModel.delete(req.params.id);
            res.redirect("/admin/products");
        } catch (e) {
            console.error("Error eliminando producto:", e);
            res.status(500).render("error", { message: "No se pudo eliminar el producto. Intentá de nuevo más tarde." });
        }
    },
};

module.exports = adminController;

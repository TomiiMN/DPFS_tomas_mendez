const adminModel = require("../models/admin-model");
const productsModel = require("../models/products-model");
const categoriesModel = require("../models/categories-model");
const brandsModel = require("../models/brands-model");
const tagsModel = require("../models/tags-model");
const { Tag, Spec, SpecLabel, CategorySpec } = require("../models/index");
const { validationResult } = require('express-validator');

// ── Helpers ────────────────────────────────────────────────────────────────

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

// Carga todos los datos del formulario en un solo lugar.
async function getFormData() {
    const [categories, brands, tags, specsLabels, specsConfig] = await Promise.all([
        categoriesModel.getAll(),
        brandsModel.getAll(),
        tagsModel.getAll(),
        getSpecsLabels(),
        getSpecsConfig(),
    ]);
    return { categories, brands, tags, specsLabels, specsConfig };
}

// Los tags llegan como array de nombres (strings) desde el hidden input.
// Necesitamos convertirlos a IDs buscándolos en la DB.
async function resolveTagIds(tagNames) {
    if (!tagNames || tagNames.length === 0) return [];
    const tags = await Tag.findAll({
        where: { name: tagNames },
        raw: true,
    });
    return tags.map(t => t.id);
}

// Las specs llegan como objeto { specId: value } desde Express bodyParser.
// Filtramos los vacíos para no insertar specs sin valor.
function parseSpecs(specsObj) {
    if (!specsObj || typeof specsObj !== 'object') return {};
    return Object.fromEntries(
        Object.entries(specsObj).filter(([, v]) => String(v).trim() !== '')
    );
}

// ── Controlador ────────────────────────────────────────────────────────────

const adminController = {

    index: async (req, res) => {
        const products = await productsModel.getAll();
        const allCategories = await categoriesModel.getAll();
        const categories = allCategories.filter(cat => cat.parent_id === null);
        res.render("admin/admin-products", { products, categories });
    },

    create: async (req, res) => {
        const formData = await getFormData();
        res.render("admin/create-product", { ...formData, oldData: {} });
    },

    detail: async (req, res) => {
        const [product, specsLabels] = await Promise.all([
            productsModel.getById(req.params.id),
            getSpecsLabels(),
        ]);
        res.render("admin/admin-detail", { product, specsLabels });
    },

    edit: async (req, res) => {
        const [product, formData] = await Promise.all([
            productsModel.getById(req.params.id),
            getFormData(),
        ]);
        res.render("admin/edit-product", { product, ...formData, oldData: {} });
    },

    store: async (req, res) => {
        const data = req.body;
        const formData = await getFormData();

        // 1. Validaciones de Express Validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("admin/create-product", {
                ...formData,
                warning: errors.array()[0].msg,
                oldData: data,
            });
        }

        // 2. Lógica de negocio
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

            const productId = await adminModel.create(newProduct);

            // Categorías
            await adminModel.addCategory(productId, Number(data.category_id));
            await adminModel.addCategory(productId, Number(data.subcategory_id));

            // Tags — el hidden input guarda un JSON array de nombres
            if (data.tags) {
                const tagNames = JSON.parse(data.tags);
                const tagIds = await resolveTagIds(tagNames);
                for (const tagId of tagIds) {
                    await adminModel.addTag(productId, tagId);
                }
            }

            // Specs — llegan como specs[specId] = value (objeto, no JSON)
            const specs = parseSpecs(data.specs);
            for (const [specId, value] of Object.entries(specs)) {
                await adminModel.addSpec(productId, Number(specId), value);
            }

            res.redirect("/admin/products");

        } catch (e) {
            console.error("Error creando producto:", e);
            return res.render("admin/create-product", {
                ...formData,
                warning: "Ocurrió un error al crear el producto. Intentá de nuevo.",
                oldData: data,
            });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        const [product, formData] = await Promise.all([
            productsModel.getById(id),
            getFormData(),
        ]);

        if (!product) return res.redirect("/admin/products");

        // 1. Validaciones de Express Validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("admin/edit-product", {
                product,
                ...formData,
                warning: errors.array()[0].msg,
                oldData: data,
            });
        }

        // 2. Lógica de negocio
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

            await adminModel.update(id, updatedProduct);

            // Relaciones — borramos todo y volvemos a insertar
            await adminModel.deleteCategories(id);
            await adminModel.deleteTags(id);

            await adminModel.addCategory(id, Number(data.category_id));
            await adminModel.addCategory(id, Number(data.subcategory_id));

            // Tags — misma lógica que en store
            if (data.tags) {
                const tagNames = JSON.parse(data.tags);
                const tagIds = await resolveTagIds(tagNames);
                for (const tagId of tagIds) {
                    await adminModel.addTag(id, tagId);
                }
            }

            // Specs
            await adminModel.deleteSpecs(id);
            const specs = parseSpecs(data.specs);
            for (const [specId, value] of Object.entries(specs)) {
                await adminModel.addSpec(id, Number(specId), value);
            }

            res.redirect("/admin/products");

        } catch (e) {
            console.error("Error actualizando producto:", e);
            res.render("admin/edit-product", {
                product,
                ...formData,
                warning: "Ocurrió un error al actualizar el producto. Intentá de nuevo.",
                oldData: data,
            });
        }
    },

    destroy: async (req, res) => {
        const product = await productsModel.getById(req.params.id);
        if (!product) return res.redirect("/admin/products");
        await adminModel.delete(req.params.id);
        res.redirect("/admin/products");
    },
};

module.exports = adminController;

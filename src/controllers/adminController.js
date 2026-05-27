const adminModel       = require("../models/adminModel");
const productsModel    = require("../models/productsModel");
const categoriesModel  = require("../models/categoriesModel");
const brandsModel      = require("../models/brandsModel");
const tagsModel        = require("../models/tagsModel");
const { Spec, SpecLabel, CategorySpec } = require("../models/index");

// ── Helpers para traer specsLabels y specsConfig desde la DB ───────────────

// Devuelve un objeto { [spec_id]: "Label legible" }
// equivalente al antiguo specsLabels.js
async function getSpecsLabels() {
    const rows = await SpecLabel.findAll({ raw: true });
    return rows.reduce((acc, row) => {
        acc[row.spec_id] = row.label;
        return acc;
    }, {});
}

// Devuelve un objeto { [category_id]: [ { id, name, data_type, label } ] }
// equivalente al antiguo specsConfig.js
async function getSpecsConfig() {
    const rows = await CategorySpec.findAll({
        include: [
            {
                model: Spec,
                as: 'spec',
                include: [{ model: SpecLabel, as: 'label' }],
            },
        ],
    });

    return rows.reduce((acc, row) => {
        const r = row.toJSON();
        if (!acc[r.category_id]) acc[r.category_id] = [];
        acc[r.category_id].push({
            id:        r.spec_id,
            name:      r.spec?.name      ?? '',
            data_type: r.data_type,
            label:     r.spec?.label?.label ?? r.spec?.name ?? '',
        });
        return acc;
    }, {});
}

// ── Controlador ────────────────────────────────────────────────────────────

const adminController = {
    index: async (req, res) => {
        const products      = await productsModel.getAll();
        const allCategories = await categoriesModel.getAll();
        const categories    = allCategories.filter(cat => cat.parent_id === null);
        res.render("admin/adminProducts", { products, categories });
    },

    create: async (req, res) => {
        const [categories, brands, tags, specsLabels, specsConfig] = await Promise.all([
            categoriesModel.getAll(),
            brandsModel.getAll(),
            tagsModel.getAll(),
            getSpecsLabels(),
            getSpecsConfig(),
        ]);
        res.render("admin/createProduct", {
            categories, brands, tags, specsLabels, specsConfig, oldData: {}
        });
    },

    detail: async (req, res) => {
        const [product, specsLabels] = await Promise.all([
            productsModel.getById(req.params.id),
            getSpecsLabels(),
        ]);
        res.render("admin/adminDetail", { product, specsLabels });
    },

    edit: async (req, res) => {
        const [product, categories, brands, tags, specsLabels, specsConfig] = await Promise.all([
            productsModel.getById(req.params.id),
            categoriesModel.getAll(),
            brandsModel.getAll(),
            tagsModel.getAll(),
            getSpecsLabels(),
            getSpecsConfig(),
        ]);
        res.render("admin/editProduct", {
            product, categories, brands, tags, specsLabels, specsConfig, oldData: {}
        });
    },

    store: async (req, res) => {
        const data = req.body;

        const [categories, brands, tags, specsLabels, specsConfig] = await Promise.all([
            categoriesModel.getAll(),
            brandsModel.getAll(),
            tagsModel.getAll(),
            getSpecsLabels(),
            getSpecsConfig(),
        ]);

        if (!data.name || !data.brand_id || !data.model || !data.price || !data.oldPrice ||
            !data.releaseDate || !data.category_id || !data.subcategory_id || !data.img || !data.tier) {
            return res.render("admin/createProduct", {
                categories, brands, tags, specsLabels, specsConfig,
                warning: "Todos los campos son obligatorios",
                oldData: data,
            });
        }

        try {
            const newProduct = {
                name:         data.name,
                brand_id:     Number(data.brand_id),
                model:        data.model,
                price:        Number(data.price),
                old_price:    Number(data.oldPrice),
                release_date: data.releaseDate,
                img:          data.img,
                tier:         data.tier,
                state:        data.onPublic,
                featured:     data.featured,
                on_sale:      data.onSale,
            };
            const productId = await adminModel.create(newProduct);
            await adminModel.addCategory(productId, Number(data.category_id));
            await adminModel.addCategory(productId, Number(data.subcategory_id));

            if (data.tags) {
                const selectedTags = JSON.parse(data.tags);
                for (const tagId of selectedTags) {
                    await adminModel.addTag(productId, Number(tagId));
                }
            }
            if (data.specs) {
                const specs = JSON.parse(data.specs);
                for (const specId in specs) {
                    const value = specs[specId];
                    if (value && value.trim() !== "") {
                        await adminModel.addSpec(productId, Number(specId), value);
                    }
                }
            }
        } catch (e) {
            console.error("Error creando producto: ", e);
            return res.render("admin/createProduct", {
                categories, brands, tags, specsLabels, specsConfig,
                oldData: data,
                warning: "Error creando producto",
            });
        }

        res.redirect("/admin/products");
    },

    update: async (req, res) => {
        const id   = req.params.id;
        const data = req.body;

        const [product, categories, brands, tags, specsLabels, specsConfig] = await Promise.all([
            productsModel.getById(id),
            categoriesModel.getAll(),
            brandsModel.getAll(),
            tagsModel.getAll(),
            getSpecsLabels(),
            getSpecsConfig(),
        ]);

        if (!product) return res.redirect("/admin/products");

        if (!data.name || !data.brand_id || !data.model || !data.price || !data.oldPrice ||
            !data.releaseDate || !data.category_id || !data.subcategory_id || !data.img || !data.tier) {
            return res.render("admin/editProduct", {
                product, categories, brands, tags, specsLabels, specsConfig,
                warning: "Todos los campos son obligatorios",
                oldData: data,
            });
        }

        try {
            const updatedProduct = {
                name:         data.name,
                brand_id:     Number(data.brand_id),
                model:        data.model,
                price:        Number(data.price),
                old_price:    Number(data.oldPrice),
                release_date: data.releaseDate,
                img:          data.img,
                tier:         data.tier,
                state:        data.onPublic,
                featured:     data.featured,
                on_sale:      data.onSale,
            };
            await adminModel.update(id, updatedProduct);
            await adminModel.deleteCategories(id);
            await adminModel.deleteTags(id);
            await adminModel.addCategory(id, Number(data.category_id));
            await adminModel.addCategory(id, Number(data.subcategory_id));

            if (data.tags) {
                const selectedTags = JSON.parse(data.tags);
                for (const tagId of selectedTags) {
                    await adminModel.addTag(id, Number(tagId));
                }
            }
            await adminModel.deleteSpecs(id);
            if (data.specs) {
                const specs = JSON.parse(data.specs);
                for (const specId in specs) {
                    const value = specs[specId];
                    if (value && value.trim() !== "") {
                        await adminModel.addSpec(id, Number(specId), value);
                    }
                }
            }

            res.redirect("/admin/products");
        } catch (e) {
            console.error("Error actualizando producto: ", e);
            res.render("admin/editProduct", {
                product, categories, brands, tags, specsLabels, specsConfig,
                oldData: data,
                warning: "Error actualizando producto",
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

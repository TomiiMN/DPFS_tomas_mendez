const adminModel = require("../models/adminModel");
const categoriesModel = require("../models/categoriesModel");
const brandsModel = require("../models/brandsModel");
const tagsModel = require("../models/tagsModel");
const specsLabels = require('../../data/specsLabels');
const specsConfig = require('../../data/specsConfig');
const { name } = require("ejs");
const adminController = {
    index: (req, res) => {
        const products = adminModel.getAll();
        const categories = categoriesModel.getAll().filter(cat => cat.parent_id === null);
        res.render("admin/adminProducts", { products, categories });
    },
    create: (req, res) => {
        const categories = categoriesModel.getAll();
        const brands = brandsModel.getAll();
        const tags = tagsModel.getAll();
        res.render("admin/createProduct", { categories, brands, tags, specsLabels, specsConfig });
    },
    detail: (req, res) => {
        const product = adminModel.getById(req.params.id)
        res.render("admin/adminDetail", { product, specsLabels })
    },
    edit: (req, res) => {
        const product = adminModel.getById(req.params.id)
        const tags = tagsModel.getAll();
        const categories = categoriesModel.getAll();
        const brands = brandsModel.getAll();
        res.render("admin/editProduct", { product, categories, brands, tags, specsLabels, specsConfig });
    },
    store: (req, res) => {
        const data = req.body;
        const category = categoriesModel.getById(Number(data.category_id));
        const subcategory = categoriesModel.getById(Number(data.subcategory_id));
        const brand = brandsModel.getById(Number(data.brand_id));
        const newProduct = {
            name: data.name,
            brand: brand.name,
            model: data.model,
            price: Number(data.price),
            oldPrice: Number(data.oldPrice),
            releaseDate: data.releaseDate,
            img: data.img,
            category: [
                {
                    id: category.id,
                    name: category.name
                },
                {
                    id: subcategory.id,
                    name: subcategory.name
                }
            ],
            specs: data.specs || {},
            tags: data.tags ? JSON.parse(data.tags) : [],
            tier: data.tier,
            state: data.onPublic ? "Publicado" : "No Publicado",
            flags: {
                featured: !!data.featured,
                onSale: !!data.onSale,
            },
        }
        adminModel.create(newProduct);
        res.redirect("/admin/products");
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const category = categoriesModel.getById(Number(data.category_id));
        const subcategory = categoriesModel.getById(Number(data.subcategory_id));
        const brand = brandsModel.getById(Number(data.brand_id));
        console.log("TAGS:", data.tags);
        console.log("SPECS:", data.specs);
        console.log("TYPE SPECS:", typeof data.specs);
        const updatedProduct = {
            name: data.name,
            brand: brand.name,
            model: data.model,
            price: Number(data.price),
            oldPrice: Number(data.oldPrice),
            releaseDate: data.releaseDate,
            img: data.img,
            category: [
                {
                    id: category.id,
                    name: category.name
                },
                {
                    id: subcategory.id,
                    name: subcategory.name
                }
            ],
            tags:
                typeof data.tags === "string"
                    ? JSON.parse(data.tags)
                    : data.tags || [],
            specs: data.specs || {},
            tier: data.tier,
            state: data.onPublic ? "Publicado" : "No Publicado",
            flags: {
                featured: !!data.featured,
                onSale: !!data.onSale,
            },
        }
        adminModel.update(id, updatedProduct);
        res.redirect("/admin/products");
    },
    destroy: (req, res) => {
        const id = req.params.id;
        adminModel.delete(id);
        res.redirect("/admin/products");
    }
};
module.exports = adminController;
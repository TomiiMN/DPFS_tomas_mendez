const adminModel = require("../models/adminModel");
const categoriesModel = require("../models/categoriesModel");
const brandsModel = require("../models/brandsModel");
const tagsModel = require("../models/tagsModel");
const specsLabels = require('../../data/specsLabels');
const specsConfig = require('../../data/specsConfig');
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

    },
    update: (req, res) => {

    }
};
module.exports = adminController;
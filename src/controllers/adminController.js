const productsData = require('../../data/products')
const categoriesData = require('../../data/categories')
const brandsData = require('../../data/brands')
const adminController = {
    admin: (req, res) => {
        const mainCategories = categoriesData.filter(cat => cat.parent_id === null);
        res.render("admin/adminProducts", {
            products: productsData,
            categories: mainCategories
        });
    },
    edit: (req, res) => {
        res.render("admin/editProduct", {
            categories: categoriesData,
            brands: brandsData
        });
    },
    create: (req, res) => {
        res.render("admin/createProduct", {
            categories: categoriesData,
            brands: brandsData
        });
    }
};
module.exports = adminController;
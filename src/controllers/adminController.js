const productsData = require('../../data/products')
const categoriesData = require('../../data/categories')
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
            products: productsData,
            categories: categoriesData
        });
    }
}
module.exports = adminController;
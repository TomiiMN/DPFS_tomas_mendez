const productsModel = require("../models/productsModel");
const categoriesModel = require("../models/categoriesModel");
module.exports = {
    list: (req, res) => {
        const products = productsModel.getAll();
        const categories = categoriesModel.getAll();
        const parentCategories = categories.filter(cat => cat.parent_id === null);
        res.render("products/products", {
            categories,
            parentCategories,
            products
        })
    },
    show: (req, res) => {
        const product = productsModel.getById(req.params.id)
        res.render("products/productDetail", { product })
    },
    cart: (req, res) => {
        const products = productModel.getAll();
        const ids = [2, 4, 6];
        const cartProducts = products.filter(product => ids.includes(product.id));
        const total = cartProducts.reduce((acc, product) => acc + product.price, 0)
        res.render("products/productCart", { cartProducts, total });
    }
};
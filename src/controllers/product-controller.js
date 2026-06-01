const Product = require("../models/products-model")
const categoriesModel = require("../models/categories-model");
module.exports = {
    list: async (req, res) => {
        const products = await Product.getAll();
        const categories = await categoriesModel.getAll();
        const parentCategories = categories.filter(cat => cat.parent_id === null);
        res.render("products/products", {
            categories,
            parentCategories,
            products
        })
    },
    show: async (req, res) => {
        const product = await Product.getById(req.params.id)
        res.render("products/product-detail", { product })
    },
    cart: async (req, res) => {
        const products = await Product.getAll();
        const cart = req.session.cart || [];
        const cartProducts = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;
            return {
                ...product,
                quantity: item.quantity,
                subtotal: product.price * item.quantity
            }
        }).filter(Boolean);
        const total = cartProducts.reduce((acc, p) => acc + p.subtotal, 0);
        res.render("products/product-cart", { cartProducts, total });
    },
    add: (req, res) => {
        const id = Number(req.params.id);
        if (!req.session.cart) {
            req.session.cart = [];
        };
        const item = req.session.cart.find(p => p.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            req.session.cart.push({ id, quantity: 1 });
        };
        res.redirect("/products/cart");
    },
    remove: (req, res) => {
        const id = Number(req.params.id);
        const item = req.session.cart.find(p => p.id === id);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                req.session.cart = req.session.cart.filter(p => p.id !== id);
            }
        };
        res.redirect("/products/cart");
    },
    delete: (req, res) => {
        const id = Number(req.params.id);
        req.session.cart = req.session.cart.filter(p => p.id !== id);
        res.redirect("/products/cart")
    },
    clear: (req, res) => {
        req.session.cart = [];
        res.redirect("/products/cart");
    },
};
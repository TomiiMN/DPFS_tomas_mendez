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
        const products = productsModel.getAll();
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
        res.render("products/productCart", { cartProducts, total });
    },
    addToCart: (req, res) => {
        const productId = Number(req.params.id);
        if (!req.session.cart) {
            req.session.cart = []
        }
        const existing = req.session.cart.find(p => p.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            req.session.cart.push({ id: productId, quantity: 1 });
        }
        res.redirect("/products/cart");
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
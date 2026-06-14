const Product = require("../../database/models/products-model");
const categoriesModel = require("../../database/models/categories-model");
module.exports = {
    list: async (req, res) => {
        try {
            const search = (req.query.search || '').trim();
            const allProducts = await Product.getAll();
            let products = allProducts.filter(p => p.state);
            const categories = await categoriesModel.getAll();
            const parentCategories = categories.filter(cat => cat.parent_id === null);
            if (search) {
                const lower = search.toLowerCase();
                products = products.filter(p =>
                    p.name.toLowerCase().includes(lower) ||
                    (typeof p.brand === 'string' ? p.brand : p.brand?.name ?? '')
                        .toLowerCase().includes(lower)
                );
            }
            res.render("products/products", {
                categories,
                parentCategories,
                products,
                search
            });
        } catch (e) {
            console.error("Error cargando productos:", e);
            res.status(500).render("error", { message: "No se pudieron cargar los productos. Intentá de nuevo más tarde." });
        }
    },
    show: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
            if (!product) return res.redirect("/products");
            res.render("products/product-detail", { product });
        } catch (e) {
            console.error("Error cargando producto:", e);
            res.status(500).render("error", { message: "No se pudo cargar el producto. Intentá de nuevo más tarde." });
        }
    },
    cart: async (req, res) => {
        try {
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
        } catch (e) {
            console.error("Error cargando carrito:", e);
            res.status(500).render("error", { message: "No se pudo cargar el carrito. Intentá de nuevo más tarde." });
        }
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
        if (!req.session.cart) req.session.cart = [];
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
        if (!req.session.cart) req.session.cart = [];
        req.session.cart = req.session.cart.filter(p => p.id !== id);
        res.redirect("/products/cart")
    },
    clear: (req, res) => {
        req.session.cart = [];
        res.redirect("/products/cart");
    },
};
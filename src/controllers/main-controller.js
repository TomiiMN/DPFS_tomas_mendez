const Product = require("../models/products-model");

module.exports = {
    index: async (req, res) => {
        const products = await Product.getAll();
        const featuredProducts = products.filter(product => product.featured);
        const latestProducts = products
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, 5);
        const brandProducts = products.filter(product => product.brand === "ASUS");
        res.render("products/home", {
            featuredProducts,
            latestProducts,
            brandProducts
        });
    },
};

const products = require('../../data/products')
const mainController = {
    home: (req, res) => {
        const featuredProducts = products.filter(product => product.flags.featured)
        const latestProducts = products
            .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
            .slice(0, 5);
        const brandProducts = products.filter(product => product.brand === "ASUS")
        res.render("products/home", {
            featuredProducts,
            latestProducts,
            brandProducts
        });
    }
}
module.exports = mainController;
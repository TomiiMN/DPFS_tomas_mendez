const Product = require("../../database/models/products-model");
const categoriesModel = require("../../database/models/categories-model");

module.exports = {
    index: async (req, res) => {
        try {
            const allProducts = await Product.getAll();
            const products = allProducts.filter(p => p.state);
            const categories = await categoriesModel.getAll();
            const parentCategories = categories.filter(cat => cat.parent_id === null);
            const featuredProducts = products.filter(product => product.featured);
            const latestProducts = products
                .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                .slice(0, 5);
            const navBrands = ['ASUS', 'AMD', 'Logitech', 'Intel', 'Corsair', 'Hyte', 'NVIDIA', 'Steelseries', 'Razer', 'Redragon', 'Samsung'];
            const brandProducts = products.filter(p => navBrands.includes(p.brand));
            res.render("products/home", {
                featuredProducts,
                latestProducts,
                brandProducts,
                categories,
                parentCategories
            });
        } catch (e) {
            console.error("Error cargando home:", e);
            res.status(500).render("error", { message: "No se pudo cargar la página. Intentá de nuevo más tarde." });
        }
    },
};

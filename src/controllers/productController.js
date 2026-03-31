const products = require('../../data/products')
const categories = require('../../data/categories')

const productController = {

    list: (req, res) => {
        const parentCategories = categories.filter(cat => cat.parent_id === null);
        const productsList = products.slice(0,16)
        res.render("products/products", {
            categories,
            parentCategories,
            productsList
        });
    },

    detail: (req, res) => {
        const id = req.params.id;
        const product = products.find(p => p.id == id);
        res.render("products/productDetail", { product });
    },

    cart: (req, res) => {
        const ids = [2, 4, 6];
        const cartProducts = products.filter(product => ids.includes(product.id));
        const total = cartProducts.reduce((acc, product) => acc + product.price, 0)
        res.render("products/productCart", { cartProducts , total } );
    }

}

module.exports = productController
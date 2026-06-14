const express        = require('express');
const router         = express.Router();
const ProductModel   = require('../../database/models/products-model');
const UserModel      = require('../../database/models/users-model');
const CategoryModel  = require('../../database/models/categories-model');
function safeUser(user) {
    const { password, type, ...rest } = user;
    return rest;
};
router.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.getAll();
        const countByCategory = {};
        products.forEach(p => {
            (p.categories ?? []).forEach(cat => {
                const name = cat.name ?? 'Sin categoría';
                countByCategory[name] = (countByCategory[name] ?? 0) + 1;
            });
        });
        res.json({
            ok: true,
            count: products.length,
            countByCategory,
            data: products.map(p => ({
                ...p,
                detail: `/api/products/${p.id}`,
            })),
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, message: 'Error al obtener productos' });
    }
});
router.get('/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
        }
        res.json({ ok: true, data: product });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, message: 'Error al obtener el producto' });
    }
});
router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.getAll();
        const adminCount = users.filter(u => u.type === 'Admin').length;
        res.json({
            ok: true,
            count: users.length,
            adminCount,
            data: users.map(u => ({
                ...safeUser(u),
                detail: `/api/users/${u.id}`,
            })),
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, message: 'Error al obtener usuarios' });
    }
});
router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.getById(req.params.id);
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        res.json({ ok: true, data: safeUser(user) });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, message: 'Error al obtener el usuario' });
    }
});
router.get('/categories', async (req, res) => {
    try {
        const categories = await CategoryModel.getAll();
        res.json({ ok: true, count: categories.length, data: categories });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, message: 'Error al obtener categorías' });
    }
});

module.exports = router;

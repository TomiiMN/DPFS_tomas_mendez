const { Product, Brand, Category, Tag, Spec } = require('./index');

const PRODUCT_INCLUDE = [
    { model: Brand, as: 'brand' },
    { model: Category, as: 'categories' },
    { model: Tag, as: 'tags' },
    {
        model: Spec,
        as: 'specs',
        through: { attributes: ['value'] },
    },
];

function serialize(product) {
    const p = product.toJSON();
    return {
        ...p,
        brand: p.brand?.name ?? p.brand,
        specs: (p.specs ?? []).map(s => {
            const through = s.product_specs ?? s.ProductSpec ?? s.productSpecs ?? {};
            return { id: s.id, name: s.name, value: through.value ?? '' };
        }),
    };
}

const ProductModel = {
    getAll: async () => {
        const products = await Product.findAll({ include: PRODUCT_INCLUDE });
        return products.map(serialize);
    },
    getById: async (id) => {
        try {
            const product = await Product.findByPk(id, { include: PRODUCT_INCLUDE });
            if (!product) return null;
            return serialize(product);
        } catch (e) {
            console.error('Error obteniendo producto: ', e);
            return null;
        }
    },
};

module.exports = ProductModel;

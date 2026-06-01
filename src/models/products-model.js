const { Product, Brand, Category, Tag, Spec } = require('./index');

// Opciones de include reutilizables para no repetirlas en getAll y getById
const PRODUCT_INCLUDE = [
    { model: Brand,    as: 'brand'      },
    { model: Category, as: 'categories' },
    { model: Tag,      as: 'tags'       },
    {
        model: Spec,
        as: 'specs',
        through: { attributes: ['value'] }, // incluye la columna value de product_specs
    },
];

// Convierte la instancia Sequelize al formato plano que esperan
// los controladores y las vistas (mismo shape que antes).
function serialize(product) {
    const p = product.toJSON();
    return {
        ...p,
        brand: p.brand?.name ?? p.brand,
        // Los specs vienen como [{ id, name, product_specs: { value } }]
        // Los aplanamos a [{ name, value }] igual que hacía el modelo anterior
        specs: (p.specs ?? []).map(s => ({
            name:  s.name,
            value: s.product_specs?.value ?? s.ProductSpec?.value ?? '',
        })),
    };
}

const ProductModel = {
    getAll: async () => {
        try {
            const products = await Product.findAll({ include: PRODUCT_INCLUDE });
            return products.map(serialize);
        } catch (e) {
            console.error('Error obteniendo productos: ', e);
            return [];
        }
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

const Product      = require('./Product');
const Brand        = require('./Brand');
const Category     = require('./Category');
const Tag          = require('./Tag');
const Spec         = require('./Spec');
const SpecLabel    = require('./SpecLabel');
const CategorySpec = require('./CategorySpec');
const User         = require('./User');
Brand.hasMany(Product,   { foreignKey: 'brand_id', as: 'products' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Product.belongsToMany(Category, {
    through: 'product_categories',
    foreignKey: 'product_id',
    otherKey: 'category_id',
    as: 'categories',
    timestamps: false,
});
Category.belongsToMany(Product, {
    through: 'product_categories',
    foreignKey: 'category_id',
    otherKey: 'product_id',
    as: 'products',
    timestamps: false,
});
Product.belongsToMany(Tag, {
    through: 'product_tags',
    foreignKey: 'product_id',
    otherKey: 'tag_id',
    as: 'tags',
    timestamps: false,
});
Tag.belongsToMany(Product, {
    through: 'product_tags',
    foreignKey: 'tag_id',
    otherKey: 'product_id',
    as: 'products',
    timestamps: false,
});
Product.belongsToMany(Spec, {
    through: 'product_specs',
    foreignKey: 'product_id',
    otherKey: 'spec_id',
    as: 'specs',
    timestamps: false,
});
Spec.belongsToMany(Product, {
    through: 'product_specs',
    foreignKey: 'spec_id',
    otherKey: 'product_id',
    as: 'products',
    timestamps: false,
});
Spec.hasOne(SpecLabel,    { foreignKey: 'spec_id', as: 'label' });
SpecLabel.belongsTo(Spec, { foreignKey: 'spec_id' });
Category.hasMany(CategorySpec,    { foreignKey: 'category_id', as: 'specConfig' });
CategorySpec.belongsTo(Category,  { foreignKey: 'category_id' });
Spec.hasMany(CategorySpec,    { foreignKey: 'spec_id' });
CategorySpec.belongsTo(Spec,  { foreignKey: 'spec_id', as: 'spec' });
Category.hasMany(Category, {
    foreignKey: 'parent_id',
    as: 'subcategories',
});
Category.belongsTo(Category, {
    foreignKey: 'parent_id',
    as: 'parent',
});
module.exports = { Product, Brand, Category, Tag, Spec, SpecLabel, CategorySpec, User };

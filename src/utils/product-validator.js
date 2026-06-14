const { body } = require('express-validator');
const brandsModel = require('../../database/models/brands-model');
const categoriesModel = require('../../database/models/categories-model');
const { Tag } = require('../../database/models/index');

const productValidations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 5, max: 150 })
        .withMessage('El nombre debe tener entre 5 y 150 caracteres'),

    body('brand_id')
        .notEmpty()
        .withMessage('La marca es obligatoria')
        .isInt({ min: 1 })
        .withMessage('Seleccioná una marca válida')
        .custom(async (value) => {
            const brand = await brandsModel.getById(value);
            if (!brand) throw new Error('La marca seleccionada no existe');
            return true;
        }),

    body('model')
        .trim()
        .notEmpty()
        .withMessage('El modelo es obligatorio')
        .isLength({ max: 100 })
        .withMessage('El modelo no puede superar los 100 caracteres'),

    body('category_id')
        .notEmpty()
        .withMessage('La categoría es obligatoria')
        .isInt({ min: 1 })
        .withMessage('Seleccioná una categoría válida')
        .custom(async (value) => {
            const category = await categoriesModel.getById(value);
            if (!category) throw new Error('La categoría seleccionada no existe');
            if (category.parent_id !== null) throw new Error('La categoría seleccionada no es una categoría principal');
            return true;
        }),

    body('subcategory_id')
        .notEmpty()
        .withMessage('La subcategoría es obligatoria')
        .isInt({ min: 1 })
        .withMessage('Seleccioná una subcategoría válida')
        .custom(async (value, { req }) => {
            const subcategory = await categoriesModel.getById(value);
            if (!subcategory) throw new Error('La subcategoría seleccionada no existe');
            if (subcategory.parent_id !== Number(req.body.category_id)) {
                throw new Error('La subcategoría no pertenece a la categoría seleccionada');
            }
            return true;
        }),

    body('img')
        .trim()
        .notEmpty()
        .withMessage('La imagen del producto es obligatoria')
        .isLength({ max: 255 })
        .withMessage('La ruta de la imagen no puede superar los 255 caracteres')
        .matches(/\.(jpeg|jpg|png|webp|gif)$/i)
        .withMessage('La imagen debe tener una extensión válida (.jpg, .png, .webp, .gif)'),

    body('price')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El precio debe ser un número entero mayor a 0'),

    body('oldPrice')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('El precio original debe ser un número entero mayor a 0'),

    body('tier')
        .notEmpty()
        .withMessage('El tier es obligatorio')
        .isIn(['entrada', 'media', 'alta'])
        .withMessage('El tier debe ser entrada, media o alta'),

    body('releaseDate')
        .notEmpty()
        .withMessage('La fecha de lanzamiento es obligatoria')
        .isDate()
        .withMessage('La fecha de lanzamiento no tiene un formato válido'),

    body('tags')
        .optional({ checkFalsy: true })
        .custom(async (value) => {
            let parsed;
            try {
                parsed = JSON.parse(value);
            } catch {
                throw new Error('El formato de los tags no es válido');
            }
            if (!Array.isArray(parsed)) {
                throw new Error('Los tags deben ser una lista');
            }
            if (parsed.some(t => typeof t !== 'string' || t.trim() === '')) {
                throw new Error('Cada tag debe ser un texto no vacío');
            }
            const found = await Tag.findAll({ where: { name: parsed }, raw: true });
            if (found.length !== parsed.length) {
                const validNames = found.map(t => t.name);
                const invalid = parsed.filter(t => !validNames.includes(t));
                throw new Error(`Los siguientes tags no existen: ${invalid.join(', ')}`);
            }
            return true;
        }),

    body('featured')
        .optional()
        .custom((value) => {
            if (value !== undefined && value !== 'true' && value !== 'false') {
                throw new Error('El campo destacado tiene un valor inválido');
            }
            return true;
        }),

    body('onSale')
        .optional()
        .custom((value) => {
            if (value !== undefined && value !== 'true' && value !== 'false') {
                throw new Error('El campo en oferta tiene un valor inválido');
            }
            return true;
        }),

    body('onPublic')
        .optional()
        .custom((value) => {
            if (value !== undefined && value !== 'true' && value !== 'false') {
                throw new Error('El campo publicado tiene un valor inválido');
            }
            return true;
        }),
];

module.exports = { productValidations };

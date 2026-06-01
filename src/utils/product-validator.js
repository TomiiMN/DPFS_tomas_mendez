const { body } = require('express-validator');

const productValidations = [

    // ── Información básica ────────────────────────────────────────────────

    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3, max: 150 })
        .withMessage('El nombre debe tener entre 3 y 150 caracteres'),

    body('brand_id')
        .notEmpty()
        .withMessage('La marca es obligatoria')
        .isInt({ min: 1 })
        .withMessage('Seleccioná una marca válida'),

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
        .withMessage('Seleccioná una categoría válida'),

    body('subcategory_id')
        .notEmpty()
        .withMessage('La subcategoría es obligatoria')
        .isInt({ min: 1 })
        .withMessage('Seleccioná una subcategoría válida'),

    // ── Imagen ────────────────────────────────────────────────────────────

    body('img')
        .trim()
        .notEmpty()
        .withMessage('La imagen del producto es obligatoria')
        .isLength({ max: 255 })
        .withMessage('La ruta de la imagen no puede superar los 255 caracteres')
        .matches(/\.(jpeg|jpg|png|webp|gif)$/i)
        .withMessage('La imagen debe tener una extensión válida (.jpg, .png, .webp, .gif)'),

    // ── Precio ────────────────────────────────────────────────────────────

    body('price')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El precio debe ser un número entero mayor a 0'),

    body('oldPrice')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('El precio original debe ser un número entero mayor a 0')
        .custom((value, { req }) => {
            if (value && req.body.price && Number(value) <= Number(req.body.price)) {
                throw new Error('El precio original debe ser mayor al precio actual');
            }
            return true;
        }),

    // ── Filtros ───────────────────────────────────────────────────────────

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

    // ── Tags (campo hidden con JSON array de nombres) ─────────────────────
    // El campo es opcional — un producto puede no tener tags.
    // Cuando está presente, debe ser un JSON array de strings no vacíos.

    body('tags')
        .optional({ checkFalsy: true })
        .custom((value) => {
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
            return true;
        }),

    // ── Specs (objeto dinámico: specs[specId] = value) ────────────────────
    // Cada campo llega como specs[22], specs[23], etc.
    // No son obligatorios individualmente — dependen de la subcategoría —
    // pero si están presentes no pueden estar vacíos y los numéricos
    // deben ser números.

    body('specs')
        .optional()
        .custom((value) => {
            if (!value || typeof value !== 'object') return true;

            for (const [specId, specValue] of Object.entries(value)) {
                // El specId debe ser un número entero positivo
                if (!/^\d+$/.test(specId)) {
                    throw new Error(`ID de especificación inválido: ${specId}`);
                }
                // El valor no puede ser solo espacios
                if (typeof specValue === 'string' && specValue.trim() === '') {
                    continue; // vacío se ignora en el controller, no es error
                }
            }
            return true;
        }),

    // ── Flags / toggles (checkboxes opcionales) ───────────────────────────
    // Los checkboxes NO llegan en el body cuando están desmarcados.
    // Cuando están marcados llegan como el string "true".
    // Solo validamos el formato si están presentes.

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

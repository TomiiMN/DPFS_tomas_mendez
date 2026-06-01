const { body } = require('express-validator');

const registerValidations = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/)
        .withMessage('El nombre solo puede contener letras'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El apellido debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/)
        .withMessage('El apellido solo puede contener letras'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El formato del email no es válido')
        .isLength({ max: 150 })
        .withMessage('El email no puede superar los 150 caracteres')
        .normalizeEmail({ gmail_remove_dots: false }),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El usuario debe tener entre 3 y 100 caracteres')
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El usuario solo puede contener letras, números, puntos, guiones y guiones bajos'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres para mayor seguridad')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una mayúscula para mejorar la seguridad')
        .matches(/[0-9]/)
        .withMessage('La contraseña debe contener al menos un número para mejorar la seguridad'),

    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirmá tu contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
];

const loginValidations = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El formato del email no es válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
];

const updateInfoValidations = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/)
        .withMessage('El nombre solo puede contener letras'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El apellido debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/)
        .withMessage('El apellido solo puede contener letras'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El formato del email no es válido')
        .isLength({ max: 150 })
        .withMessage('El email no puede superar los 150 caracteres')
        .normalizeEmail({ gmail_remove_dots: false }),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El usuario debe tener entre 3 y 100 caracteres')
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El usuario solo puede contener letras, números, puntos, guiones y guiones bajos'),
];

const updatePasswordValidations = [
    body('currentPassword')
        .notEmpty()
        .withMessage('La contraseña actual es obligatoria'),

    body('newPassword')
        .notEmpty()
        .withMessage('La nueva contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La nueva contraseña debe tener al menos 8 caracteres para mayor seguridad')
        .matches(/[A-Z]/)
        .withMessage('La nueva contraseña debe contener al menos una mayúscula para mejorar la seguridad')
        .matches(/[0-9]/)
        .withMessage('La nueva contraseña debe contener al menos un número para mejorar la seguridad'),

    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirmá tu nueva contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
];

module.exports = {
    registerValidations,
    loginValidations,
    updateInfoValidations,
    updatePasswordValidations,
};

const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const usersModel = require('../../database/models/users-model');

const ALLOWED_MAGIC_BYTES = [
    { type: 'JPEG', bytes: [0xFF, 0xD8, 0xFF] },
    { type: 'PNG', bytes: [0x89, 0x50, 0x4E, 0x47] },
    { type: 'GIF', bytes: [0x47, 0x49, 0x46, 0x38] },
];

function matchesMagicBytes(buffer, signature) {
    return signature.every((byte, i) => buffer[i] === byte);
}

const avatarValidation = body('avatar').custom(async (value, { req }) => {
    if (req.fileValidationError) throw new Error(req.fileValidationError);
    if (req.file) {
        const buffer = await fs.readFile(req.file.path);
        const isValid = ALLOWED_MAGIC_BYTES.some(sig => matchesMagicBytes(buffer, sig.bytes));
        if (!isValid) {
            await fs.unlink(req.file.path).catch(() => { });
            throw new Error('El archivo no es una imagen válida (JPG, JPEG, PNG o GIF)');
        }
    }
    return true;
});

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
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El formato del email no es válido')
        .normalizeEmail({ gmail_remove_dots: false })
        .isLength({ max: 150 }).withMessage('El email no puede superar los 150 caracteres')
        .custom(async (value) => {
            const user = await usersModel.getByEmail(value);
            if (user) throw new Error('El email ya está registrado');
            return true;
        }),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El usuario debe tener entre 3 y 100 caracteres')
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El usuario solo puede contener letras, números, puntos, guiones y guiones bajos')
        .custom(async (username) => {
            const user = await usersModel.getByUsername(username);
            if (user) throw new Error('Este nombre de usuario ya está en uso');
            return true;
        }),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres para mayor seguridad')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una mayúscula para mejorar la seguridad')
        .matches(/[0-9]/)
        .withMessage('La contraseña debe contener al menos un número para mejorar la seguridad')
        .matches(/[a-z]/)
        .withMessage('La contraseña debe contener al menos una minúscula para mejorar la seguridad')
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
        .withMessage('La contraseña debe contener al menos un carácter especial para mejorar la seguridad'),

    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirmá tu contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),

    avatarValidation,
];

const loginValidations = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El formato del email no es válido')
        .custom(async (value) => {
            const user = await usersModel.getByEmail(value);
            if (!user) throw new Error('El email no está registrado');
            return true;
        }),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .custom(async (value, { req }) => {
            const user = await usersModel.getByEmail(req.body.email);
            if (!user) return true;
            const isValid = await bcrypt.compare(value, user.password);
            if (!isValid) throw new Error('Contraseña incorrecta');
            return true;
        }),
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
        .normalizeEmail({ gmail_remove_dots: false })
        .custom(async (email, { req }) => {
            const user = await usersModel.getByEmail(email);
            if (user && user.id !== req.session.user.id) {
                throw new Error('Este email ya está registrado por otro usuario');
            }
            return true;
        }),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El usuario debe tener entre 3 y 100 caracteres')
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El usuario solo puede contener letras, números, puntos, guiones y guiones bajos')
        .custom(async (username, { req }) => {
            const user = await usersModel.getByUsername(username);
            if (user && user.id !== req.session.user.id) {
                throw new Error('Este nombre de usuario ya está en uso');
            }
            return true;
        }),
];

const updatePasswordValidations = [
    body('currentPassword')
        .notEmpty()
        .withMessage('La contraseña actual es obligatoria')
        .custom(async (value, { req }) => {
            const user = await usersModel.getById(req.session.user.id);
            if (!user) return true;
            const isValid = await bcrypt.compare(value, user.password);
            if (!isValid) throw new Error('La contraseña actual es incorrecta');
            return true;
        }),

    body('newPassword')
        .notEmpty()
        .withMessage('La nueva contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La nueva contraseña debe tener al menos 8 caracteres para mayor seguridad')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una mayúscula para mejorar la seguridad')
        .matches(/[0-9]/)
        .withMessage('La contraseña debe contener al menos un número para mejorar la seguridad')
        .matches(/[a-z]/)
        .withMessage('La contraseña debe contener al menos una minúscula para mejorar la seguridad')
        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
        .withMessage('La contraseña debe contener al menos un carácter especial para mejorar la seguridad'),

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

const updateAvatarValidations = [
    avatarValidation,
];

module.exports = {
    registerValidations,
    loginValidations,
    updateInfoValidations,
    updatePasswordValidations,
    updateAvatarValidations
};

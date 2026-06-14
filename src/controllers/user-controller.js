const bcrypt = require("bcrypt");
const saltRounds = 10;
const usersModel = require("../../database/models/users-model");
const { validationResult } = require('express-validator');

const userController = {
    profile: (req, res) => {
        const user = req.session.user;
        res.render("users/user-profile", { user, oldData: {} });
    },

    login: (req, res) => {
        res.render("users/login", { oldData: {} });
    },

    loginProcess: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/login", {
                warning: errors.array(),
                oldData: req.body
            });
        }
        try {
            const { email } = req.body;
            const user = await usersModel.getByEmail(email);
            req.session.user = user;
            if (req.body.remember) {
                res.cookie('userEmail', user.email, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
            }
            res.redirect("/users/profile");
        } catch (e) {
            console.error("Error en login:", e);
            res.status(500).render("error", { message: "Ocurrió un error al iniciar sesión. Intentá de nuevo más tarde." });
        }
    },

    register: (req, res) => {
        res.render("users/register", { oldData: {} });
    },

    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                error: errors.array(),
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
        try {
            const { email, username, firstName, lastName, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            let avatarPath = "/images/avatars/default.png";
            if (req.file) {
                avatarPath = `/images/avatars/${req.file.filename}`;
            }
            const newUser = {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                username,
                type: "Customer",
                avatar: avatarPath
            };
            await usersModel.create(newUser);
            res.redirect("/users/login");
        } catch (e) {
            console.error("Error creando usuario:", e);
            res.status(500).render("error", { message: "Ocurrió un error al registrarse. Intentá de nuevo más tarde." });
        }
    },

    updateInfo: async (req, res) => {
        try {
            const id = req.session.user?.id;
            const user = await usersModel.getById(id);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("users/user-profile", {
                    user,
                    warning: errors.array(),
                    oldData: req.body
                });
            }
            const { email, username, firstName, lastName } = req.body;
            const updatedData = {
                firstName,
                lastName,
                email,
                username,
                password: user.password,
                type: user.type,
                avatar: user.avatar
            };
            await usersModel.update(id, updatedData);
            const refreshedUser = await usersModel.getById(id);
            req.session.user = refreshedUser;
            res.redirect("/users/profile");
        } catch (e) {
            console.error("Error actualizando información:", e);
            res.status(500).render("error", { message: "Ocurrió un error al actualizar la información. Intentá de nuevo más tarde." });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const id = req.session.user?.id;
            const user = await usersModel.getById(id);
            if (!user) {
                return res.render("users/login", {
                    error: "Usuario no encontrado",
                    oldData: {}
                });
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("users/user-profile", {
                    user,
                    warning: errors.array(),
                    oldData: req.body
                });
            }
            const { newPassword } = req.body;
            const updatedData = {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                username: user.username,
                password: bcrypt.hashSync(newPassword, saltRounds),
                type: user.type,
                avatar: user.avatar
            };
            await usersModel.update(id, updatedData);
            const refreshedUser = await usersModel.getById(id);
            req.session.user = refreshedUser;
            return res.render("users/user-profile", {
                user: refreshedUser,
                success: "Contraseña actualizada exitosamente",
                oldData: {}
            });
        } catch (e) {
            console.error("Error actualizando contraseña:", e);
            res.status(500).render("error", { message: "Ocurrió un error al actualizar la contraseña. Intentá de nuevo más tarde." });
        }
    },

    updateAvatar: async (req, res) => {
        const userSession = req.session.user;
        const id = userSession?.id;

        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Tenés que iniciar sesión para acceder a esta página",
                oldData: {}
            });
        }

        try {
            const user = await usersModel.getById(id);
            if (!user) {
                return res.render("users/login", {
                    error: "Usuario no encontrado",
                    oldData: {}
                });
            }

            if (req.fileValidationError) {
                return res.render("users/user-profile", {
                    user,
                    error: req.fileValidationError,
                    oldData: {}
                });
            }
            if (!req.file) {
                return res.render("users/user-profile", {
                    user,
                    error: "Por favor, seleccioná una imagen",
                    oldData: {}
                });
            }

            const updatedData = {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                username: user.username,
                password: user.password,
                type: user.type,
                avatar: `/images/avatars/${req.file.filename}`
            };

            await usersModel.update(id, updatedData);
            const refreshedUser = await usersModel.getById(id);
            req.session.user = refreshedUser;

            return res.render("users/user-profile", {
                user: refreshedUser,
                success: "Avatar actualizado exitosamente",
                oldData: {}
            });
        } catch (e) {
            console.error("Error actualizando avatar:", e);
            res.status(500).render("error", { message: "Ocurrió un error al actualizar el avatar. Intentá de nuevo más tarde." });
        }
    },

    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
    },

    delete: async (req, res) => {
        const userSession = req.session.user;
        const id = userSession?.id;

        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Tenés que iniciar sesión para acceder a esta página",
                oldData: {}
            });
        }

        try {
            const user = await usersModel.getById(id);
            if (!user) {
                return res.redirect("/users/login");
            }
            await usersModel.delete(id);
            req.session.destroy();
            res.redirect("/");
        } catch (e) {
            console.error("Error eliminando usuario:", e);
            res.status(500).render("error", { message: "Ocurrió un error al eliminar la cuenta. Intentá de nuevo más tarde." });
        }
    }
};

module.exports = userController;

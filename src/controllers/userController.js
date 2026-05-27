const bcrypt = require("bcrypt");
const saltRounds = 10;
const usersModel = require("../models/usersModel");
const { isValidEmail } = require('../utils/validator');

const userController = {
    profile: (req, res) => {
        const user = req.session.user;
        if (!user) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        };
        res.render("users/userProfile", { user, oldData: {} });
    },
    login: (req, res) => {
        res.render("users/login", { oldData: {} });
    },
    loginProcess: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password || email.trim() === "" || password.trim() === "") {
            return res.render("users/login", {
                warning: "Todos los campos son obligatorios",
                oldData: req.body
            });
        };
        const user = await usersModel.getByEmail(email);
        if (!user) {
            return res.render("users/login", {
                error: "Email no registrado",
                oldData: req.body
            });
        };
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.render("users/login", {
                error: "Contraseña incorrecta",
                oldData: req.body
            });
        }
        req.session.user = user;
        if (req.body.remember) {
            res.cookie('userEmail', user.email, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
        }
        res.redirect("/users/profile");
    },
    register: (req, res) => {
        res.render("users/register", { oldData: {} });
    },
    create: async (req, res) => {
        const { email, username, firstName, lastName, password, confirmPassword } = req.body;
        if (!email || !username || !firstName || !lastName || !password || !confirmPassword) {
            return res.render("users/register", {
                warning: "Todos los campos son obligatorios",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
        if (!isValidEmail(email)) {
            return res.render("users/register", {
                error: "Email inválido",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
        if (password !== confirmPassword) {
            return res.render("users/register", {
                error: "Las contraseñas no coinciden",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
        const existingUser = await usersModel.getByEmail(email);
        if (existingUser) {
            return res.render("users/register", {
                warning: "El email ya está registrado",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
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
    },
    updateInfo: async (req, res) => {
        const { email, username, firstName, lastName } = req.body;
        const userSession = req.session.user;
        const id = userSession?.id;
        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        }
        const user = await usersModel.getById(id);
        const users = await usersModel.getAll();
        if (!email || !username || !firstName || !lastName) {
            return res.render("users/userProfile", {
                user: { ...user, first_name: firstName || user.first_name, last_name: lastName || user.last_name },
                warning: "Todos los campos son obligatorios",
                oldData: req.body
            });
        };
        if (!isValidEmail(email)) {
            return res.render("users/userProfile", {
                user,
                error: "Email inválido",
                oldData: req.body
            });
        }
        if (users.find(u => u.email === email && u.id !== id)) {
            return res.render("users/userProfile", {
                user,
                warning: "El email ya está registrado",
                oldData: req.body
            });
        }
        if (users.find(u => u.username === username && u.id !== id)) {
            return res.render("users/userProfile", {
                user,
                warning: "El nombre de usuario ya está registrado",
                oldData: req.body
            });
        }
        // usersModel.update espera camelCase; el user de DB viene snake_case
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
        // Refrescar sesión con datos actualizados
        const refreshedUser = await usersModel.getById(id);
        req.session.user = refreshedUser;
        res.redirect("/users/profile");
    },
    updatePassword: async (req, res) => {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userSession = req.session.user;
        const id = userSession?.id;
        // BUG CORREGIDO: era (!userSession || id) — faltaba el !
        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        };
        const user = await usersModel.getById(id);
        if (!user) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        }
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.render("users/userProfile", {
                user,
                warning: "Todos los campos son obligatorios",
                oldData: req.body
            });
        };
        const isValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isValid) {
            return res.render("users/userProfile", {
                user,
                error: "La contraseña actual es incorrecta",
                oldData: req.body
            });
        }
        if (newPassword !== confirmPassword) {
            return res.render("users/userProfile", {
                user,
                error: "Las nuevas contraseñas no coinciden",
                oldData: req.body
            });
        }
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
        return res.render("users/userProfile", {
            user: refreshedUser,
            success: "Contraseña actualizada exitosamente",
            oldData: {}
        });
    },
    updateAvatar: async (req, res) => {
        const userSession = req.session.user;
        const id = userSession?.id;
        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        }
        const user = await usersModel.getById(id);
        if (!user) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        };
        if (!req.file) {
            return res.render("users/userProfile", {
                user,
                error: "Por favor, seleccione una imagen",
                oldData: {}
            });
        };
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
        return res.render("users/userProfile", {
            user: refreshedUser,
            success: "Avatar actualizado exitosamente",
            oldData: {}
        });
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
                error: "Usuario no encontrado",
                oldData: {}
            });
        }
        const user = await usersModel.getById(id);
        if (!user) {
            return res.redirect("/users/login");
        }
        await usersModel.delete(id);
        req.session.destroy();
        res.redirect("/");
    }
};

module.exports = userController;

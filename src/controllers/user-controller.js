const bcrypt = require("bcrypt");
const saltRounds = 10;
const usersModel = require("../models/users-model");
const { validationResult } = require('express-validator');
 
const userController = {
    profile: (req, res) => {
        const user = req.session.user;
        if (!user) {
            return res.render("users/login", {
                error: "Tenés que iniciar sesión para acceder a esta página",
                oldData: {}
            });
        };
        res.render("users/user-profile", { user, oldData: {} });
    },
 
    login: (req, res) => {
        res.render("users/login", { oldData: {} });
    },
 
    loginProcess: async (req, res) => {
        // 1. Validaciones de Express Validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/login", {
                warning: errors.array()[0].msg,
                oldData: req.body
            });
        }
 
        // 2. Lógica de negocio
        const { email, password } = req.body;
        const user = await usersModel.getByEmail(email);
        if (!user) {
            return res.render("users/login", {
                error: "Email no registrado",
                oldData: req.body
            });
        }
 
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
        // 1. Validaciones de Express Validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                error: errors.array()[0].msg,
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
 
        // 2. Lógica de negocio
        const { email, username, firstName, lastName, password } = req.body;
 
        const existingUser = await usersModel.getByEmail(email);
        if (existingUser) {
            return res.render("users/register", {
                warning: "El email ya está registrado",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
 
        const existingUsers = await usersModel.getAll();
        if (existingUsers.find(u => u.username === username)) {
            return res.render("users/register", {
                warning: "El nombre de usuario ya está en uso",
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
        const userSession = req.session.user;
        const id = userSession?.id;
 
        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Tenés que iniciar sesión para acceder a esta página",
                oldData: {}
            });
        }
 
        const user = await usersModel.getById(id);
 
        // 1. Validaciones de Express Validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/user-profile", {
                user,
                warning: errors.array()[0].msg,
                oldData: req.body
            });
        }
 
        // 2. Lógica de negocio
        const { email, username, firstName, lastName } = req.body;
        const users = await usersModel.getAll();
 
        if (users.find(u => u.email === email && u.id !== id)) {
            return res.render("users/user-profile", {
                user,
                warning: "El email ya está registrado por otro usuario",
                oldData: req.body
            });
        }
 
        if (users.find(u => u.username === username && u.id !== id)) {
            return res.render("users/user-profile", {
                user,
                warning: "El nombre de usuario ya está en uso",
                oldData: req.body
            });
        }
 
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
    },
 
    updatePassword: async (req, res) => {
        const userSession = req.session.user;
        const id = userSession?.id;
 
        if (!userSession || !id) {
            return res.render("users/login", {
                error: "Tenés que iniciar sesión para acceder a esta página",
                oldData: {}
            });
        }
 
        const user = await usersModel.getById(id);
        if (!user) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        }
 
        // 1. Validaciones de Express Validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/user-profile", {
                user,
                warning: errors.array()[0].msg,
                oldData: req.body
            });
        }
 
        // 2. Lógica de negocio
        const { currentPassword, newPassword } = req.body;
 
        const isValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isValid) {
            return res.render("users/user-profile", {
                user,
                error: "La contraseña actual es incorrecta",
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
 
        return res.render("users/user-profile", {
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
                error: "Tenés que iniciar sesión para acceder a esta página",
                oldData: {}
            });
        }
 
        const user = await usersModel.getById(id);
        if (!user) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
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
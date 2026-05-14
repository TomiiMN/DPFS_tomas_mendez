const bcrypt = require("bcrypt");
const saltRounds = 10;
const usersModel = require("../models/usersModel");
const { isValidEmail } = require('../utils/validators');
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
        res.render("users/login", {
            oldData: {}
        }
        );
    },
    loginProcess: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password || email.trim() === "" || password.trim() === "") {
            return res.render("users/login", {
                warning: "Todos los campos son obligatorios",
                oldData: req.body
            })
        };
        const users = usersModel.getAll();
        const user = users.find(u => u.email === email);
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
        res.render("users/register", {
            oldData: {}
        }
        );
    },
    create: (req, res) => {
        const { email, username, firstName, lastName, password, confirmPassword } = req.body;
        const users = usersModel.getAll();
        // Comprobacion inputs no estan vacios
        if (!email || !username || !firstName || !lastName || !password || !confirmPassword) {
            return res.render("users/register", {
                warning: "Todos los campos son obligatorios",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
        // Comprobacion email valido
        if (!isValidEmail(email)) {
            return res.render("users/register", { error: "Email inválido", oldData: { ...req.body, password: '', confirmPassword: '' } });
        }
        // Validacion de coincidencia con contraseña de confirmacion
        if (password !== confirmPassword) {
            return res.render("users/register", {
                error: "Las contraseñas no coinciden",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            });
        }
        if (users.find(u => u.email === email)) {
            return res.render("users/register", {
                warning: "El email ya está registrado",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            }
            );
        }
        if (users.find(u => u.username === username)) {
            return res.render("users/register", {
                warning: "El nombre de usuario ya está registrado",
                oldData: { ...req.body, password: '', confirmPassword: '' }
            }
            );
        }
        // Hasheo de la contraseña
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        // Manejo de avatar
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
        usersModel.create(newUser);
        res.redirect("/users/login");
    },
    updateInfo: (req, res) => {
        const id = req.params.id;
        const { email, username, firstName, lastName } = req.body;
        const users = usersModel.getAll();
        const user = usersModel.getById(id);
        if (!user) {
            return res.render("users/login", {
                error: "Usuario no encontrado",
                oldData: {}
            });
        }
        if (!email || !username || !firstName || !lastName) {
            return res.render("users/userProfile", {
                user: { ...user, ...req.body },
                warning: "Todos los campos son obligatorios",
                oldData: req.body
            })
        };
        // Comprobacion email valido
        if (!isValidEmail(email)) {
            return res.render("users/userProfile", {
                user: { ...user, ...req.body },
                error: "Email inválido",
                oldData: req.body
            });
        }
        if (users.find(u => u.email === email && u.id !== id)) {
            return res.render("users/userProfile", {
                user: { ...user, ...req.body },
                warning: "El email ya está registrado",
                oldData: req.body
            }
            );
        }
        if (users.find(u => u.username === username && u.id !== id)) {
            return res.render("users/userProfile", {
                user: { ...user, ...req.body },
                warning: "El nombre de usuario ya está registrado",
                oldData: req.body
            }
            );
        }
        const updatedData = {
            ...user,
            email,
            username,
            firstName,
            lastName
        }
        usersModel.update(id, updatedData);
        res.redirect("/users/profile");
    },
    updatePassword: (req, res) => {
        const id = req.params.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = usersModel.getById(id);
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
            })
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
            ...user,
            password: bcrypt.hashSync(newPassword, saltRounds)
        };
        usersModel.update(id, updatedData);
        return res.render("users/userProfile", {
            user: updatedData,
            success: "Contraseña actualizada exitosamente",
            oldData: {}
        });
    },
    updateAvatar: (req, res) => {
        const id = req.params.id;
        const user = usersModel.getById(id);
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
            ...user,
            avatar: `/images/avatars/${req.file.filename}`
        };
        usersModel.update(id, updatedData);
        return res.render("users/userProfile", {
            user: updatedData,
            success: "Avatar actualizado exitosamente",
            oldData: {}
        });
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
    },
    delete: (req, res) => {
        const id = req.params.id;
        const user = usersModel.getById(id);
        if (!user) {
            return res.redirect("/users/login");
        }
        usersModel.delete(id);
        res.redirect("/");
    }
}

module.exports = userController;
const usersModel = require("../models/usersModel");
const userController = {
    login: (req, res) => {
        res.render("users/login");
    },
    register: (req, res) => {
        res.render("users/register");
    },
    profile: (req, res) => {
        const id = req.params.id;
        const user = usersModel.getById(id);
        if (!user) {
            return res.send("Usuario no encontrado");
        };
        res.render("users/userProfile", { user });
    },
    create: (req, res) => {
        const { email, username, firstname, lastname, password, confirmPassword } = req.body;
        const users = usersModel.getAll();
        // Comprobacion inputs no estan vacios
        if (!email || !username || !firstname || !lastname || !password) {
            return res.send("Todos los campos son obligatorios");
        }
        // Comprobacion email valido
        if (
            !email.includes("@gmail.com") &&
            !email.includes("@hotmail.com") &&
            !email.includes("@yahoo.com")
        ) {
            return res.send("Email inválido");
        }
        // Validacion de coincidencia con contraseña de confirmacion
        if (password !== confirmPassword) {
            return res.send("Las contraseñas no coinciden");
        }
        if (users.find(u => u.email === email)) {
            return res.send("El email ya está registrado");
        }
        if (users.find(u => u.username === username)) {
            return res.send("El nombre de usuario ya existe");
        }
        let avatarPath = "/images/avatars/default.png";
        if (req.file) {
            avatarPath = `/images/avatars/${req.file.filename}`;
        }
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            username,
            type: "Customer",
            avatar: avatarPath
        };
        usersModel.create(newUser);
        res.redirect("/users/login");
    },
    update: (req, res) => {
        const id = req.params.id;
        const updatedData = {
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        usersModel.update(id, updatedData);
        res.redirect(`/users/profile/${id}`);
    },
    delete: (req, res) => {
        const id = req.params.id;
        usersModel.delete(id);
        res.redirect("/");
    }
}

module.exports = userController;
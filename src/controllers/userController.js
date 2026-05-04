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
        }
        res.render("users/userProfile", { user });
    },
    create: (req, res) => {
        const { email, username, firstname, lastname, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.send("Las contraseñas no coinciden");
        }
        const newUser = {
            email,
            username,
            firstname,
            lastname,
            password,
            confirmPassword
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
const usersModel = require("../../database/models/users-model");

async function rememberMeMiddleware(req, res, next) {
    if (!req.session.user && req.cookies.userEmail) {
        try {
            const user = await usersModel.getByEmail(req.cookies.userEmail);
            if (user) {
                req.session.user = user;
            }
        } catch (e) {
            console.error("Error en rememberMeMiddleware: ", e);
        }
    }
    next();
}

module.exports = rememberMeMiddleware;
const usersModel = require("../models/usersModel");
function rememberMeMiddleware(req, res, next) {
    if (!req.session.user && req.cookies.userEmail) {
        const users = usersModel.getAll();
        const user = users.find(u => u.email === req.cookies.userEmail);
        if (user) {
            req.session.user = user;
        }
    }
    next();
}
module.exports = rememberMeMiddleware;
function authAdminMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.render("users/login", {
            error: "Tienes que iniciar sesión para acceder a esta página",
            oldData: {}
        });
    }
    if (!req.session.user.type || req.session.user.type !== "Admin") {
        return res.render("users/userProfile", {
            error: "Tienes que ser un administrador para acceder a esta página",
            oldData: {}
        });
    }
    next();
}
module.exports = authAdminMiddleware;
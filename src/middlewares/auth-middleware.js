function authMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.render("users/login", {
            error: "Tienes que iniciar sesión para acceder a esta página",
            oldData: {}
        });
    }
    next();
}
module.exports = authMiddleware;
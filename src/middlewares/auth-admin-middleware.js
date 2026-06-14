function authAdminMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/users/login')
    }
    if (!req.session.user.type || req.session.user.type !== "Admin") {
        return res.redirect("/users/profile")
    }
    next();
}
module.exports = authAdminMiddleware;
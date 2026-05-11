function userLoggedMiddleware(req, res, next) {
    res.locals.userLogged = false;
    if (req.session.user) {
        res.locals.userLogged = req.session.user;
    }
    next();
}
module.exports = userLoggedMiddleware;
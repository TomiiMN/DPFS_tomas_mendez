function authMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/users/login')
    }
    next();
}

function authOwnerMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/users/login');
    }
    if (Number(req.params.id) !== req.session.user.id) {
        return res.status(403).render('error', { message: 'No tenés permiso para realizar esta acción' });
    }
    next();
}

module.exports = { authMiddleware, authOwnerMiddleware };
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/app-admin/login')
    },
    checkNotAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/app-admin')
        }
        next()
    }
}
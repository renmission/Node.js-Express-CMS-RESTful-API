module.exports = {

    userAuthenticated: (req, res, next) => {

        if (req.isauthenticated) {

            return next();

        }
        res.redirect('/login');

    }

}
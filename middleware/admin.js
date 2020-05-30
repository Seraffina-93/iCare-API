
module.exports = function (req, res, next) {
    //401 unautorized
    //403 Forbidden

    if(!req.user.isAdmin) return res.status(401).send('Acced denied.');

    next();
}
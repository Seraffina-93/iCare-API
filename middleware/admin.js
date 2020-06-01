
module.exports = function (req, res, next) {
    //401 unautorized
    //403 Forbidden

    if(!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}
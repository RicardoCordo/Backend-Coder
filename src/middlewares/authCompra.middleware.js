
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        next();
    } else {
        res.status(401).json({ message: 'Acceso no autorizado' });
    }
}



export default isAuthenticated;
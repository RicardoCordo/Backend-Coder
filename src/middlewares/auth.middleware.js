
function auth(req, res, next) {
    try {
        if (req.session?.user?.role === "admin") {
            return next();
        } else {
            logger.warning(`Unauthorized`);
        }
    } catch (err) {
        return res.status(401).send(`Solo los administradores pueden ver esta página`);
    }
}
export default auth;

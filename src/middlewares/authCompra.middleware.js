const authCompra = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user;
    }
    next();
};

export default authCompra;
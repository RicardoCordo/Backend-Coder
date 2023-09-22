import logger from "../utils/logger.utils.js";

function roleAuth(allowedRoles) {
  return (req, res, next) => {
    try {
      const user = req.session.user;
      if (user) {
        const userRole = user.role;
        if (allowedRoles.includes(userRole)) {
          next();
        } else {
          res.status(403).json({ error: 'Acceso no autorizado' });
        }
      } else {
        res.status(401).json({ message: 'No hay usuario actualmente autenticado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

export default roleAuth;
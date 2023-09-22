import logger from "../utils/logger.utils.js";

function roleAuth(role) {
      return (req, res, next) => {
      try {
        logger.info(req.session.user)
        // me tira undefined nuevamente porque no me toma la session de mongo
        if (req.session.user) {
          const userRole = req.session.user.role;
          if (userRole === role) {
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
export default roleAuth
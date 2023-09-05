function roleAuth(role) {
    return (req, res, next) => {
      try {
        if (req.session.user) {
          console.log(req.session.user.role)
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
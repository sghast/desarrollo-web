const autorizarRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                error: 'Usuario NO autenticado'
            })
        }
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                error: 'No tiene permisos para acceder'
            })
        }
        next();
    }
}

export default autorizarRoles;


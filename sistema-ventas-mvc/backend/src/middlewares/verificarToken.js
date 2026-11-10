export const verificarToken = (req, res, next) => {
    if (req.get('x-token') !== 'ventas2026') {
        return res.status(401).json({
            mensaje: 'Acceso denegado, token inválido.'
        })
    }
    next()
}
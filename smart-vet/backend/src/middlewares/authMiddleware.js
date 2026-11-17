import jwt from 'jsonwebtoken'
import Usuario from '../models/userModel.js'

const verificarToken = async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({
            error: 'Token no proporcionado'
        })
    }

    const partes = authorization.split(' ')

    if (
        partes.length !== 2 ||
        partes[0] !== 'Bearer' ||
        !partes[1]
    ) {
        return res.status(401).json({
            error: 'Formato de token incorrecto'
        })
    }

    try {
        const datos = jwt.verify(
            partes[1],
            process.env.JWT_SECRET,
            { algorithms: ['HS256'] }
        )

        const usuario = await Usuario.findById(datos.sub)

        if (!usuario || !usuario.status) {
            return res.status(401).json({
                error: 'Usuario no autorizado'
            })
        }

        req.usuario = usuario
        next()
    } catch (error) {
        if (
            error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError' ||
            error.name === 'NotBeforeError' ||
            error.name === 'CastError'
        ) {
            return res.status(401).json({
                error: 'Token inválido o expirado'
            })
        }

        next(error)
    }
}

export default verificarToken

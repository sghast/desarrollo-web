import express from 'express'
import { 
    registerUser, 
    logIn,
     getProfile
} from '../controllers/authController.js'
import verificarToken from "../middlewares/authMiddleware.js";
import autorizarRoles from "../middlewares/roleMiddleware.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', logIn)

router.get('/perfil', verificarToken, getProfile)
router.get(
    '/admin',
    verificarToken,
    autorizarRoles('administrador'),
    (req, res) => {
        res.json({
            mensaje: 'Bienvenido al panel de administrador'
        })
    }
)

export default router

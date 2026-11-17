import express from 'express'
import { registerUser, logIn } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', logIn)

export default router

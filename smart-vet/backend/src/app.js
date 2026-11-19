import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API SmartVET conectada con éxito por Alan Reyes'
    })
})

app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    })
})

app.use(errorMiddleware)

export default app;
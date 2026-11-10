import express from 'express';
import productoRoutes from './routes/productoRoutes.js';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());
app.use('/api/productos', productoRoutes);

export default app;

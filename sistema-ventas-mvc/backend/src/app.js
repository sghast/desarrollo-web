import express from 'express';
import productoRoutes from './routes/productoRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/productos', productoRoutes);

export default app;

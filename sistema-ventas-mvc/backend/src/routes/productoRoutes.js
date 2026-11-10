import express from 'express';
import { 
    obtenerProductos, 
    obtenerProductoPorId, 
    crearProducto,
    actualizarProductoPorId,
    eliminarProductoPorId,
    buscarProductos
} from '../controllers/productoController.js';
import { verificarToken } from '../middlewares/verificarToken.js'

const router = express.Router();

// define the home page route
router.get('/', verificarToken, obtenerProductos);
router.get('/buscar', verificarToken, buscarProductos)
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/:id', actualizarProductoPorId);
router.delete('/:id', eliminarProductoPorId);

export default router;


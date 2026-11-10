import { listarProductos } from '../productoModel.js';

try {
    const productos = await listarProductos();
    console.log('Productos obtenidos:');
    console.log(productos)
} catch (error) {
    console.log(`Error al leer los productos: ${error}`)
}


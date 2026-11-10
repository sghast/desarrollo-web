import { writeFile, readFile } from 'node:fs/promises'
import { URL } from 'node:url'

const archivo = new URL('../data/productos.json', import.meta.url)

const guardarProductos = (productos) =>
    writeFile(archivo, JSON.stringify(productos, null, 2), 'utf-8')

/**
 * @typedef {object} Producto
 * @property {number} id
 * @property {string} nombre
 * @property {number} precio
 * @property {number} stock
 * @property {string} categoria
 */

/**@returns {Promise<Producto[]>} */
export const listarProductos = async () => 
    JSON.parse(await readFile(archivo, 'utf-8'))

export const buscarProductoPorId = async (id) =>
    (await listarProductos()).find(producto => producto.id === id)

/**@param {string} nombre */
export const buscarProductoPorNombre = async (nombre) => {
    const termino = nombre.toLowerCase()
    return (await listarProductos()).filter(producto =>
        producto.nombre.toLowerCase().includes(termino)
    )
}

export const registrarProducto = async (producto) => {
    const productos = await listarProductos();
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const nuevoProducto = {
        id: nuevoId,
        ...producto
    };
    productos.push(nuevoProducto);

    await guardarProductos(productos);
    return nuevoProducto;
};

export const actualizarProducto = async (id, productoActualizado) => {
    const productos = await listarProductos()
    const indice = productos.findIndex(producto => producto.id === id)
    
    if (indice === -1) return null;

    productos[indice] = {
        id,
        ...productoActualizado
    }

    await guardarProductos(productos)
    return productos[indice]

}

export const eliminarProducto = async (id) => {
    const productos = await listarProductos()
    const indice = productos.findIndex(producto => producto.id === id)

    if (indice === -1) return null;

    const [productoEliminado] = productos.splice(indice, 1)
    await guardarProductos(productos)
    return productoEliminado
}

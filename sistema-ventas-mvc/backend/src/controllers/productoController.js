import { 
    buscarProductoPorId, 
    listarProductos, 
    registrarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProductoPorNombre
} from '../models/productoModel.js';

const datosProductoValidos = ({ nombre, precio, stock, categoria } = {}) =>
    typeof nombre === 'string' &&
    !!nombre.trim() &&
    typeof precio === 'number' &&
    Number.isFinite(precio) &&
    precio >= 0 &&
    Number.isInteger(stock) &&
    stock >= 0 &&
    typeof categoria === 'string' &&
    !!categoria.trim();

const prepararProducto = ({ nombre, precio, stock, categoria }) => ({
    nombre: nombre.trim(),
    precio,
    stock,
    categoria: categoria.trim()
});

export const obtenerProductos = async(req, res)=>{
    try{
        const productos = await listarProductos()
        res.json(productos)
    }catch(error){
        res.status(500).json({
            mensaje:"Error al obtener los productos"
        });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'ID inválido'
        });
    }

    try {
        
        const producto = await buscarProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        return res.json(producto);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al buscar el producto'
        });
    }
};

export const crearProducto = async (req, res) => {
    const datos = req.body ?? {};
    if (!datosProductoValidos(datos)) {
        return res.status(400).json({
            mensaje: 'Datos de producto inválidos'
        });
    }

    try {
        const producto = await registrarProducto(prepararProducto(datos));
        return res.status(201).json(producto);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al crear el producto'
        });
    }
};

export const actualizarProductoPorId = async (req, res) => {
    const id = Number(req.params.id);
    const datos = req.body ?? {};

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'ID inválido'
        });
    }

    if (!datosProductoValidos(datos)) {
        return res.status(400).json({
            mensaje: 'Datos de producto inválidos'
        });
    }

    try {
        const producto = await actualizarProducto(id, prepararProducto(datos));

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        return res.json(producto);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al actualizar el producto'
        });
    }
};

export const eliminarProductoPorId = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'ID inválido'
        });
    }

    try {
        const producto = await eliminarProducto(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        return res.json({
            mensaje: 'Producto eliminado correctamente',
            producto
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
};

export const buscarProductos = async (req, res) => {
    const nombre = req.query.nombre;

    if (typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({
            mensaje: 'Debe proporcionar un nombre para buscar'
        });
    }

    try {
        const productos = await buscarProductoPorNombre(nombre.trim());
        if (productos.length === 0) {
            return res.status(400).json({
                mensaje: `No se encontraron productos que contengan [${nombre}]`
            })
        }
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al buscar productos'
        });
    }
};

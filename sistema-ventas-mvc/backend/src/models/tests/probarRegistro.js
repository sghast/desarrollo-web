import { registrarProducto } from "../productoModel.js";

try {
    const producto = {
        nombre: 'Cinta de luces LED',
        precio: 9.99,
        stock: 7,
        categoria: 'Decoración'
    }
    const resultado = await registrarProducto(producto);
    console.log('Producto registrado con éxito!');
    console.log(resultado)
} catch (error) {
    console.log(`No se pudo registrar el producto. Error: ${error}`)
}


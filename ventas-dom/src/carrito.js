const CLAVE_CARRITO = "carritoVentas";

// recuperar carrito
export function obtenerCarrito () {
    try {
        const datos = localStorage.getItem(CLAVE_CARRITO);
        const carrito = datos ? JSON.parse(datos) : [];
        return Array.isArray(carrito) ? carrito : [];
    } catch (error) {
        console.error("Error al obtener el carrito:", error.message);
        return [];
    }
}

// guardar carrito
export function guardarCarrito (carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// agregar producto al carrito
export function agregarProducto(producto) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            cantidad: 1
        });
    }
    guardarCarrito(carrito);
    return carrito;
}

// eliminar producto del carrito
export function eliminarProducto (id) {
    const carrito = obtenerCarrito();
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarrito(nuevoCarrito);
    return nuevoCarrito;
}

// vaciar carrito
export function vaciarCarrito () {
    localStorage.removeItem(CLAVE_CARRITO);
}


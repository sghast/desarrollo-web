// función declarativa
export function calcularSubtotal (carrito) {
    return carrito.reduce ((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);
}

// función flecha para calcular descuento
export const calcularDescuentoFlecha = (subtotal) => {
    if (subtotal >= 500) {
        return subtotal * 0.1;
    }
    return 0;
};

// expresión de funcion
export const calcularTotal = function (subtotal, descuento) {
    return subtotal - descuento;
}

// mi novia la Camila es la mejor del mundo y la amo con todo mi corazón.
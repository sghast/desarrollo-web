import "./styles.css";

import { getProductsFetch, getProductsAxios } from "./productosService.js";

import {
    obtenerCarrito,
    agregarProducto,
    eliminarProducto,
    vaciarCarrito
} from "./carrito.js";

import {
    calcularSubtotal,
    calcularDescuentoFlecha,
    calcularTotal
} from "./calculos.js";

let productos = [];

const catalogo = document.getElementById("catalogo");
const carritoContenedor = document.getElementById("carrito");

const estado = document.getElementById("estado");
const busqueda = document.getElementById("busqueda");
const clienteHttp = document.getElementById("clienteHttp");

const subtotalElemento = document.getElementById("subtotal");
const descuentoElemento = document.getElementById("descuento");
const totalElemento = document.getElementById("total");

const mensajeVenta = document.getElementById("mensajeVenta");

document.getElementById('btnConsultar').addEventListener('click', consultarProductos);
document.getElementById('btnVaciar').addEventListener('click', () => {
    vaciarCarrito();
    mostrarCarrito();
});

mostrarCarrito();

async function consultarProductos () {
    estado.textContent = 'Consultando productos...';
    try {
        if (clienteHttp.value === 'fetch') {
            console.log('CONSULTA CON FETCH');
            productos = await getProductsFetch();
        } else {
            console.log('CONSULTA CON AXIOS');
            productos = await getProductsAxios();
        }
        console.log('PRODUCTOS CONSULTADOS');
        console.table(productos);

        mostrarProductos(productos);

        estado.textContent = `${productos.length} productos consultados con éxito!`;
    } catch (error) {
        estado.textContent = 'No fue posible mostrar los productos consultados';
        console.error(`ERROR: ${error.message}`)
    }
}

function mostrarProductos (listaProductos) {
    catalogo.replaceChildren();
    listaProductos.forEach (producto => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('producto');
        const titulo = document.createElement('h3');
        titulo.textContent = producto.title;
        const precio = document.createElement('p');
        precio.textContent = `Precio: $${producto.price}`;
        const stock = document.createElement('p');
        stock.textContent = `Stock: ${producto.stock}`;
        const boton = document.createElement('button');
        boton.textContent = 'Agregar al carrito';
        boton.disabled = producto.stock <= 0;
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
        tarjeta.append(titulo, precio, stock, boton);
        catalogo.appendChild(tarjeta);
    });
}

function agregarAlCarrito (producto) {
    agregarProducto(producto);
    const carrito = obtenerCarrito();
    console.log('CARRITO DE COMPRAS:');
    console.table(carrito);
    mostrarCarrito();
}

function mostrarCarrito () {
    const carrito = obtenerCarrito();
    carritoContenedor.replaceChildren();

    if (carrito.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'El carrito está vacío.';
        carritoContenedor.appendChild(mensaje);
    } else {
        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('item-carrito');

            const descripcion = document.createElement('span');
            descripcion.textContent =
                `${producto.nombre} x ${producto.cantidad} — $${(producto.precio * producto.cantidad).toFixed(2)}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                eliminarProducto(producto.id);
                mostrarCarrito();
            });

            item.append(descripcion, botonEliminar);
            carritoContenedor.appendChild(item);
        });
    }

    const subtotal = calcularSubtotal(carrito);
    const descuento = calcularDescuentoFlecha(subtotal);
    subtotalElemento.textContent = subtotal.toFixed(2);
    descuentoElemento.textContent = descuento.toFixed(2);
    totalElemento.textContent = calcularTotal(subtotal, descuento).toFixed(2);
}

function eliminarDelCarrito (id) {
    eliminarProducto(id);
    const carrito = obtenerCarrito();
    console.log('CARRITO ACTUALIZADO')
    console.table(carrito);
    mostrarCarrito();
}

function finalizarCompra () {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mensajeVenta.textContent = 'No existen productos en el carrito. La compra no puede finalizar.';
        return;
    }
    const subtotal = calcularSubtotal(carrito);
    const descuento = calcularDescuentoFlecha(subtotal);
    const total = calcularTotal(subtotal, descuento);

    console.log('COMPRA SIMULADA');
    console.table(carrito);
    console.log(`Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`Descuento: $${descuento.toFixed(2)}`);
    console.log(`Total: $${total.toFixed(2)}`);

    mensajeVenta.textContent = `Compra simulada con éxito. Total: `;
}
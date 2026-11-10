import express from "express"

const app = express();
const PORT = 3000;

let productos = [
    {
        id: 1,
        nombre: 'Laptop Lenovo',
        precio: 799.99,
        stock: 10
    },
    {
        id: 2,
        nombre: 'Mouse Logitech',
        precio: 24.99,
        stock: 30
    }
];

//  MIDDLEWARE se usa para interpretar el puerto

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "Servidor CRUD de productos funcionando :)"
    });
});

app.post("/api/productos", (req, res) => {
    const { nombre, precio, stock } = req.body;
    if (
        typeof nombre !== "string" ||
        nombre.trim() === "" ||
        typeof precio !== "number" ||
        !Number.isFinite(precio) ||
        precio < 0 ||
        !Number.isFinite(stock) ||
        stock < 0
    ) {
        return res.status(400).json({
            mensaje: "Los datos del producto son incorrectos!!!"
        });
    }

    // crear un nuevo producto
    const nuevoProducto = {
        id: Math.max(0, ...productos.map(p => p.id)) + 1,
        nombre: nombre.trim(),
        precio,
        stock
    };

    // agregar al arreglo
    productos.push(nuevoProducto);

    res.status(201).json({
        mensaje: "Producto creado con éxito :)",
        producto: nuevoProducto
    });
});

// consulta de productos
app.get("/api/productos", (req, res) => {
    // devolver todos los productos
    res.status(200).json({
        mensaje: "Listado de productos",
        productos: productos
    });
});

// devolver producto por ID
app.get("/api/productos/:id", (req, res) => {
    // obtener el ID desde la URL
    const id = Number(req.params.id);
    const producto = productos.find(
        (p) => p.id === id
    );
    if (!producto) {
        return res.status(400).json({
            mensaje: `El producto con ID ${id} no existe`
        });
    }
    res.status(200).json({
        mensaje: `Producto (ID: ${id}) encontrado!`,
        producto: producto
    });
})

// actualizar productos
app.put("/api/productos/:id", (req, res) => {
     // obtener el ID desde la URL
    const id = Number(req.params.id);
    const { nombre, precio, stock } = req.body;
    const producto = productos.find(
        (p) => p.id === id
    );
    // buscar el producto por ID
    if (!producto) {
        return res.status(400).json({
            mensaje: `El producto con ID ${id} no existe`
        });
    }
    // validar los datos ingresados 
    if (
        typeof nombre !== "string" ||
        nombre.trim() === "" ||
        typeof precio !== "number" ||
        !Number.isFinite(precio) ||
        precio < 0 ||
        !Number.isFinite(stock) ||
        stock < 0
    ) {
        return res.status(400).json({
            mensaje: "Los datos del producto son incorrectos!!!"
        });
    }
    // actualizar los datos del producto
    producto.nombre = nombre.trim()
    producto.precio = precio
    producto.stock = stock

    res.status(200).json({
        mensaje: 'Producto actualizado correctamente :)',
        producto: producto
    })
})

app.delete('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const indice = productos.findIndex(
        (p) => p.id === id
    );

    if (indice === -1) {
        return res.status(400).json({
            mensaje: 'Producto no encontrado :('
        });
    }
    const productoEliminado = productos.splice(
        indice, 1
    )[0];
    res.status(200).json({
        mensaje: 'Producto eliminado con éxito :)',
        producto: productoEliminado
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
})

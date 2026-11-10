import { useState } from 'react'

function FormularioProducto({ onRegistrar }) {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const nuevoProducto = {
            nombre: nombre.trim(),
            precio: Number(precio),
            stock: Number(stock),
            categoria: categoria.trim()
        };
        const registrado = await onRegistrar(nuevoProducto)
        if (!registrado) return
        
        setNombre('');
        setPrecio('');
        setStock('');
        setCategoria('');
    }

    return (
        <form className='formulario-producto' onSubmit={manejarEnvio}>
            <h2>Registrar Producto</h2>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input 
                    id="nombre"
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="precio">Precio</label>
                <input 
                    id="precio"
                    type="number" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)}
                    min={0.01}
                    step={0.01}
                    required
                />
            </div>
            <div>
                <label htmlFor="stock">Stock</label>
                <input 
                    id="stock"
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)}
                    min={0}
                    step={1}
                    required
                />
            </div>
            <div>
                <label htmlFor="categoria">Categoría</label>
                <input
                    id="categoria"
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Guardar Producto</button>
        </form>
    )
}

export default FormularioProducto;
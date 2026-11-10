import { useCallback, useEffect, useState } from 'react'
import Encabezado from './components/Encabezado.jsx'
import FormularioProducto from './components/FormularioProducto.jsx'
import ProductoCard from './components/ProductoCard.jsx'
import './App.css'
import { obtenerProductos, registrarProducto } from './services/productoService.js'

const obtenerListadoProductos = async () => {
  const resultado = await obtenerProductos()
  if (!Array.isArray(resultado)) {
    throw new Error('La respuesta del backend no tiene el formato esperado')
  }
  return resultado
}

function App () {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const cargarProductos = useCallback(async () => {
    setCargando(true)
    setError('')

    try {
      setProductos(await obtenerListadoProductos())
    } catch (error) {
      console.error('Error al obtener productos:', error)
      setError(error.response?.data?.mensaje ?? error.message ?? 'No fue posible conectarse al backend')
    } finally {
      setCargando(false)
    }
  }, [])

  const manejarRegistro = async (producto) => {
    setError('')
    setMensaje('')

    try {
      await registrarProducto(producto)
      setMensaje('Producto registrado correctamente.')
      await cargarProductos()
      return true
    } catch (error) {
      console.error('Error al registrar producto:', error)
      setError(error.response?.data?.mensaje ?? error.message ?? 'No fue posible registrar el producto')
      return false
    }
  }

  useEffect(() => {
    let activo = true

    obtenerListadoProductos()
      .then(resultado => {
        if (activo) setProductos(resultado)
      })
      .catch(error => {
        console.error('Error al obtener productos:', error)
        if (activo) {
          setError(error.response?.data?.mensaje ?? error.message ?? 'No fue posible conectarse al backend')
        }
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  return (
    <main className="contenedor">
      <Encabezado/>
      <FormularioProducto onRegistrar={manejarRegistro} />
      {mensaje && <p role="status">{mensaje}</p>}
      <section aria-labelledby="productos-titulo">
        <h2 id="productos-titulo">Lista de productos</h2>
        <button onClick={cargarProductos} disabled={cargando}>
          {cargando ? 'Cargando...' : 'Actualizar productos'}
        </button>
        {error && <p role="alert">No se pudieron cargar los productos: {error}</p>}
        {!error && cargando && <p role="status">Cargando productos...</p>}
        {!error && !cargando && productos.length === 0 && <p>No hay productos disponibles.</p>}
        {!error && productos.length > 0 && (
          <div className="productos-grid">
            {productos.map(producto => (
              <ProductoCard key={producto.id} {...producto} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App

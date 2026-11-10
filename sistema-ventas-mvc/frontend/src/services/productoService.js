import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'x-token': 'ventas2026'
    }
});

export const obtenerProductos = async () => {
    return (await api.get('/productos')).data
}

export const registrarProducto = async (producto) => {
    return (await api.post('/productos', producto)).data
}

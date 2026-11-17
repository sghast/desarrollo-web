const errorMiddleware = (error, req, res, next) => {
    console.error('Error del servidor: ', error)
    const estado = error.status || error.statusCode || 500
    res.status(estado).json({
        error: estado === 500
        ? 'Error interno del servidor!'
        : error.message
    });
};

export default errorMiddleware


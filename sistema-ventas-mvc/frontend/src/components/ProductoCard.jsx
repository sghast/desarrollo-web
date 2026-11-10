function ProductoCard ({nombre, precio, stock}) {
    return (
        <article className="producto-card">
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock: {stock}</p>
        </article>
    )
}

export default ProductoCard

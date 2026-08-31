document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".producto-detalle-content");
    const producto = productos.find((p) => p.id === PRODUCTO_ID);

    if (!producto) {
        contenedor.innerHTML = "<p class='producto-no-encontrado'>No pudimos encontrar este producto.</p>";
        return;
    }

    document.title = `${producto.nombre} - Zthorken Online`;

    const imagen = document.getElementById("producto-imagen");
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;

    document.getElementById("producto-categoria").textContent = producto.categoria;
    document.getElementById("producto-nombre").textContent = producto.nombre;
    document.getElementById("producto-precio").textContent = producto.precio;
    document.getElementById("producto-descripcion").textContent = producto.descripcion;

    // Botón agregar al carrito (esta página no usa .item, así que va directo aquí)
    document.getElementById("btn-agregar-carrito").addEventListener("click", () => {
        agregarAlCarrito(producto.id);
        actualizarContadorCarrito();
        mostrarToast(`${producto.nombre} fue añadido al carrito.`);
    });
});
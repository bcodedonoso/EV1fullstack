function actualizarContadorCarrito() {
    const contadorEl = document.getElementById("carrito-contador");
    if (!contadorEl) return;

    const carrito = leerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    contadorEl.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
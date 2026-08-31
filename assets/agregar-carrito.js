document.addEventListener("click", (e) => {
    const boton = e.target.closest("button");
    if (!boton || boton.textContent.trim() !== "Añadir al carrito") return;

    const item = boton.closest(".item");
    if (!item) return;

    const id = Number(item.dataset.id);
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    agregarAlCarrito(id);
    actualizarContadorCarrito();
    mostrarToast(`${producto.nombre} fue añadido al carrito.`);
});
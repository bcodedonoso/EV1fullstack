document.addEventListener("click", (e) => {
    const boton = e.target.closest("button");
    if (boton && boton.textContent.trim() === "Añadir al carrito") return;

    const item = e.target.closest(".item");
    if (!item) return;

    const id = item.dataset.id;
    window.location.href = `detalleProducto${id}.html`;
});
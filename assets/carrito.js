// Carrito de compras basado en localStorage.
// Guarda [{id, cantidad}] y usa el arreglo "productos" (productos-data.js)
// para obtener nombre/precio/imagen al momento de mostrarlo.

const CARRITO_KEY = "carrito";

function leerCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function agregarAlCarrito(id, cantidad = 1) {
  const carrito = leerCarrito();
  const item = carrito.find((i) => i.id === id);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }
  guardarCarrito(carrito);
}

function precioANumero(precio) {
  return Number(precio.replace(/[^0-9]/g, ""));
}

function formatearPrecio(numero) {
  return `$${numero.toLocaleString("es-CL")}`;
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  if (!contenedor) return;

  const carrito = leerCarrito();
  const totalEl = document.getElementById("carrito-total");

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
    totalEl.textContent = formatearPrecio(0);
    return;
  }

  let total = 0;

  contenedor.innerHTML = carrito
    .map(({ id, cantidad }) => {
      const producto = productos.find((p) => p.id === id);
      if (!producto) return "";

      const precioUnitario = precioANumero(producto.precio);
      const subtotal = precioUnitario * cantidad;
      total += subtotal;

      return `
        <div class="carrito-item" data-id="${id}">
          <img src="${producto.imagen}" alt="${producto.alt}">
          <div class="carrito-item-info">
            <h3>${producto.nombre}</h3>
            <p class="carrito-item-precio">${producto.precio} c/u</p>
          </div>
          <div class="carrito-item-cantidad">
            <button class="btn-restar" aria-label="Restar cantidad">−</button>
            <span>${cantidad}</span>
            <button class="btn-sumar" aria-label="Sumar cantidad">+</button>
          </div>
          <p class="carrito-item-subtotal">${formatearPrecio(subtotal)}</p>
          <button class="btn-eliminar" aria-label="Eliminar producto">🗑</button>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = formatearPrecio(total);
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-items");
  if (!contenedor) return;

  renderizarCarrito();

  contenedor.addEventListener("click", (e) => {
    const fila = e.target.closest(".carrito-item");
    if (!fila) return;

    const id = Number(fila.dataset.id);
    const carrito = leerCarrito();
    const entrada = carrito.find((i) => i.id === id);
    if (!entrada) return;

    if (e.target.classList.contains("btn-sumar")) {
      entrada.cantidad++;
    } else if (e.target.classList.contains("btn-restar")) {
      entrada.cantidad--;
      if (entrada.cantidad <= 0) carrito.splice(carrito.indexOf(entrada), 1);
    } else if (e.target.classList.contains("btn-eliminar")) {
      carrito.splice(carrito.indexOf(entrada), 1);
    } else {
      return;
    }

    guardarCarrito(carrito);
    renderizarCarrito();
  });



});

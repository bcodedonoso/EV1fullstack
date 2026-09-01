const PRODUCTOS_NUEVOS_KEY = "productosNuevos";

function leerProductosNuevos() {
    return JSON.parse(localStorage.getItem(PRODUCTOS_NUEVOS_KEY)) || [];
}

function guardarProductoNuevo(producto) {
    const nuevos = leerProductosNuevos();
    nuevos.push(producto);
    localStorage.setItem(PRODUCTOS_NUEVOS_KEY, JSON.stringify(nuevos));
}

function obtenerTodosLosProductos() {
    return productos.concat(leerProductosNuevos());
}

function renderizarTablaProductos() {
    const tbody = document.getElementById("tabla-productos");
    if (!tbody) return;

    tbody.innerHTML = obtenerTodosLosProductos().map(p => {
        const critico = p.stockCritico !== undefined && p.stock <= p.stockCritico;
        return `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
                <td>${p.precio}</td>
                <td>${p.stock}${critico ? ' <span class="badge badge-stock-critico">Crítico</span>' : ""}</td>
                <td>${p.categoria}</td>
                <td class="acciones">
                    <a href="producto-ver.html" class="btn-outline">Ver</a>
                    <a href="producto-editar.html" class="btn-dark">Editar</a>
                </td>
            </tr>
        `;
    }).join("");
}

const CAMPOS_REQUERIDOS_PRODUCTO = [
    { id: "codigo", label: "Código producto" },
    { id: "nombre", label: "Nombre" },
    { id: "precio", label: "Precio" },
    { id: "stock", label: "Stock" },
    { id: "categoria", label: "Categoría" }
];

function prepararFormularioProducto() {
    if (!window.location.pathname.endsWith("producto-nuevo.html")) return;

    CAMPOS_REQUERIDOS_PRODUCTO.forEach(({ id }) => {
        const campo = document.getElementById(id);
        campo.addEventListener("input", () => campo.classList.remove("campo-invalido"));
        campo.addEventListener("change", () => campo.classList.remove("campo-invalido"));
    });

    document.querySelector(".admin-formulario").addEventListener("submit", (e) => {
        e.preventDefault();

        const faltantes = CAMPOS_REQUERIDOS_PRODUCTO.filter(({ id }) => {
            const campo = document.getElementById(id);
            const vacio = !campo.value.trim();
            campo.classList.toggle("campo-invalido", vacio);
            return vacio;
        });

        if (faltantes.length > 0) {
            mostrarToastPersistente(`Falta completar: ${faltantes.map(f => f.label).join(", ")}`);
            return;
        }

        ocultarToastPersistente();

        const precio = Number(document.getElementById("precio").value) || 0;
        const stockCritico = document.getElementById("stock-critico").value;

        guardarProductoNuevo({
            codigo: document.getElementById("codigo").value.trim(),
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: `$${precio.toLocaleString("es-CL")}`,
            stock: Number(document.getElementById("stock").value) || 0,
            stockCritico: stockCritico ? Number(stockCritico) : undefined,
            categoria: document.getElementById("categoria").selectedOptions[0]?.textContent || ""
        });

        window.location.href = "productos.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarTablaProductos();
    prepararFormularioProducto();
});

const PRODUCTOS_NUEVOS_KEY = "productosNuevos";
const PRODUCTOS_EDITADOS_KEY = "productosEditados";

const CAMPOS_REQUERIDOS_PRODUCTO = [
    { id: "codigo", label: "Código producto" },
    { id: "nombre", label: "Nombre" },
    { id: "precio", label: "Precio" },
    { id: "stock", label: "Stock" },
    { id: "categoria", label: "Categoría" }
];

function leerProductosNuevos() {
    return JSON.parse(localStorage.getItem(PRODUCTOS_NUEVOS_KEY)) || [];
}

function guardarProductoNuevo(producto) {
    const nuevos = leerProductosNuevos();
    nuevos.push(producto);
    localStorage.setItem(PRODUCTOS_NUEVOS_KEY, JSON.stringify(nuevos));
}

function leerProductosEditados() {
    return JSON.parse(localStorage.getItem(PRODUCTOS_EDITADOS_KEY)) || {};
}

// Los productos hardcodeados no se pueden mutar, así que la edición se guarda
// aparte, indexada por el código original, y se aplica encima al combinar todo.
function guardarProductoEditado(codigoOriginal, datos) {
    const editados = leerProductosEditados();
    editados[codigoOriginal] = datos;
    localStorage.setItem(PRODUCTOS_EDITADOS_KEY, JSON.stringify(editados));
}

function obtenerTodosLosProductos() {
    const editados = leerProductosEditados();
    return productos.concat(leerProductosNuevos()).map(p => editados[p.codigo] || p);
}

function renderizarTablaProductos() {
    const tbody = document.getElementById("tabla-productos");
    if (!tbody) return;

    const esVendedor = localStorage.getItem("usuarioTipo") === "vendedor";

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
                    <a href="producto-ver.html?codigo=${encodeURIComponent(p.codigo)}" class="btn-outline">Ver</a>
                    ${esVendedor ? "" : `<a href="producto-editar.html?codigo=${encodeURIComponent(p.codigo)}" class="btn-dark">Editar</a>`}
                </td>
            </tr>
        `;
    }).join("");
}

function activarLimpiezaDeErroresProducto() {
    CAMPOS_REQUERIDOS_PRODUCTO.forEach(({ id }) => {
        const campo = document.getElementById(id);
        campo.addEventListener("input", () => campo.classList.remove("campo-invalido"));
        campo.addEventListener("change", () => campo.classList.remove("campo-invalido"));
    });
}

function validarCamposProducto() {
    const faltantes = CAMPOS_REQUERIDOS_PRODUCTO.filter(({ id }) => {
        const campo = document.getElementById(id);
        const vacio = !campo.value.trim();
        campo.classList.toggle("campo-invalido", vacio);
        return vacio;
    });

    if (faltantes.length > 0) {
        mostrarToastPersistente(`Falta completar: ${faltantes.map(f => f.label).join(", ")}`);
        return false;
    }

    ocultarToastPersistente();
    return true;
}

function leerDatosFormularioProducto() {
    const precio = Number(document.getElementById("precio").value) || 0;
    const stockCritico = document.getElementById("stock-critico").value;

    return {
        codigo: document.getElementById("codigo").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        precio: `$${precio.toLocaleString("es-CL")}`,
        stock: Number(document.getElementById("stock").value) || 0,
        stockCritico: stockCritico ? Number(stockCritico) : undefined,
        categoria: document.getElementById("categoria").selectedOptions[0]?.textContent || ""
    };
}

function prepararFormularioProducto() {
    if (!window.location.pathname.endsWith("producto-nuevo.html")) return;

    activarLimpiezaDeErroresProducto();

    document.querySelector(".admin-formulario").addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validarCamposProducto()) return;

        guardarProductoNuevo(leerDatosFormularioProducto());
        window.location.href = "productos.html";
    });
}

function prepararEdicionProducto() {
    if (!window.location.pathname.endsWith("producto-editar.html")) return;

    const codigoOriginal = new URLSearchParams(window.location.search).get("codigo");
    const producto = obtenerTodosLosProductos().find(p => p.codigo === codigoOriginal);

    if (!producto) {
        mostrarToastPersistente("No se encontró el producto a editar.");
        return;
    }

    document.getElementById("codigo").value = producto.codigo || "";
    document.getElementById("nombre").value = producto.nombre || "";
    document.getElementById("descripcion").value = producto.descripcion || "";
    document.getElementById("precio").value = Number(String(producto.precio).replace(/[^0-9.]/g, "")) || "";
    document.getElementById("stock").value = producto.stock ?? "";
    document.getElementById("stock-critico").value = producto.stockCritico ?? "";

    const categoriaSelect = document.getElementById("categoria");
    const opcion = [...categoriaSelect.options].find(o => o.textContent === producto.categoria);
    if (opcion) categoriaSelect.value = opcion.value;

    activarLimpiezaDeErroresProducto();

    document.querySelector(".admin-formulario").addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validarCamposProducto()) return;

        guardarProductoEditado(codigoOriginal, leerDatosFormularioProducto());
        window.location.href = "productos.html";
    });
}

function prepararVistaProducto() {
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;

    const codigo = new URLSearchParams(window.location.search).get("codigo");
    const producto = obtenerTodosLosProductos().find(p => p.codigo === codigo);

    if (!producto) {
        contenedor.innerHTML = "<p>No se encontró el producto.</p>";
        return;
    }

    const critico = producto.stockCritico !== undefined && producto.stock <= producto.stockCritico;

    contenedor.innerHTML = `
        <dl>
            <dt>Código</dt>
            <dd>${producto.codigo}</dd>

            <dt>Nombre</dt>
            <dd>${producto.nombre}</dd>

            <dt>Descripción</dt>
            <dd>${producto.descripcion || "—"}</dd>

            <dt>Precio</dt>
            <dd>${producto.precio}</dd>

            <dt>Stock</dt>
            <dd>${producto.stock}${critico ? ' <span class="badge badge-stock-critico">Crítico</span>' : ""}</dd>

            <dt>Categoría</dt>
            <dd>${producto.categoria}</dd>
        </dl>

        <div class="acciones-form">
            ${localStorage.getItem("usuarioTipo") === "vendedor" ? "" : `<a href="producto-editar.html?codigo=${encodeURIComponent(producto.codigo)}" class="btn-gold">Editar</a>`}
            <a href="productos.html" class="btn-outline">Volver al listado</a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarTablaProductos();
    prepararFormularioProducto();
    prepararEdicionProducto();
    prepararVistaProducto();
});

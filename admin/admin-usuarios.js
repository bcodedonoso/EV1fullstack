const USUARIOS_NUEVOS_KEY = "usuariosNuevos";
const USUARIOS_EDITADOS_KEY = "usuariosEditados";

const BADGE_POR_TIPO = {
    administrador: "badge-admin",
    cliente: "badge-cliente"
};

const CAMPOS_REQUERIDOS_USUARIO = [
    { id: "run", label: "Run" },
    { id: "nombre", label: "Nombre" },
    { id: "apellidos", label: "Apellidos" },
    { id: "correo", label: "Correo" },
    { id: "tipo-usuario", label: "Tipo de usuario" },
    { id: "region", label: "Región" },
    { id: "direccion", label: "Dirección" }
];

function leerUsuariosNuevos() {
    return JSON.parse(localStorage.getItem(USUARIOS_NUEVOS_KEY)) || [];
}

function guardarUsuarioNuevo(usuario) {
    const nuevos = leerUsuariosNuevos();
    nuevos.push(usuario);
    localStorage.setItem(USUARIOS_NUEVOS_KEY, JSON.stringify(nuevos));
}

function leerUsuariosEditados() {
    return JSON.parse(localStorage.getItem(USUARIOS_EDITADOS_KEY)) || {};
}

// Los usuarios hardcodeados no se pueden mutar, así que la edición se guarda
// aparte, indexada por el correo original, y se aplica encima al combinar todo.
function guardarUsuarioEditado(correoOriginal, datos) {
    const editados = leerUsuariosEditados();
    editados[correoOriginal] = datos;
    localStorage.setItem(USUARIOS_EDITADOS_KEY, JSON.stringify(editados));
}

function obtenerTodosLosUsuarios() {
    const editados = leerUsuariosEditados();
    return USUARIOS.concat(leerUsuariosNuevos()).map(u => editados[u.correo] || u);
}

function renderizarTablaUsuarios() {
    const tbody = document.getElementById("tabla-usuarios");
    if (!tbody) return;

    tbody.innerHTML = obtenerTodosLosUsuarios().map(u => `
        <tr>
            <td>${u.nombre}</td>
            <td>${u.correo}</td>
            <td><span class="badge ${BADGE_POR_TIPO[u.tipo] || ""}">${u.tipo}</span></td>
            <td class="acciones">
                <a href="usuario-ver.html?correo=${encodeURIComponent(u.correo)}" class="btn-outline">Ver</a>
                <a href="usuario-editar.html?correo=${encodeURIComponent(u.correo)}" class="btn-dark">Editar</a>
            </td>
        </tr>
    `).join("");
}

function activarLimpiezaDeErrores() {
    CAMPOS_REQUERIDOS_USUARIO.forEach(({ id }) => {
        const campo = document.getElementById(id);
        campo.addEventListener("input", () => campo.classList.remove("campo-invalido"));
        campo.addEventListener("change", () => campo.classList.remove("campo-invalido"));
    });
}

function validarCamposUsuario() {
    const faltantes = CAMPOS_REQUERIDOS_USUARIO.filter(({ id }) => {
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

function leerDatosFormularioUsuario() {
    return {
        run: document.getElementById("run").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        tipo: document.getElementById("tipo-usuario").value,
        region: document.getElementById("region").value,
        comuna: document.getElementById("comuna").value,
        direccion: document.getElementById("direccion").value.trim()
    };
}

function prepararFormularioUsuario() {
    if (!window.location.pathname.endsWith("usuario-nuevo.html")) return;

    activarLimpiezaDeErrores();

    document.querySelector(".admin-formulario").addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validarCamposUsuario()) return;

        guardarUsuarioNuevo(leerDatosFormularioUsuario());
        window.location.href = "usuarios.html";
    });
}

function prepararEdicionUsuario() {
    if (!window.location.pathname.endsWith("usuario-editar.html")) return;

    const correoOriginal = new URLSearchParams(window.location.search).get("correo");
    const usuario = obtenerTodosLosUsuarios().find(u => u.correo === correoOriginal);

    if (!usuario) {
        mostrarToastPersistente("No se encontró el usuario a editar.");
        return;
    }

    document.getElementById("run").value = usuario.run || "";
    document.getElementById("nombre").value = usuario.nombre || "";
    document.getElementById("apellidos").value = usuario.apellidos || "";
    document.getElementById("correo").value = usuario.correo || "";
    document.getElementById("tipo-usuario").value = usuario.tipo || "";
    document.getElementById("region").value = usuario.region || "";
    document.getElementById("direccion").value = usuario.direccion || "";

    activarLimpiezaDeErrores();

    document.querySelector(".admin-formulario").addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validarCamposUsuario()) return;

        guardarUsuarioEditado(correoOriginal, leerDatosFormularioUsuario());
        window.location.href = "usuarios.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarTablaUsuarios();
    prepararFormularioUsuario();
    prepararEdicionUsuario();
});

function mostrarLinkAdmin() {
    const tipo = localStorage.getItem("usuarioTipo");
    if (tipo !== "administrador" && tipo !== "vendedor") return;

    const nav = document.querySelector(".navdiv ul");
    if (!nav) return;

    const li = document.createElement("li");
    li.innerHTML = '<a href="/admin/index.html">Panel Admin</a>';
    nav.appendChild(li);
}

document.addEventListener("DOMContentLoaded", mostrarLinkAdmin);

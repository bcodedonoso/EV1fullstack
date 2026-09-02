function mostrarLinkAdmin() {
    if (localStorage.getItem("usuarioTipo") !== "administrador") return;

    const nav = document.querySelector(".navdiv ul");
    if (!nav) return;

    const li = document.createElement("li");
    li.innerHTML = '<a href="/admin/index.html">Panel Admin</a>';
    nav.appendChild(li);
}

document.addEventListener("DOMContentLoaded", mostrarLinkAdmin);

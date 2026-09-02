// Acceso al panel: solo administrador y vendedor. El vendedor solo puede
// ver el listado de productos y su detalle; el resto se oculta y se bloquea.
(function () {
    const PAGINAS_VENDEDOR = ["index.html", "productos.html", "producto-ver.html"];

    const tipo = localStorage.getItem("usuarioTipo");
    if (tipo !== "administrador" && tipo !== "vendedor") {
        window.location.href = "../login.html";
        return;
    }

    if (tipo === "vendedor") {
        document.querySelectorAll(".solo-admin").forEach(el => el.remove());

        const pagina = window.location.pathname.split("/").pop() || "index.html";
        if (!PAGINAS_VENDEDOR.includes(pagina)) {
            window.location.href = "productos.html";
        }
    }
})();

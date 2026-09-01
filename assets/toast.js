function mostrarToast(mensaje, duracion = 3000) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    // Elimina cualquier toast anterior para que solo haya uno visible
    container.innerHTML = "";

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = mensaje;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duracion);
}

// Toast que no se autodestruye: queda en pantalla hasta llamar a ocultarToastPersistente().
let toastPersistente = null;

function mostrarToastPersistente(mensaje) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    if (!toastPersistente) {
        toastPersistente = document.createElement("div");
        toastPersistente.className = "toast";
        container.appendChild(toastPersistente);
        requestAnimationFrame(() => toastPersistente.classList.add("show"));
    }

    toastPersistente.textContent = mensaje;
}

function ocultarToastPersistente() {
    if (!toastPersistente) return;
    const el = toastPersistente;
    toastPersistente = null;
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
}

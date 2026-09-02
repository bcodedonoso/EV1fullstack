const formContacto = document.getElementById('formularioContacto');

formContacto.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contenido = document.getElementById('contenido').value.trim();

    // Dominios permitidos
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    const regexEmailBase = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- Nombre: requerido, máximo 100 caracteres ---
    if (nombre === '') {
        mostrarToast('El nombre es obligatorio.');
        return;
    }
    if (nombre.length > 100) {
        mostrarToast('El nombre no puede superar los 100 caracteres.');
        return;
    }

    // --- Correo: requerido, máximo 100 caracteres, dominios permitidos ---
    if (correo === '') {
        mostrarToast('El correo es obligatorio.');
        return;
    }
    if (correo.length > 100) {
        mostrarToast('El correo no puede superar los 100 caracteres.');
        return;
    }
    if (!regexEmailBase.test(correo)) {
        mostrarToast('Ingresa un correo electrónico válido.');
        return;
    }
    const dominioValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
    if (!dominioValido) {
        mostrarToast('Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
        return;
    }

    // --- Comentario: requerido, máximo 500 caracteres ---
    if (contenido === '') {
        mostrarToast('El comentario es obligatorio.');
        return;
    }
    if (contenido.length > 500) {
        mostrarToast('El comentario no puede superar los 500 caracteres.');
        return;
    }

    mostrarToast('¡Mensaje enviado con éxito!');
    formContacto.reset();
});
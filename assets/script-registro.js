const comunasPorRegion = {
  rm: ["Santiago", "Providencia", "Maipú"],
  araucania: ["Temuco", "Villarrica"],
  nuble: ["Chillán", "San Carlos"],
};

const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

selectRegion.addEventListener("change", () => {
  const comunas = comunasPorRegion[selectRegion.value] || [];
  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
  selectComuna.disabled = comunas.length === 0;
  comunas.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.toLowerCase();
    opt.textContent = c;
    selectComuna.appendChild(opt);
  });
});

const form = document.getElementById('formularioContacto');

function mostrarError(inputId, mensaje) {
    const input = document.getElementById(inputId);
    let error = input.parentElement.querySelector('.error-msg');
    if (!error) {
        error = document.createElement('small');
        error.className = 'error-msg';
        error.style.color = 'red';
        input.parentElement.appendChild(error);
    }
    error.textContent = mensaje;
    input.classList.add('input-error');
}

function limpiarError(inputId) {
    const input = document.getElementById(inputId);
    const error = input.parentElement.querySelector('.error-msg');
    if (error) error.textContent = '';
    input.classList.remove('input-error');
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let esValido = true;

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailConfirmar = document.getElementById('email-confirmar').value.trim();
    const contrasena = document.getElementById('contraseña').value;
    const contrasenaConfirmar = document.getElementById('contraseña-confirmar').value;
    const telefono = document.getElementById('telefono').value.trim();
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^\+?[0-9\s]{8,15}$/;

    // Nombre
    if (nombre.length < 3) {
        mostrarError('nombre', 'Ingresa tu nombre completo (mínimo 3 caracteres).');
        esValido = false;
    } else {
        limpiarError('nombre');
    }

    // Email
    if (!regexEmail.test(email)) {
        mostrarError('email', 'Ingresa un correo electrónico válido.');
        esValido = false;
    } else {
        limpiarError('email');
    }

    // Confirmar email
    if (email !== emailConfirmar || emailConfirmar === '') {
        mostrarError('email-confirmar', 'Los correos no coinciden.');
        esValido = false;
    } else {
        limpiarError('email-confirmar');
    }

    // Contraseña (mínimo 6 caracteres, al menos una letra y un número)
    const regexContrasena = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!regexContrasena.test(contrasena)) {
        mostrarError('contraseña', 'Mínimo 6 caracteres, con al menos una letra y un número.');
        esValido = false;
    } else {
        limpiarError('contraseña');
    }

    // Confirmar contraseña
    if (contrasena !== contrasenaConfirmar || contrasenaConfirmar === '') {
        mostrarError('contraseña-confirmar', 'Las contraseñas no coinciden.');
        esValido = false;
    } else {
        limpiarError('contraseña-confirmar');
    }

    // Teléfono (opcional, pero si se llena debe ser válido)
    if (telefono !== '' && !regexTelefono.test(telefono)) {
        mostrarError('telefono', 'Ingresa un teléfono válido (ej: +56 9 1234 5678).');
        esValido = false;
    } else {
        limpiarError('telefono');
    }

    // Región
    if (region === '') {
        mostrarError('region', 'Selecciona una región.');
        esValido = false;
    } else {
        limpiarError('region');
    }

    // Comuna
    if (comuna === '') {
        mostrarError('comuna', 'Selecciona una comuna.');
        esValido = false;
    } else {
        limpiarError('comuna');
    }

    if (esValido) {
        mostrarToast('¡Registro exitoso!');
        form.reset();
        selectComuna.disabled = true;
    }
});
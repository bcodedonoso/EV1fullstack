# Zthorken Online

Tienda online (HTML, CSS y JavaScript puro, sin backend) para la evaluación DSY1104. Incluye vistas de tienda (catálogo, detalle de producto, carrito, contacto, registro/login) y un panel de administración separado en `admin/`.

## Cómo ejecutarlo

No requiere instalación ni servidor: basta con abrir `index.html` en el navegador, o servir la carpeta con cualquier servidor estático (ej. extensión Live Server / Live Preview de VS Code).

## Ingresar al panel admin

1. Ir a `login.html` e iniciar sesión con una cuenta de tipo **administrador** o **vendedor** (ver tabla abajo).
2. El login redirige automáticamente a `admin/index.html`.
3. Desde la tienda, si hay sesión de administrador o vendedor activa, aparece un link "Panel Admin" en el menú para volver.
4. Desde el panel admin, "Volver a la tienda" en el pie del sidebar regresa al sitio público.

La sesión se guarda en `localStorage` (`sesionActiva`, `usuarioNombre`, `usuarioTipo`). No hay backend: quien conozca la URL puede entrar a `admin/*.html` directamente, pero sin sesión de administrador/vendedor es redirigido a `login.html`.

## Roles

| Rol | Acceso al panel admin |
| --- | --- |
| **Administrador** | Todo: Dashboard, Productos (crear/editar/ver) y Usuarios (crear/editar/ver). |
| **Vendedor** | Solo Dashboard y Productos, en modo lectura (listado y detalle, sin crear/editar). No ve la sección Usuarios. |
| **Cliente** | Sin acceso al panel admin; solo la tienda. |

## Cuentas hardcodeadas (`assets/usuarios-data.js`)

No hay base de datos: estas cuentas están escritas directamente en el código, solo para efectos de la evaluación.

| Correo | Contraseña | Rol |
| --- | --- | --- |
| admin@duoc.cl | admin123 | administrador |
| vendedor@duoc.cl | vendedor1 | vendedor |
| juan@gmail.com | juan123 | cliente |
| maria@gmail.com | maria123 | cliente |

El login solo acepta correos `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`, por eso las cuentas de ejemplo usan esos dominios.

Los usuarios y productos creados/editados desde el panel admin, y los registrados desde `registro.html`, también se guardan en `localStorage` (no persisten en un servidor ni se comparten entre navegadores).

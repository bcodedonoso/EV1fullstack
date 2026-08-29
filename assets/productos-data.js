// Datos centralizados de todos los productos.
// Cada página de detalle (detalleProductoN.html) usa este mismo arreglo
// junto con detalle-producto.js para pintar la información en pantalla.

const productos = [
  {
    id: 1,
    nombre: "Audífonos inalámbricos con cancelación de ruido",
    precio: "$80.000",
    imagen: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Audífonos inalámbricos con cancelación de ruido",
    categoria: "Audio",
    descripcion: "Sumérgete en tu música sin distracciones. Estos audífonos inalámbricos incorporan cancelación activa de ruido, hasta 30 horas de batería y un ajuste acolchado pensado para uso prolongado, ya sea en la oficina, el gimnasio o tus viajes."
  },
  {
    id: 2,
    nombre: "Parlante bluetooth portátil resistente al agua",
    precio: "$35.000",
    imagen: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Parlante bluetooth portátil resistente al agua",
    categoria: "Audio",
    descripcion: "Un parlante compacto con certificación de resistencia al agua, ideal para llevar a la piscina, la playa o el camping. Conexión bluetooth estable, sonido potente y batería de larga duración para que la música no pare."
  },
  {
    id: 3,
    nombre: "Power bank 20,000mAh carga rápida",
    precio: "$25.000",
    imagen: "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=1249&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Power bank 20,000mAh carga rápida",
    categoria: "Accesorios Tech",
    descripcion: "Batería portátil de 20,000mAh con tecnología de carga rápida, capaz de recargar tu celular varias veces sin necesidad de un enchufe cerca. Compacta, liviana y perfecta para el día a día o para viajes largos."
  },
  {
    id: 4,
    nombre: "Cargador inalámbrico magnético (tipo MagSafe)",
    precio: "$20.000",
    imagen: "https://images.unsplash.com/photo-1598978465764-7db2b679c694?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cargador inalámbrico magnético (tipo MagSafe)",
    categoria: "Accesorios Tech",
    descripcion: "Olvídate de los cables enredados. Este cargador magnético se alinea automáticamente con tu celular y carga en minutos. Compatible con la mayoría de los smartphones modernos con carga inalámbrica."
  },
  {
    id: 5,
    nombre: "Smartwatch con monitor de salud",
    precio: "$45.000",
    imagen: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Smartwatch con monitor de salud",
    categoria: "Tecnología",
    descripcion: "Controla tu ritmo cardíaco, tus horas de sueño y tu actividad física desde tu muñeca. Este smartwatch se conecta a tu celular para mostrarte notificaciones y acompañarte en tu rutina diaria."
  },
  {
    id: 6,
    nombre: "Teclado mecánico inalámbrico",
    precio: "$35.000",
    imagen: "https://images.unsplash.com/photo-1632079003110-d694908500da?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Teclado mecánico inalámbrico",
    categoria: "Tecnología",
    descripcion: "Teclado mecánico con conexión inalámbrica, retroiluminación y switches de respuesta táctil, pensado tanto para trabajar como para jugar. Su batería de larga duración te acompaña todo el día sin cables de por medio."
  },
  {
    id: 7,
    nombre: "Mouse ergonómico inalámbrico",
    precio: "$18.000",
    imagen: "https://images.unsplash.com/photo-1625750435936-f97e1748410b?q=80&w=1276&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Mouse ergonómico inalámbrico",
    categoria: "Tecnología",
    descripcion: "Diseñado para reducir la tensión en la muñeca durante largas jornadas de trabajo. Este mouse inalámbrico combina un agarre ergonómico con sensores de precisión y conexión estable."
  },
  {
    id: 8,
    nombre: "Cámara web full HD",
    precio: "$22.000",
    imagen: "https://images.unsplash.com/photo-1614588876378-b2ffa4520c22?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cámara web full HD",
    categoria: "Tecnología",
    descripcion: "Cámara web con resolución full HD y micrófono incorporado, ideal para videollamadas, clases online o transmisiones en vivo. Se instala en segundos y funciona con la mayoría de plataformas."
  },
  {
    id: 9,
    nombre: "Soporte ajustable para laptop",
    precio: "$19.000",
    imagen: "https://images.unsplash.com/photo-1663873148245-df991e1717ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Soporte ajustable para laptop",
    categoria: "Accesorios Tech",
    descripcion: "Eleva tu laptop a una altura más cómoda para mejorar tu postura y la ventilación del equipo. Su estructura ajustable y plegable lo hace fácil de transportar y guardar."
  }
];

# Consulta de servicios de infraestructura TI

Sitio estático (HTML, CSS y JavaScript) para consultar el catálogo de servicios
de infraestructura TI y solicitar una asesoría. 

## Estructura

```
CONSULTA_ASESORIAS/
├── index.html                  Catálogo de servicios
├── css/
│   ├── base.css                Variables, reset y utilidades comunes
│   ├── servicios.css           Estilos del catálogo
│   ├── formulario.css          Estilos del formulario
│   └── confirmacion.css        Estilos de la confirmación
├── js/
│   ├── servicios.js            Filtros, búsqueda y ventana de detalle
│   ├── formulario.js           Validación y envío del formulario
│   └── confirmacion.js         Muestra el resumen de la solicitud
├── data/
│   └── servicios.js            Datos del catálogo
└── views/
    ├── solicitar-asesoria.html Formulario de solicitud
    └── confirmacion.html       Confirmación de envío
```

## Páginas

- `index.html`: catálogo con buscador, filtro por categoría y detalle de cada servicio.
- `views/solicitar-asesoria.html`: formulario para describir una necesidad.
- `views/confirmacion.html`: resumen tras enviar la solicitud.

## Líneas de servicio

1. Mantenimiento de equipos y redes
2. Seguridad informática
3. Servidores
4. Consultoría / Asesoría TI

Para agregar un servicio se añade un objeto a `data/servicios.js`; el catálogo
y los contadores por categoría se construyen a partir de ese arreglo.

## Ejecución

Abrir `index.html` en el navegador, o servirlo con un servidor local:

```
python -m http.server 8000
```

## Estado actual

Esquema de interfaz. El buscador, los filtros y la ventana de detalle funcionan.
El envío del formulario guarda los datos en `localStorage` y redirige a la
confirmación.

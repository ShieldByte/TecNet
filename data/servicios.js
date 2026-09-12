// Datos del catálogo de servicios.
// Líneas de servicio: mantenimiento de equipos y redes, seguridad
// informática, servidores y consultoría/asesoría TI.

const CATEGORIAS = [
  { id: "todos", nombre: "Todos los servicios" },
  { id: "mantenimiento", nombre: "Mantenimiento de equipos y redes" },
  { id: "seguridad", nombre: "Seguridad informática" },
  { id: "servidores", nombre: "Servidores" },
  { id: "consultoria", nombre: "Consultoría / Asesoría TI" },
];

const SERVICIOS = [
  // Mantenimiento de equipos y redes
  {
    id: "mantenimiento-preventivo",
    nombre: "Mantenimiento preventivo de equipos",
    categoria: "mantenimiento",
    resumen:
      "Limpieza física, revisión de hardware y actualización de software para evitar fallas.",
    descripcion:
      "Visitas programadas para limpieza interna de equipos, revisión de componentes, aplicación de actualizaciones del sistema operativo y de los programas, depuración de archivos y verificación del estado general de cada equipo.",
    entregables: [
      "Calendario de visitas de mantenimiento",
      "Limpieza física y revisión de hardware",
      "Actualización de sistema operativo y programas",
      "Bitácora del estado de cada equipo",
    ],
    modalidad: "Servicio en sitio",
    duracion: "Contrato mensual o trimestral",
    nivel: "Básico",
    destacado: true,
  },
  {
    id: "config-red-local",
    nombre: "Configuración de red local (LAN)",
    categoria: "mantenimiento",
    resumen:
      "Puesta a punto de la red interna: direccionamiento, Wi-Fi, impresoras y carpetas compartidas.",
    descripcion:
      "Configuración del router y switches, asignación de direcciones IP, red inalámbrica para el personal e invitados, conexión de impresoras en red y carpetas compartidas entre los equipos de la oficina.",
    entregables: [
      "Router y switches configurados",
      "Esquema de direccionamiento IP",
      "Red Wi-Fi de personal e invitados",
      "Impresoras y carpetas compartidas operativas",
    ],
    modalidad: "Servicio en sitio",
    duracion: "2 a 5 días",
    nivel: "Intermedio",
    destacado: false,
  },
  {
    id: "cableado-red",
    nombre: "Cableado y organización de red",
    categoria: "mantenimiento",
    resumen:
      "Tendido de cable de red ordenado y etiquetado, con armado y limpieza del rack.",
    descripcion:
      "Instalación de nuevos puntos de red, reemplazo de cable en mal estado, armado y ordenamiento del rack de comunicaciones, etiquetado de cada punto y prueba de conectividad punto por punto.",
    entregables: [
      "Puntos de red nuevos o reemplazados",
      "Rack organizado y etiquetado",
      "Mapa de puntos de red",
      "Pruebas de conectividad por punto",
    ],
    modalidad: "Servicio en sitio",
    duracion: "1 a 2 semanas",
    nivel: "Intermedio",
    destacado: false,
  },

  // Seguridad informática
  {
    id: "firewall",
    nombre: "Instalación y configuración de firewall",
    categoria: "seguridad",
    resumen:
      "Filtrado del tráfico de entrada y salida para proteger la red de la empresa.",
    descripcion:
      "Instalación del firewall, definición de reglas por servicio, bloqueo de sitios y aplicaciones no permitidas, control de acceso a internet por área y registro del tráfico para su revisión.",
    entregables: [
      "Firewall instalado y en operación",
      "Reglas de filtrado documentadas",
      "Políticas de navegación por área",
      "Registro de tráfico habilitado",
    ],
    modalidad: "Remoto o en sitio",
    duracion: "3 a 7 días",
    nivel: "Avanzado",
    destacado: true,
  },
  {
    id: "antivirus-corporativo",
    nombre: "Antivirus corporativo administrado",
    categoria: "seguridad",
    resumen:
      "Antivirus centralizado en todos los equipos, con consola de control y reportes.",
    descripcion:
      "Despliegue del antivirus corporativo en todos los equipos, administración desde una consola central, análisis programados, atención de detecciones y reporte mensual del estado de protección.",
    entregables: [
      "Antivirus instalado en todos los equipos",
      "Consola central de administración",
      "Análisis y actualizaciones automáticas",
      "Reporte mensual de amenazas",
    ],
    modalidad: "Servicio gestionado",
    duracion: "Contrato mensual",
    nivel: "Intermedio",
    destacado: false,
  },
  {
    id: "respaldos-automatizados",
    nombre: "Respaldos automatizados",
    categoria: "seguridad",
    resumen:
      "Copias de seguridad automáticas de la información importante, con pruebas de restauración.",
    descripcion:
      "Definición de qué información respaldar, configuración de respaldos automáticos locales y en la nube, cifrado de las copias, monitoreo diario y pruebas periódicas de restauración para asegurar que los datos se pueden recuperar.",
    entregables: [
      "Plan de respaldo (qué, cuándo y dónde)",
      "Respaldos automáticos local y en la nube",
      "Monitoreo diario de las copias",
      "Pruebas de restauración documentadas",
    ],
    modalidad: "Servicio gestionado",
    duracion: "Contrato mensual",
    nivel: "Intermedio",
    destacado: true,
  },

  // Servidores
  {
    id: "instalacion-servidores",
    nombre: "Instalación y configuración de servidores",
    categoria: "servidores",
    resumen:
      "Puesta en marcha de servidores con los roles que la empresa necesita.",
    descripcion:
      "Instalación del sistema operativo, configuración de almacenamiento, roles de red (usuarios, archivos, impresión, base de datos), configuración inicial de seguridad y esquema de actualizaciones.",
    entregables: [
      "Servidor instalado y documentado",
      "Roles y servicios configurados",
      "Configuración inicial de seguridad",
      "Entrega segura de credenciales",
    ],
    modalidad: "Remoto o en sitio",
    duracion: "3 a 10 días",
    nivel: "Intermedio",
    destacado: false,
  },
  {
    id: "monitoreo-servidores",
    nombre: "Monitoreo de servidores",
    categoria: "servidores",
    resumen:
      "Vigilancia del estado de los servidores con alertas antes de que ocurra una falla.",
    descripcion:
      "Instalación de una herramienta de monitoreo, control de disco, memoria, procesador y servicios, alertas por correo cuando algo se sale de lo normal y reporte mensual de disponibilidad y capacidad.",
    entregables: [
      "Herramienta de monitoreo configurada",
      "Alertas por correo definidas",
      "Panel de estado de los servidores",
      "Informe mensual de disponibilidad",
    ],
    modalidad: "Servicio gestionado",
    duracion: "Contrato mensual",
    nivel: "Básico",
    destacado: false,
  },
  {
    id: "migracion-nube",
    nombre: "Migración de servidores a la nube",
    categoria: "servidores",
    resumen:
      "Traslado planificado de servidores y servicios a la nube, con control de costos.",
    descripcion:
      "Revisión de los servidores actuales, elección del proveedor de nube, diseño de la arquitectura destino, migración por fases con mínima interrupción y ajuste de recursos para controlar el costo mensual.",
    entregables: [
      "Análisis de servidores y costos estimados",
      "Arquitectura en la nube definida",
      "Migración por fases ejecutada",
      "Panel de seguimiento de costos",
    ],
    modalidad: "Remoto",
    duracion: "3 a 8 semanas",
    nivel: "Avanzado",
    destacado: true,
  },

  // Consultoría / Asesoría TI
  {
    id: "diagnostico-infraestructura",
    nombre: "Diagnóstico de infraestructura TI",
    categoria: "consultoria",
    resumen:
      "Revisión completa del estado actual de equipos, red, servidores y seguridad.",
    descripcion:
      "Levantamiento del inventario de equipos y servicios, revisión de la red y los servidores, evaluación de seguridad y respaldos, e informe con los hallazgos y recomendaciones ordenadas por prioridad.",
    entregables: [
      "Inventario de equipos y servicios",
      "Evaluación de red, servidores y seguridad",
      "Informe de hallazgos priorizado",
      "Recomendaciones y estimación de esfuerzo",
    ],
    modalidad: "Remoto o en sitio",
    duracion: "1 a 3 semanas",
    nivel: "Intermedio",
    destacado: true,
  },
  {
    id: "plan-crecimiento",
    nombre: "Plan de crecimiento tecnológico",
    categoria: "consultoria",
    resumen:
      "Hoja de ruta para que la infraestructura acompañe el crecimiento de la empresa.",
    descripcion:
      "A partir del diagnóstico y de los objetivos del negocio, se define una hoja de ruta de 12 a 24 meses: qué renovar, qué incorporar, en qué orden y con qué presupuesto estimado por etapa.",
    entregables: [
      "Objetivos tecnológicos alineados al negocio",
      "Hoja de ruta de 12 a 24 meses",
      "Prioridades y dependencias entre proyectos",
      "Presupuesto estimado por etapa",
    ],
    modalidad: "Remoto o en sitio",
    duracion: "2 a 4 semanas",
    nivel: "Avanzado",
    destacado: false,
  },
];

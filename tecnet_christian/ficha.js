const fichaReto = {
    nombreReto: "Gestor de calificaciones",

    objetivo:
        "Desarrollar una aplicacion web que permita registrar estudiantes y sus calificaciones, " +
        "mostrar su estado academico, calcular el promedio general y filtrar los registros.",

    entradas: [
        "Nombre del estudiante",
        "Calificacion del estudiante entre 0 y 10"
    ],

    proceso: [
        "Validar que el nombre no este vacio",
        "Validar que la calificacion sea numerica",
        "Validar que la calificacion este entre 0 y 10",
        "Guardar cada estudiante en un arreglo",
        "Determinar si el estudiante esta aprobado o reprobado",
        "Calcular el promedio general del grupo",
        "Filtrar estudiantes aprobados o reprobados",
        "Eliminar estudiantes registrados"
    ],

    salidas: [
        "Tabla con los estudiantes registrados",
        "Nombre del estudiante",
        "Calificacion",
        "Estado: Aprobado o Reprobado",
        "Promedio general del grupo",
        "Mensajes de validacion"
    ],

    restricciones: [
        "El nombre no puede estar vacio",
        "La calificacion debe ser un numero",
        "La calificacion debe estar entre 0 y 10",
        "Un estudiante se considera aprobado con una calificacion igual o mayor a 6",
        "No se deben registrar datos invalidos"
    ],

    conceptosJavascript: [
        "Arrays",
        "Objetos",
        "Funciones",
        "Eventos",
        "Manipulacion del DOM",
        "filter()",
        "reduce()"
    ],

    resena:
        "El reto utiliza JavaScript para administrar dinamicamente una lista de estudiantes. " +
        "Los registros se almacenan en un arreglo de objetos y la interfaz se actualiza mediante " +
        "manipulacion del DOM. Tambien se utilizan eventos para responder a las acciones del usuario.",

    conclusion:
        "La conclusion se completara despues de implementar y probar el reto.",

    referencias: [
        "Documentacion de JavaScript",
        "Material proporcionado durante la practica"
    ],

    aportaciones: [
        {
            integrante: "Christian Raul Paramo Bautista",
            aportacion:
                "Analisis, diseno, implementacion, validaciones y pruebas del gestor de calificaciones."
        }
    ]
};
const fichaReto = {

    nombreReto: "Gestor de calificaciones",

    integrantes: [
        "Christian Raul Paramo Bautista"
    ],

    objetivo:
        "Desarrollar una aplicación web que permita registrar estudiantes y sus " +
        "calificaciones, determinar si están aprobados o reprobados, calcular el " +
        "promedio general del grupo y filtrar los registros.",


    entradas: [
        "Nombre del estudiante",
        "Calificación del estudiante entre 0 y 10"
    ],


    proceso: [
        "Validar que el nombre no esté vacío",
        "Validar que la calificación sea numérica",
        "Validar que la calificación esté entre 0 y 10",
        "Guardar los estudiantes en un arreglo",
        "Determinar si cada estudiante está aprobado o reprobado",
        "Mostrar los estudiantes dinámicamente en una tabla",
        "Calcular el promedio general del grupo",
        "Filtrar estudiantes aprobados y reprobados",
        "Eliminar estudiantes registrados"
    ],


    salidas: [
        "Tabla con estudiantes registrados",
        "Calificación de cada estudiante",
        "Estado de aprobado o reprobado",
        "Promedio general del grupo",
        "Total de estudiantes registrados",
        "Mensajes de validación"
    ],


    restricciones: [
        "El nombre del estudiante no puede estar vacío",
        "La calificación debe ser un valor numérico",
        "La calificación debe estar entre 0 y 10",
        "Una calificación igual o mayor a 6 se considera aprobatoria",
        "No se permiten registros con datos inválidos"
    ],


    conceptosJavascript: [

        {
            concepto: "Arrays y objetos",

            descripcion:
                "Los estudiantes se almacenan dentro de un arreglo. Cada estudiante " +
                "se representa mediante un objeto que contiene su nombre y calificación.",

            uso:
                "El arreglo estudiantes permite mantener y administrar todos los " +
                "registros agregados durante la ejecución de la aplicación."
        },

        {
            concepto: "Manipulación del DOM",

            descripcion:
                "JavaScript permite seleccionar y modificar elementos de la página HTML.",

            uso:
                "Se utiliza document.getElementById() para obtener los elementos de " +
                "la interfaz y document.createElement() para crear dinámicamente las " +
                "filas de la tabla."
        },

        {
            concepto: "Eventos",

            descripcion:
                "Los eventos permiten ejecutar acciones cuando el usuario interactúa " +
                "con los elementos de la página.",

            uso:
                "Se utiliza addEventListener() para detectar cuando el usuario presiona " +
                "el botón de agregar, selecciona un filtro o presiona la tecla Enter."
        },

        {
            concepto: "filter()",

            descripcion:
                "El método filter() permite crear un nuevo arreglo utilizando únicamente " +
                "los elementos que cumplen una condición.",

            uso:
                "Se utiliza para mostrar únicamente estudiantes aprobados o reprobados."
        },

        {
            concepto: "reduce()",

            descripcion:
                "El método reduce() permite recorrer un arreglo y obtener un único resultado.",

            uso:
                "Se utiliza para sumar todas las calificaciones y posteriormente calcular " +
                "el promedio general del grupo."
        }

    ],


    resena:
        "El reto Gestor de calificaciones permitió aplicar diferentes conceptos de " +
        "JavaScript en una aplicación interactiva. Los estudiantes se almacenan mediante " +
        "un arreglo de objetos y la información se muestra dinámicamente utilizando " +
        "manipulación del DOM. Los eventos permiten responder a las acciones del usuario, " +
        "mientras que los métodos filter() y reduce() facilitan el filtrado de estudiantes " +
        "y el cálculo del promedio. También se implementaron validaciones para evitar " +
        "el registro de datos incorrectos.",


    conclusion:
        "Durante el desarrollo se decidió utilizar un arreglo de objetos para almacenar " +
        "a los estudiantes, debido a que permite administrar de forma sencilla el nombre " +
        "y la calificación de cada registro. Una de las principales dificultades fue " +
        "mantener correctamente actualizada la tabla y el promedio después de eliminar " +
        "o filtrar estudiantes, lo cual se resolvió mediante funciones encargadas de " +
        "actualizar nuevamente la interfaz. Como limitación, los datos solamente permanecen " +
        "mientras la página está abierta, ya que todavía no se utiliza almacenamiento local " +
        "ni una base de datos. Durante la práctica también se aprendió a trabajar con ramas " +
        "de Git, realizar commits separados según los cambios realizados y subir una rama " +
        "remota para posteriormente integrarla mediante una Pull Request.",


    referencias: [
        "Documentación de JavaScript",
        "Material proporcionado por el docente para la práctica Git-JavaScript-retos"
    ],


    aportaciones: [
        {
            integrante: "Christian Raul Paramo Bautista",

            aportacion:
                "Análisis del reto, diseño de la interfaz, implementación del Gestor de " +
                "calificaciones, validaciones, filtros, cálculo del promedio, pruebas " +
                "funcionales y documentación."
        }
    ]

};
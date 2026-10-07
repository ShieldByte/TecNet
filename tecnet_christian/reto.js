let estudiantes = [];

const inputNombre = document.getElementById("nombre");
const inputCalificacion = document.getElementById("calificacion");
const btnAgregar = document.getElementById("btnAgregar");
const mensaje = document.getElementById("mensaje");

const tablaEstudiantes = document.getElementById("tablaEstudiantes");
const promedio = document.getElementById("promedio");
const totalEstudiantes = document.getElementById("totalEstudiantes");

const botonesFiltro = document.querySelectorAll(".btnFiltro");

let filtroActual = "todos";


function agregarEstudiante() {

    const nombre = inputNombre.value.trim();
    const calificacion = parseFloat(inputCalificacion.value);

    if (nombre === "") {
        mostrarMensaje("Ingresa el nombre del estudiante.", "error");
        return;
    }

    if (inputCalificacion.value === "" || isNaN(calificacion)) {
        mostrarMensaje("Ingresa una calificación válida.", "error");
        return;
    }

    if (calificacion < 0 || calificacion > 10) {
        mostrarMensaje(
            "La calificación debe estar entre 0 y 10.",
            "error"
        );
        return;
    }

    const estudiante = {
        nombre: nombre,
        calificacion: calificacion
    };

    estudiantes.push(estudiante);

    mostrarMensaje(
        "Estudiante agregado correctamente.",
        "exito"
    );

    inputNombre.value = "";
    inputCalificacion.value = "";

    mostrarEstudiantes();
    actualizarResumen();
}


function mostrarEstudiantes() {

    tablaEstudiantes.innerHTML = "";

    let lista = estudiantes;

    if (filtroActual === "aprobados") {
        lista = estudiantes.filter(
            estudiante => estudiante.calificacion >= 6
        );
    }

    if (filtroActual === "reprobados") {
        lista = estudiantes.filter(
            estudiante => estudiante.calificacion < 6
        );
    }

    lista.forEach((estudiante) => {

        const indiceReal = estudiantes.indexOf(estudiante);

        const fila = document.createElement("tr");

        const estado =
            estudiante.calificacion >= 6
                ? "Aprobado"
                : "Reprobado";

        const claseEstado =
            estudiante.calificacion >= 6
                ? "aprobado"
                : "reprobado";

        fila.innerHTML = `
            <td>${estudiante.nombre}</td>

            <td>
                ${estudiante.calificacion.toFixed(1)}
            </td>

            <td class="${claseEstado}">
                ${estado}
            </td>

            <td>
                <button
                    class="btnEliminar"
                    onclick="eliminarEstudiante(${indiceReal})"
                >
                    Eliminar
                </button>
            </td>
        `;

        tablaEstudiantes.appendChild(fila);
    });
}


function actualizarResumen() {

    totalEstudiantes.textContent = estudiantes.length;

    if (estudiantes.length === 0) {
        promedio.textContent = "0.00";
        return;
    }

    const suma = estudiantes.reduce(
        (acumulador, estudiante) =>
            acumulador + estudiante.calificacion,
        0
    );

    const promedioGeneral =
        suma / estudiantes.length;

    promedio.textContent =
        promedioGeneral.toFixed(2);
}


function eliminarEstudiante(indice) {

    estudiantes.splice(indice, 1);

    mostrarMensaje(
        "Estudiante eliminado correctamente.",
        "exito"
    );

    mostrarEstudiantes();
    actualizarResumen();
}


function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    if (tipo === "error") {
        mensaje.style.color = "#dc2626";
    } else {
        mensaje.style.color = "#15803d";
    }
}


botonesFiltro.forEach(boton => {

    boton.addEventListener("click", function () {

        filtroActual = this.dataset.filtro;

        botonesFiltro.forEach(btn => {
            btn.classList.remove("activo");
        });

        this.classList.add("activo");

        mostrarEstudiantes();
    });
});


btnAgregar.addEventListener(
    "click",
    agregarEstudiante
);


inputCalificacion.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Enter") {
            agregarEstudiante();
        }
    }
);
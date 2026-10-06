const horarios = document.querySelectorAll(".horario");
const servicio = document.getElementById("servicio");

const nombreServicio = document.getElementById("nombreServicio");
const horarioSeleccionado = document.getElementById("horarioSeleccionado");
const total = document.getElementById("total");
const botonReservar = document.getElementById("reservar");
const mensaje = document.getElementById("mensaje");

let horarioActual = null;

function actualizarServicio() {
    const opcion = servicio.options[servicio.selectedIndex];

    nombreServicio.textContent =
        opcion.text.split(" - ")[0];

    if (horarioActual !== null) {
        total.textContent = servicio.value;
    } else {
        total.textContent = "0";
    }
}

horarios.forEach(function(horario) {

    horario.addEventListener("click", function() {

        if (horario.classList.contains("ocupado")) {
            return;
        }

        horarios.forEach(function(elemento) {
            elemento.classList.remove("seleccionado");
        });

        horario.classList.add("seleccionado");

        horarioActual = horario;

        horarioSeleccionado.textContent =
            horario.dataset.horario;

        total.textContent = servicio.value;

        mensaje.textContent = "";
    });
});

servicio.addEventListener("change", function() {
    actualizarServicio();
});

botonReservar.addEventListener("click", function() {

    if (horarioActual === null) {
        mensaje.textContent =
            "Selecciona un horario disponible.";
        return;
    }

    const horarioReservado =
        horarioActual.dataset.horario;

    mensaje.textContent =
        "Asesoría reservada correctamente para " +
        horarioReservado + ".";

    horarioActual.classList.remove("seleccionado");
    horarioActual.classList.add("ocupado");

    horarioActual = null;

    horarioSeleccionado.textContent = "Ninguno";
    total.textContent = "0";
});

actualizarServicio();
document.addEventListener('DOMContentLoaded', () => {
    // Leer los datos almacenados
    const rawData = localStorage.getItem('solicitudData');

    if (rawData) {
        const data = JSON.parse(rawData);

        // Asignar los datos a los elementos correspondientes
        const resNombre = document.getElementById('res-nombre');
        const resTipo = document.getElementById('res-tipo');
        const resUrgencia = document.getElementById('res-urgencia');
        const resContacto = document.getElementById('res-contacto');

        if (resNombre) resNombre.textContent = data.nombre;
        if (resTipo) resTipo.textContent = data.tipoProblema;
        if (resUrgencia) resUrgencia.textContent = data.urgencia;
        if (resContacto) resContacto.textContent = data.contacto;
    }
});
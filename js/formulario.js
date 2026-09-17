document.addEventListener('DOMContentLoaded', () => {
  // Manejo de Selección de Chips
  function setupChipSelection(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;
      
      container.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
    });
  }

  setupChipSelection('problema-chips');

  const form = document.getElementById('solicitud-form');
  const errorBanner = document.getElementById('error-banner');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');

    // Resetear estados de error
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
    errorBanner.classList.add('hidden');

    // Validación de Nombre
    if (!nombreInput.value.trim()) {
      document.getElementById('group-nombre').classList.add('has-error');
      isValid = false;
    }

    // Validación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('group-email').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) {
      errorBanner.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Capturar los valores activos/seleccionados
      const problemaChip = document.querySelector('#problema-chips .chip.active');
      const contactoRadio = document.querySelector('input[name="contacto"]:checked');

      // Objeto con la información del formulario
      const formData = {
        nombre: nombreInput.value.trim(),
        tipoProblema: problemaChip ? problemaChip.dataset.value : 'No especificado',
        contacto: contactoRadio ? contactoRadio.value : 'Correo electrónico'
      };

      // Guardar en localStorage
      localStorage.setItem('solicitudData', JSON.stringify(formData));

      // Redireccionar
      window.location.href = 'confirmacion.html';
    }
  });
});
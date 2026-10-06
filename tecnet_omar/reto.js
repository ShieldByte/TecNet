document.addEventListener('DOMContentLoaded', () => {
  const btnGenerar = document.getElementById('btn-generar');
  const btnCopiar = document.getElementById('btn-copiar');
  const inputResultado = document.getElementById('resultado');
  const inputLongitud = document.getElementById('longitud');
  const checkNumeros = document.getElementById('numeros');
  const checkSimbolos = document.getElementById('simbolos');
  const txtMensaje = document.getElementById('mensaje');

  btnGenerar.addEventListener('click', () => {
    const longitud = parseInt(inputLongitud.value, 10);
    let caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (checkNumeros.checked) caracteres += '0123456789';
    if (checkSimbolos.checked) caracteres += '!@#$%^&*()';

    let password = '';
    for (let i = 0; i < longitud; i++) {
      const azar = Math.floor(Math.random() * caracteres.length);
      password += caracteres[azar];
    }

    inputResultado.value = password;
    txtMensaje.textContent = '';
  });

  btnCopiar.addEventListener('click', () => {
    if (!inputResultado.value) return;
    navigator.clipboard.writeText(inputResultado.value);
    txtMensaje.textContent = '¡Copiado!';
    setTimeout(() => txtMensaje.textContent = '', 2000);
  });
});